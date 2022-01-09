import React from 'react';
import styles from './ProductCard.module.css';
// import logo from '../../assets/Mask-Group.png';

export default function ProductCard({ product }) {
  return (
    <div className={styles.productcard}>
      <div className={styles.divImg}>
        <img src={product.photo} alt="food" className={styles.img} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        <p className={styles.description}>{product.description}</p>
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
