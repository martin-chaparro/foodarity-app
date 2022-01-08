import React from 'react';
import styles from './Header1.module.css';
import logo from '../../assets/Mobil-Full-Header-Logo.png';
import logo1 from '../../assets/WEB-Logo-Combinado.png';

export default function Header1() {
  return (
    <header className={styles.header}>
      <img className={styles.logo1} src={logo1} alt="" />
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles.btncont}>
        <button className={styles.btning} type="submit">
          Ingresar
        </button>
        <button className={styles.btnreg} type="submit">
          Registrarse
        </button>
      </div>
    </header>
  );
}
