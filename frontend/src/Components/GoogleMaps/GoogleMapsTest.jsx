import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import GoogleMapsPicker from './GoogleMapsPicker';

function GoogleMapsTest() {

  const [pickerLocation, setPickerLocation] = useState({lat: 10, lng:106})

 

  const getLocation = (location) => {
    setPickerLocation(location)
  }

  return <div style={{height:'100%', widht:'100%'}}>
<GoogleMapsPicker getLocation={getLocation} defaultLocation={pickerLocation}/>
  </div>;
}

export default GoogleMapsTest;
