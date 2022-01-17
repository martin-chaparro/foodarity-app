import React from 'react'
import {useSearchParams} from 'react-router-dom'
import { api } from '../../services/api'

function concreteRegister() {
  const [params] = useSearchParams()
  const code = params.get('code') || ''
  const state = params.get('state') || ''

  const handleRegister = () => {
    api.post(`/mercadopago/register?code=${code}&state=${state}`)
  }

  const handleOnClick = () => {
    api.get(`/mercadopago/register/1`).then(res => {window.location.href =res.data})
  }

  return (
    <div>
     {handleRegister()}
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

export default concreteRegister
