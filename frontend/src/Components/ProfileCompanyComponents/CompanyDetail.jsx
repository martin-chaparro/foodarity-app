// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import styles from './CompanyDetail.module.css';

import RegisterCompanyFormEditable from './RegisterCompanyFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function CompanyDetail({ company }) {
  const [displayDetail, setDisplayDetail] = useState(true);

  function handleOnclick() {
    setDisplayDetail(false);
  }

  function handleBack() {
    setDisplayDetail(true);
  }



  return (
    <div className={styles.infocont}>
      {displayDetail ? (
        <div className={styles.companydetail}>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Nombre de Comercio:</h3>
            <h3 className={styles.descripcion}>{company.name}</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Descripcion:</h3>
            <h3 className={styles.descripcion}>{company.description}</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Email de la Empresa:</h3>
            <h3 className={styles.descripcion}>{company.email}</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Url sitio Web:</h3>
            <h3 className={styles.descripcion}>{company.website}</h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Telefono :</h3>
            <h3 className={styles.descripcion}>
              <span>{company.areaCode}</span> <span>{company.phone}</span>.
            </h3>
          </div>
          <div className={styles.cont}>
            <h3 className={styles.titulo}>Dirección:</h3>
            <h3 className={styles.descripcion}>
              <span>{company.address.street}</span>
              <span> {company.address.number}, </span>
              <span> {company.address.city.name}, </span>
              <span> {company.address.state.name}, </span>
              <span>{company.address.zipcode}</span>
            </h3>
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
        // eslint-disable-next-line react/jsx-no-bind
        <RegisterCompanyFormEditable
          company={company}
          // eslint-disable-next-line react/jsx-no-bind
          handleBack={handleBack}
        />
      )}
    </div>
  );
}
