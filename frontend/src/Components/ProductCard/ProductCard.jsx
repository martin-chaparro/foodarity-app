import React from 'react';
import styles from './ProductCard.module.css';
import logo from '../../assets/Mask-Group.png';

export default function ProductCard() {
  return (
    <div className={styles.productcard}>
      <img src={logo} alt="food" className={styles.img} />
      <div className={styles.content}>
        <h3 className={styles.name}>NOMBRE</h3>

        <textarea className={styles.description} />
        <div className={styles.btncont}>
          <button className={styles.btnres} type="submit">
            Reservar
          </button>
          <button className={styles.btndet} type="submit">
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
}
