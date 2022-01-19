import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OngSeccion.module.css';

export default function OngSeccion({ ong }) {
  return (
    <div>
      <div className={styles.container}>
        <Link to={`/company/${ong.id}`}>
          <div className={styles.divImg}>
            <img src={ong.logo.url} alt="food" className={styles.img} />
          </div>
        </Link>
      </div>
    </div>
  );
}
