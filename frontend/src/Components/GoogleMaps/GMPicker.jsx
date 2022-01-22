import React, {useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import GoogleMapsPicker from './GoogleMapsPicker';

function GoogleMapsTest({defaultLocation, getLocation}) {

  const [pickerLocation] = useState(defaultLocation)


  return <div style={{height:'100%', widht:'100%'}}>
<GoogleMapsPicker getLocation={getLocation} defaultLocation={pickerLocation}/>
  </div>; 
}

export default GoogleMapsTest;