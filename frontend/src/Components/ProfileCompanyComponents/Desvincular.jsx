import React from 'react';
import Button from '@mui/material/Button';
import { apiWithToken } from '../../services/api';
import styles from './Desvincular.module.css';
// import logoMercadoPago from '../../assets/mercado_pago_png.png'

function Desvincular() {
  const handleOnClick = () => {
    apiWithToken.get(`/mercadopago/unlink`).then((res) => {
      console.log(res.data);
      window.location.href = res.data;
    });
  };

  return (
    <div className={styles.container}>
      <h1>Vinculado con Mercado de PAGO</h1>

      <Button
        onClick={handleOnClick}
        type="button"
        sx={{
          backgroundColor: '#7ED957',
          '&:hover': { backgroundColor: '#7ED95790 !important' },
          marginTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        DESVINCULAR
      </Button>
      {/* <img src={logoMercadoPago} alt='logo Mercado Pago' className={styles.img} /> */}
    </div>
  );
}

export default Desvincular;
