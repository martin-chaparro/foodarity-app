import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/Mobil-Full-Header-Logo.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.imgheader} src={logo} alt="logo" />
    </header>
  );
}
