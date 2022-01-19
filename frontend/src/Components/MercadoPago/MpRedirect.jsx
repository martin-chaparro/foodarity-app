/* eslint-disable no-alert */
import React from 'react'
import {useSearchParams} from 'react-router-dom'
import { api } from '../../services/api'

function MpRedirect() {
  const [params] = useSearchParams()
  const code = params.get('code') || ''
  const state = params.get('state') || ''

  const handleRegister = () => {
    api.post(`/mercadopago/register?code=${code}&state=${state}`)
  }

 

  return (
    <div>
     {code ? handleRegister() : alert('Ocurrio algun error...')}
    </div>
  )
}

export default MpRedirect
