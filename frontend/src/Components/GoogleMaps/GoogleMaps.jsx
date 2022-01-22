import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { getCompanies } from '../../redux/actions/CompaniesActions';
import styles from './GoogleMaps.module.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;



function GoogleMaps() {
 
  const companies = useSelector(state => state.companies.companies)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanies())
  },[])



    return (
    <div className={styles.container}>
      <h1 className={styles.title}>Encontralas en el mapa!</h1>
    
    <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY, language: 'es', region: 'arg'}}
          defaultCenter={{
            lat: -36.6769415180527,
            lng:-60.5588319815719,
            
          }}
          defaultZoom={7.5}
          
        >      
        {companies && companies.map(company => (<Marker
        key={company.id}
        lat={company.address.location.lat}
        lng={company.address.location.lng}
        company={company}
        style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}/>))}
        </GoogleMapReact>
    
      </div>
      
      </div>
      );
      
}


export default GoogleMaps;