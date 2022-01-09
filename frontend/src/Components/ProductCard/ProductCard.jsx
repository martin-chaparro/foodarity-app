import React from 'react';
import styles from './ProductCard.module.css';
import logo from '../../assets/Mask-Group.png';

export default function ProductCard() {
  return (
    <div className={styles.productcard}>
      <div className={styles.divImg}>
      <img src={logo} alt="food" className={styles.img} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>NOMBRE</h3>

        <p className={styles.description}>Descripcion del producto</p> 
        <div className={styles.btnContainer}>
        <div className={styles.btnresdiv}>
          <button className={styles.btnres} type="submit">
            Reservar
          </button>
        </div>
        <div className={styles.btndetdiv}>
          <button className={styles.btndet} type="submit">
            Ver detalle
          </button>
          </div>
          </div>
      </div>
    </div>
  );
}
