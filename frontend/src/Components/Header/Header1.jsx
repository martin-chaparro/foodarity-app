import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header1.module.css';
import logo from '../../assets/Mobil-Full-Header-Logo.png';
import logo1 from '../../assets/WEB-Logo-Combinado.png';

export default function Header1() {
  return (
    <header className={styles.header}>
      <img className={styles.logo1} src={logo1} alt="" />
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles.btncont}>
        <Link to="/login">
          <button className={styles.btning} type="submit">
            Ingresar
          </button>
        </Link>
        <Link to="/register">
          <button className={styles.btnreg} type="submit">
            Registrarse
          </button>
        </Link>
      </div>
    </header>
  );
}
