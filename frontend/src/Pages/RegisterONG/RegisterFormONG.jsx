/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import styles from './RegisterFormONG.module.css';
import caridad1 from '../../assets/caridad-1.png';
import Terminos from '../../Components/Term&Conditions/Terminos';
import { api } from '../../services/api';
import AlertOng from '../../Components/Alertas/AlertEnviarSolicitud';

let time = null;
let time2 = null;

export default function RegisterFormONG() {
  const [provincia, setprovincia] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [termProvincia, setTermProvincia] = useState('');
  const [termCiudad, setTermCiudad] = useState('');
  const [errors, setErrors] = useState({});
  const initialFormValues = {
    stateId: null,
    cityId: null,
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [input, setInput] = useState({
    name: '',
    type: '2',
    description: '',
    areaCode: '',
    phone: '',
    email: '',
    website: '',
    status: '',
    street: '',
    number: '',
    zipcode: '',
    cityId: '',
    stateId: '',
  });

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

  const validateLetters = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[a-zA-Z ]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo letras',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateUrl = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'La URL no es valida!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateNum = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // eslint-disable-next-line no-useless-escape
    if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo numeros',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.RegisterFormCommerce}>
      <Header />
      <form className={styles.form}>
        <div className={styles.containerLogo}>
          <div className={styles.commerceLogo}>
            <img className={styles.imgLogo} src={caridad1} alt="ONGLogo" />
          </div>
        </div>
        <div className={styles.divsInputs}>
          <div className={styles.labelNombre}>
            <label>Nombre de la ONG</label>
          </div>
          <div className={styles.divInputNombre}>
            <input
              className={styles.inputNombre}
              type="text"
              name="name"
              value={input.name}
              autoComplete="off"
              onChange={(e) => {
                handleOnChange(e);
                validateLetters(e);
              }}
            />
            <p>{errors.name}</p>
          </div>
          <div className={styles.labelEmail}>
            <label>Email de la Organización</label>
          </div>
          <div className={styles.divInputEmail}>
            <input
              className={styles.inputEmail}
              type="texto"
              autoComplete="off"
            />
          </div>
          <div className={styles.labelUrl}>
            <label>Url de sitio web</label>
          </div>
          <div className={styles.divInputNombre}>
            <input
              className={styles.inputNombre}
              type="text"
              name="website"
              value={input.website}
              autoComplete="off"
              onChange={(e) => {
                handleOnChange(e);
                validateUrl(e);
              }}
            />
            <p>{errors.website}</p>
          </div>
          <div className={styles.labelDescripcion}>
            <label>Descripción</label>
          </div>
          <div className={styles.divInputDescripcion}>
            <textarea
              className={styles.inputDescripcion}
              type="text"
              name="description"
              value={input.description}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.divlabelPhone}>
            <label className={styles.labelPhone}>Teléfono</label>
          </div>
          <div className={styles.phoneDivs}>
            <input
              className={styles.areacod}
              type="text"
              name="areaCode"
              value={input.areaCode}
              placeholder="Cód. Área"
              onChange={(e) => {
                handleOnChange(e);
                validateNum(e);
              }}
            />
            <p>{errors.areaCode}</p>
            <input
              className={styles.phonenumber}
              type="text"
              name="phone"
              value={input.phone}
              placeholder="Número"
              onChange={(e) => {
                handleOnChange(e);
                validateNum(e);
              }}
            />
            <p>{errors.phone}</p>
          </div>
          <div className={styles.divlabelDir}>
            <label className={styles.labelDir}>Dirección</label>
          </div>
          <div className={styles.divInputsCalleyNum}>
            <input
              className={styles.street}
              type="text"
              name="direccion"
              value={input.direccion}
              placeholder="street"
              onChange={(e) => {
                handleOnChange(e);
                validateLetters(e);
              }}
            />
            <p>{errors.direccion}</p>
            <input
              className={styles.numCalle}
              type="text"
              name="number"
              value={input.number}
              placeholder="Número de calle"
              onChange={(e) => {
                handleOnChange(e);
                validateNum(e);
              }}
            />
            <p>{errors.number}</p>
          </div>
          <div className={styles.divCodPostal}>
            <input
              className={styles.inputCodPostal}
              type="text"
              name="zipcode"
              value={input.zipcode}
              placeholder="Código Postal"
              onChange={(e) => {
                handleOnChange(e);
                validateNum(e);
              }}
            />
            <p>{errors.zipcode}</p>
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
                placeholder="cityId"
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
        <Terminos />
        <div className={styles.divButton}>
          <AlertOng />
        </div>
      </form>
    </div>
  );
}
