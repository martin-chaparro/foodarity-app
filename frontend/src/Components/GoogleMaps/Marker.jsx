import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Marker({company}) {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {company.name}
    {company.company_type_id === 1 ?
    <LocationOnIcon color='primary'/> :
    <LocationOnIcon color='secondary'/> 
    }
    </div>;
}

export default Marker;
