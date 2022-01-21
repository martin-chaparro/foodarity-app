import React from 'react';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'


// const GOOGLE_KEY = process.env.GOOGLE_API_KEY;



function GoogleMapsCompany({company}) { 
 
    console.log(company)
    return (<div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyAK6-FWy_86TiAVL2bGrma095wFqWs8sXY', language: 'es', region: 'arg'}}
          defaultCenter={{
            lat:company.address.city.lat,
            lng:company.address.city.lon,
            
          }}
          defaultZoom={10}
          
        >      
        {company && <Marker
        lat={company.address.city.lat}
        lng={company.address.city.lon}
        company={company}
        style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}/>}
        </GoogleMapReact>
      </div>);
}


export default GoogleMapsCompany;