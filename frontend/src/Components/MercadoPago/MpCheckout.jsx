import React,{ useEffect,useState } from 'react'

// eslint-disable-next-line import/no-unresolved
import { apiWithToken } from '../../services/api';



function MpCheckout() {

const [preference, setpreference] = useState(null); 

const preferenceData = {
    commerceId:1
}   
  
useEffect(() => {
    apiWithToken.post('/mercadopago/preference',preferenceData)
    .then((response)=>{
      const {preferenceCreated} = response.data;
      console.log(preferenceCreated);
      setpreference(preferenceCreated)
      
    })
    .catch((error)=>console.log(error))
}, []);

  
  return (
    <div>
      <br/>
      <br/>
      <br/>
     <h1>Realizar pago</h1>
     <a href={preference?.init_point}>Init Point</a>
    </div>
  )
}

export default MpCheckout