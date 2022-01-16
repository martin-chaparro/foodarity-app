// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import styles from './UserDetail.module.css';

import RegisterUserFormEditable from './RegisterUserFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function UserDetail({ detail }) {
  const [displayDetail, setDisplayDetail] = useState(true);
  // email, id, phone, photo, deleted, socialPhoto, status;
  const { name } = detail;

  function handleOnclick() {
    setDisplayDetail(false);
  }

  return (
    <div className={styles.infocont}>
      {displayDetail ? (
        <div className={styles.companydetail}>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Información de Cuenta</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Nombre: {name}</h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Email de la Empresa:</h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Telefono :</h3>
            <h3 className={styles.descripcion}>
              <span>Cod. Area</span> 011 <span>32615516</span>.
            </h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Dierección:</h3>
            <h3 className={styles.descripcion}>
              <span>Calle: Av.Libertador </span>
              <span>Numero: 666 </span> <span>Codigo postal: 1425</span>
            </h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Provincia:</h3>
            <h3 className={styles.descripcion}>Buenos Aires</h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Ciudad:</h3>
            <h3 className={styles.descripcion}>CABA</h3>
          </div>
          <div className={styles.btncont}>
            <button
              type="submit"
              className={styles.btn}
              onClick={() => {
                // eslint-disable-next-line no-undef
                handleOnclick();
              }}
            >
              EDITAR DATOS
            </button>
          </div>
        </div>
      ) : (
        <RegisterUserFormEditable />
      )}
    </div>
  );
}
