/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import styles from './RegisterFormCommerce.module.css';
import CommerceLogo from '../../assets/Mask-Group.png';
import {api} from '../../services/api';

let time = null;
let time2 = null;

export default function RegisterFormCommerce() {
  const [provincia, setprovincia] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [termProvincia, setTermProvincia] = useState('');
  const [termCiudad, setTermCiudad] = useState('');
  const initialFormValues = {
    stateId: null,
    cityId: null,
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const searchProvincia = (term) => {
    api.get(`/states?name=${term}`).then((response) => {
      setprovincia(response.data);
    });
  };

  const searchCiudad = (term) => {
    api.get(`/cities/${formValues.stateId}/?name=${term}`).then((response) => {
      setCiudad(response.data);
    });
  };

  useEffect(() => {
    clearTimeout(time);
    if (termProvincia.trim() !== '' && formValues.stateId === null) {
      time = setTimeout(() => {
        searchProvincia(termProvincia);
      }, 1000);
    }
    return () => {
      setprovincia([]);
    };
  }, [termProvincia]);

  useEffect(() => {
    clearTimeout(time2);
    if (
      termCiudad.trim() !== '' &&
      formValues.cityId === null &&
      formValues.stateId !== null
    ) {
      time2 = setTimeout(() => {
        searchCiudad(termCiudad);
      }, 1000);
    }
    return () => {
      setCiudad([]);
    };
  }, [termCiudad]);

  const handleProvincia = (event) => {
    setFormValues({
      ...formValues,
      stateId: event.target.attributes.provid.value,
    });
    setTermProvincia(event.target.attributes.provname.value);
  };

  const handleCiudad = (event) => {
    setFormValues({
      ...formValues,
      cityId: event.target.attributes.cityid.value,
    });
    setTermCiudad(event.target.attributes.cityname.value);
  };

  const handleInputProvincia = ({ target }) => {
    setFormValues({
      ...formValues,
      stateId: null,
      cityId: null,
    });
    setTermCiudad('');
    setTermProvincia(target.value);
  };

  const handleInputCiudad = ({ target }) => {
    setFormValues({
      ...formValues,
      cityId: null,
    });
    setTermCiudad(target.value);
  };

  return (
    <div className={styles.RegisterFormCommerce}>
      <Header />
      <form className={styles.form}>
        <div className={styles.commerceLogo}>
          <img className={styles.imgLogo} src={CommerceLogo} alt="CommerLogo" />
        </div>
        <div className={styles.divsInputs}>
          <div className={styles.labelNombre}>
            <label>Nombre del comercio</label>
          </div>
          <div className={styles.divInputNombre}>
            <input
              className={styles.inputNombre}
              type="text"
              name="name"
              autoComplete="off"
            />
          </div>
          <div className={styles.labelNombre}>
            <label>Url de sitio web</label>
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
            <label>Descripción</label>
          </div>
          <div className={styles.divInputDescripcion}>
            <textarea className={styles.inputDescripcion} type="text" />
          </div>
          <div className={styles.divlabelPhone}>
            <label className={styles.labelPhone}>Teléfono</label>
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
            <label className={styles.labelDir}>Dirección</label>
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
            <div>
              <input
                className={styles.inputProv}
                type="text"
                placeholder="Provincia"
                value={termProvincia}
                onChange={handleInputProvincia}
              />
              {provincia.length > 0 && (
                <div className={styles.containerResult}>
                  <div className={styles.containerElement}>
                    {provincia.map((prov) => (
                      <div
                        className={styles.elements}
                        key={prov.id}
                        provid={prov.id}
                        provname={prov.name}
                        onClick={handleProvincia}
                      >
                        {prov.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <input
                className={styles.inputCiudad}
                type="text"
                placeholder="Ciudad"
                value={termCiudad}
                onChange={handleInputCiudad}
              />
              {ciudad.length > 0 && (
                <div className={styles.containerResult}>
                  <div className={styles.containerElement}>
                    {ciudad.map((city) => (
                      <div
                        className={styles.elements}
                        key={city.id}
                        cityid={city.id}
                        cityname={city.name}
                        onClick={handleCiudad}
                      >
                        {city.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className={styles.divSelects}>
            <select className={styles.selectCiudad}>
              <option value="City">Ciudad</option>
            </select>
            <select className={styles.selectProvincia}>
              <option value="Prov">Provincia</option>
            </select>
          </div> */}
        </div>
        <div className={styles.divButton}>
          <button className={styles.button} type="submit">
            Enviar solicitud de registro
          </button>
        </div>
      </form>
    </div>
  );
}
