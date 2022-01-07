/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from './RegisterFormUser.module.css';
import img from '../../assets/Mobil-header.png';
import img2 from '../../assets/Mobil-header1.png';
import { registerLocal } from '../../actions';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    if (!/^[A-Z]+$/i.test(value)) {
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
    dispatch(registerLocal(input));
    setInput({
      name: '',
      email: '',
      password: '',
      validatePassword: '',
    });
    navigate('/rollselector')
  };

  return (
    <div className={style.register}>
      <form className={style.form} onSubmit={handleSubmit}>
        <header className={style.header}>
          <img src={img} alt="" />
          <img src={img2} alt="" />
        </header>
        <div>
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
          <p>{errors.name}</p>
        </div>
        <div>
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
          <p>{errors.email}</p>
        </div>
        <div>
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
          <p>{errors.password}</p>
        </div>
        <div>
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
          <p>{errors.validatePassword}</p>
        </div>

        <button className={style.btn} type="submit">
          Registrarme
        </button>

        <button className={style.google}>Registrarse con Google</button>
      </form>
    </div>
  );
}

export default Register;
