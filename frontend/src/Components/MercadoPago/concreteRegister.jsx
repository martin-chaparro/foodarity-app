import React from 'react'
import {useSearchParams} from 'react-router-dom'
import { api } from '../../services/api'

function concreteRegister() {
  const [params] = useSearchParams()
  const code = params.get('code')
  const state = params.get('state')

  const handleRegister = () => {
    api.post(`/mercadopago/register?code=${code}&state=${state}`)

  }
  return (
    <div>
     {handleRegister()}
    </div>
  )
}

export default concreteRegister
