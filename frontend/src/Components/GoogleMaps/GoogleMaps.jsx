import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import GoogleMapsCompany from './GoogleMapsCompany'
import { getCompanies } from '../../redux/actions/CompaniesActions';

// const GOOGLE_KEY = process.env.GOOGLE_API_KEY;



function GoogleMaps() {
 
  const companies = useSelector(state => state.companies.companies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanies())
  },[])



    return (<div style={{ height: '700px', width: '100vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCZaTTobUoIp1bTtbe3gG0usPNKztx6lwI', language: 'es', region: 'arg'}}
          defaultCenter={{
            lat: -36.6769415180527,
            lng:-60.5588319815719,
            
          }}
          defaultZoom={6.7}
          
        >      
        {companies && companies.map(company => (<Marker
        key={company.id}
        lat={company.address.city.lat}
        lng={company.address.city.lon}
        company={company}
        style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}/>))}
        </GoogleMapReact>
    {companies[0] && (<div style={{width: '300px', height:'300px'}}>
      <GoogleMapsCompany company={companies[0]}/>
        </div>)}
      </div>);
}


export default GoogleMaps;
