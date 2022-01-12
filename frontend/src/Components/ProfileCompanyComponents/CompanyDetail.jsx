// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import styles from './CompanyDetail.module.css';

import RegisterCompanyFormEditable from './RegisterCompanyFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function CompanyDetail() {
  const [displayDetail, setDisplayDetail] = useState(true);

  function handleOnclick() {
    setDisplayDetail(false);
  }

  return (
    <div>
      {displayDetail ? (
        <div className={styles.companydetail}>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Nombre de Comercio:</h3>
            <h3 className={styles.descripcion}>Panaderia Buenos Aires</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Email de la Empresa:</h3>
            <h3 className={styles.descripcion}>
              panaderiabuenosaires@gmail.com{' '}
            </h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Url sitio Web:</h3>
            <h3 className={styles.descripcion}>www.panaderiabuenosaires.com</h3>
          </div>

          <div className={styles.cont}>
            <h3 className={styles.titulo}>Descripcion:</h3>
            <h3 className={styles.descripcion}>
              {' '}
              Descripcion: Desarrollo panificados artesanales, integrales,
              pasteleria...
            </h3>
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
        <RegisterCompanyFormEditable />
      )}
    </div>
  );
}
