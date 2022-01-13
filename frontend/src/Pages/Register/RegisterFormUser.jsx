/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import Button from '@mui/material/Button';
import Header from '../../Components/Header/Header';
import style from './RegisterFormUser.module.css';

// import { registerLocal } from '../../redux/actions/usersActions';
import {
  startCheking,
  startGoogleRegister,
  startRegister,
} from '../../redux/actions/authActions';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    validatePassword: '',
  });

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

  const validateEmail = (e) => {
    const { name, value } = e.target;
    const expresion =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setInput({
      ...input,
      [name]: value,
    });
    if (!expresion.test(value)) {
      setErrors({
        ...errors,
        [name]: 'No es un email valido!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validatePassword = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/^.{4,12}$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Debe contener entre 4 y 12 caracteres',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validatePassword2 = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (value !== input.password) {
      setErrors({
        ...errors,
        [name]: 'No coincide',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.validatePassword
    ) {
      // dispatch(registerLocal(input));
      dispatch(startRegister(input));
      dispatch(startCheking());
      navigate('/rollselector');
      setInput({
        name: '',
        email: '',
        password: '',
        validatePassword: '',
      });
      navigate('/rollselector');
    } else {
      // eslint-disable-next-line no-alert
      alert('Complete el formulario');
    }
  };

  const responseGoogleSucces = ({ tokenId }) => {
    dispatch(startGoogleRegister(tokenId));
  };
  const responseGoogleFail = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className={style.register}>
      <Link to="/">
        <Header />
      </Link>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.divInputs}>
          <div className={style.title}>
            <label>Ingrese Su Nombre</label>
          </div>
          <input
            className={style.inputs}
            type="text"
            name="name"
            value={input.name}
            placeholder="Ingrese su nombre"
            onChange={(e) => {
              handleOnChange(e);
              validateLetters(e);
            }}
          />
          <div className={style.divErrorNombre}>
            <p className={style.errors}>{errors.name}</p>
          </div>
          <label className={style.title}>Ingrese Su Email</label>
          <input
            className={style.inputs}
            type="text"
            name="email"
            value={input.email}
            placeholder="Ingrese su email"
            onChange={(e) => {
              handleOnChange(e);
              validateEmail(e);
            }}
          />
          <div className={style.divErrorEmail}>
            <p className={style.errors}>{errors.email}</p>
          </div>
          <label className={style.title}>Ingrese Su Contraseña</label>
          <input
            className={style.inputs}
            type="password"
            name="password"
            value={input.password}
            placeholder="Ingrese su contraseña"
            onChange={(e) => {
              handleOnChange(e);
              validatePassword(e);
            }}
          />
          <div className={style.divErrorPassword}>
            <p className={style.errors}>{errors.password}</p>
          </div>
          <label className={style.title}>Repita Su Contraseña</label>
          <input
            className={style.inputs}
            type="password"
            name="validatePassword"
            value={input.validatePassword}
            placeholder="Vuelva a escribir su contraseña"
            onChange={(e) => {
              handleOnChange(e);
              validatePassword2(e);
            }}
          />
          <div className={style.divErrorPassword2}>
            <p className={style.errors}>{errors.validatePassword}</p>
          </div>
        </div>
        <div className={style.buttonsDiv}>
          <Button className={style.btn} type="submit" variant="contained" style={{marginBottom:'1em'}}>
            Ingresar
          </Button>

          <GoogleLogin
            clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
            buttonText="Registrarse con Google"
            onSuccess={responseGoogleSucces}
            onFailure={responseGoogleFail}
            cookiePolicy="single_host_origin"
            style={{ width: '100%' }}
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
