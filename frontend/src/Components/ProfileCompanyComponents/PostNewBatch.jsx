import React from 'react';
import styles from './PostNewBatch.module.css';
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-duplicates
import { NuevoLote, Cantidad, Amount, Fecha } from './TextFieldSizes';
import Descripcion from './MultiLineTextFields';
import logo from '../../assets/user-6.png';
// eslint-disable-next-line import/no-duplicates
// import MultilineTextFields from './InputPostNewBatch';

export default function PostNewBatch() {
  return (
    <div className={styles.formcont}>
      <form className={styles.formcont}>
        <img src={logo} alt="logo" />
        <div className={styles.generalcont}>
          <div className={styles.cont}>
            <div className={styles.contname}>
              <div>
                <NuevoLote />
              </div>
              <div>
                <Fecha />
              </div>
            </div>

            <div className={styles.contamout}>
              <div>
                <Cantidad />
              </div>

              <div>
                <Amount />
              </div>
            </div>
          </div>

          <div>
            <Descripcion className={styles.description} />
          </div>
          <input type="file" name="foto" />
          <buttton type="submit" className={styles.btn}>
            PUBLICAR PRODUCTO
          </buttton>
        </div>
      </form>
    </div>
  );
}
