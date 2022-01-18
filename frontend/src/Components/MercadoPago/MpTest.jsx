/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { apiWithToken } from '../../services/api'

function MpTest() {
  const handleOnClick = () => {
    apiWithToken.get(`/mercadopago/register`).then(res => {window.location.href = res.data})
  }
  
  return (
    <div>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <button type='button' onClick={handleOnClick} >TEST</button>
    </div>
  )
}

export default MpTest
