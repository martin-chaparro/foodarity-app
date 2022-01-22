/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import MapPicker from 'react-google-map-picker';

function GoogleMapsPicker({defaultLocation, getLocation}) {
  
  const [DefaultLocation] = useState(defaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(14);

  const handleChangeLocation = (latt, lonn) => {
    setLocation({ lat: latt, lng: lonn });
  }; 

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  useEffect(() => {
    getLocation(location)
  },[location])

/*     const handleResetLocation = () => {
    setDefaultLocation({ ...defaultLocation });
    // setZoom(DefaultZoom);
  };   */

  return (
  <div style={{height:'100%', widht:'100%'}}>
      <MapPicker 
        defaultLocation={DefaultLocation}
        zoom={zoom}
        style={{height:'100%', widht:'100%'}}
        mapTypeId="roadmap"
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyDBwkO3pZqZv8iqwhXVapOwxwLf2Z3Y9tk"
      /></div>);
}

export default GoogleMapsPicker;
