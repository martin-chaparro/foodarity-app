/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { apiWithToken } from '../../services/api'
import styles from './MpTest.module.css'
import logoMercadoPago from '../../assets/mercado_pago_png.png'

function MpTest() {
  const handleOnClick = () => {
    apiWithToken.get(`/mercadopago/register`).then(res => {
      console.log(res.data)
      window.location.href = res.data
    })
  }
  
  return (
    <div className={styles.container}>
     <h1>Registrar comercio</h1>
      <img src={logoMercadoPago} alt='logo Mercado Pago' className={styles.img} />
     <p>Solo se tiene que mostrar si aun no activo Mercadopago</p>
     <button type='button' onClick={handleOnClick}  >Registrar comercio</button>
    </div>
  )
}

export default MpTest
