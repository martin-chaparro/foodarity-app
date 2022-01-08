import React from 'react';
import Header from '../Component/Header/Header';
import styles from './RegisterFormONG.module.css';
import imgong from '../../assets/caridad-1.png';
import Terminos from '../Component/Terminos y Condiciones/Terminos';

export default function RegisterFormONG() {
  return (
    <div>
      <div className={styles.RegisterFormCommerce}>
        <Header />
        <form className={styles.form}>
          <div>
            <img src={imgong} alt="caridad-1" />
            <div className={styles.labelNombre}>
              <h3>Nombre del comercio</h3>
            </div>
          </div>
          <div className={styles.divsInputs}>
            <div className={styles.divInputNombre}>
              <input
                className={styles.inputNombre}
                type="text"
                name="name"
                autoComplete="off"
              />
            </div>
            <div className={styles.labelNombre}>
              <h3>Url de sitio web</h3>
            </div>
            <div className={styles.divInputNombre}>
              <input
                className={styles.inputNombre}
                type="text"
                name="name"
                autoComplete="off"
              />
            </div>
            <div className={styles.labelDescripcion}>
              <h3>Descripción</h3>
            </div>
            <div className={styles.divInputDescripcion}>
              <textarea className={styles.inputDescripcion} type="text" />
            </div>
            <div className={styles.divlabelPhone}>
              <h3 className={styles.labelPhone}>Teléfono</h3>
            </div>
            <div className={styles.phoneDivs}>
              <input
                className={styles.areacod}
                type="number"
                placeholder="Cód. Área"
              />
              <input
                className={styles.phonenumber}
                type="number"
                placeholder="Número"
              />
            </div>
            <div className={styles.divlabelDir}>
              <h3 className={styles.labelDir}>Dirección</h3>
            </div>
            <div className={styles.divInputsCalleyNum}>
              <input className={styles.calle} type="text" placeholder="Calle" />
              <input
                className={styles.numCalle}
                type="number"
                placeholder="Número de calle"
              />
            </div>
            <div className={styles.divCodPostal}>
              <input
                className={styles.inputCodPostal}
                type="number"
                placeholder="Cód. Postal"
              />
            </div>
            <div className={styles.divCiudadyProv}>
              <input
                className={styles.inputCiudad}
                type="text"
                placeholder="Ciudad"
              />
              <input
                className={styles.inputProv}
                type="text"
                placeholder="Provincia"
              />
            </div>
            <div className={styles.divSelects}>
              <select className={styles.selectCiudad}>
                <option value="City">Ciudad</option>
              </select>
              <select className={styles.selectProvincia}>
                <option value="Prov">Provincia</option>
              </select>
            </div>
          </div>
          <Terminos />
          <div>
            <button className={styles.button} type="submit">
              Enviar solicitud de registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
