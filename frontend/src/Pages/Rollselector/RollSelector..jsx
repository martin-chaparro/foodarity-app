import React from 'react';
import Header from '../Component/Header/Header';
import imgcomercio from '../../assets/Mask-Group.png';
import imgong from '../../assets/caridad-1.png';
import styles from './RollSelector.module.css';

export default function RollSelector() {
  return (
    <div className={styles.rollselector}>
      <Header />
      <h1>Registrar mi</h1>
      <div className={styles.content}>
        <div className={styles.commercecontent}>
          <button className={styles.btncomerce} type="submit">
            <img src={imgcomercio} width="74px" height="74" alt="comercio" />
          </button>

          <h3>Comercio</h3>
        </div>
        <div className={styles.ongcontent}>
          <button className={styles.btnong} type="submit">
            <img src={imgong} width="74px" height="74" alt="ong" />
          </button>
          <h3>ONG</h3>
        </div>
      </div>
      <button className={styles.btn} type="submit">
        Continuar como individuo
      </button>
    </div>
  );
}
