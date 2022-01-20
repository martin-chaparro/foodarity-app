import React from 'react';
import styles from './NotFound.module.css';

function NotFound() {
  return <div className={styles.container}>
      <h1 className={styles.ups}>UPS!</h1>
    <h2>No se han encontrados productos con esas caracteristicas</h2>
    <h3>vuelve a intentarlo</h3>

  </div>;
}

export default NotFound;
