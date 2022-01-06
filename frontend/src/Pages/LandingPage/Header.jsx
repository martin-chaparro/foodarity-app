import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/Mobil header.png';
import logo1 from '../../assets/Mobil header1.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" />
      <img src={logo1} alt="" />
    </header>
  );
}
