/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { apiWithToken } from '../../services/api'

function MpTest() {
  const handleOnClick = () => {
    apiWithToken.get(`/mercadopago/register`).then(res => {
      console.log(res.data)
      window.location.href = res.data
    })
  }
  
  return (
    <div>
      <br/>
      <br/>
      <br/>
     <h1>Registrar comercio</h1>
     <p>Solo se tiene que mostrar si aun no activo Mercadopago</p>
     <button type='button' onClick={handleOnClick} >Registrar comercio</button>
    </div>
  )
}

export default MpTest
