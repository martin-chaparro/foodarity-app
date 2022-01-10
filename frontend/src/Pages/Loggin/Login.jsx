/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { logInUsers } from '../../actions/index';
import { startLogin } from '../../redux/actions/authActions';
import Header from '../../Components/Header/Header';
import estilos from './Login.module.css';

export default function Login() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

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
        [name]: 'No es un email válido!!',
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

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Inicio

  // const handleSubmit = (e) => {
  //   e.preventDefault(e);
  //   dispatch(logInUsers(input));
  // };
  const handleSubmit = (e) => {
    e.preventDefault(e);
    dispatch(startLogin(input.email, input.password));
  };

  // Fin

  return (
    <div backgroundColor="transparent">
      <Header />
      <div>
        <div className={estilos.contener}>
          <h3>Ingrese su Email</h3>
          <input
            type="text"
            name="email"
            value={input.email}
            title="Email requerido"
            pattern="[a-zA-Z ]{2,254}"
            required
            placeholder="Email..."
            onChange={(e) => {
              handleOnChange(e);
              validateEmail(e);
            }}
          />
          <p>{errors.email}</p>

          <h3>Ingrese su Contraseña</h3>
          <input
            type="password"
            name="password"
            value={input.password}
            title="Contraseña requerida"
            required
            placeholder="Contraseña..."
            onChange={(e) => {
              handleOnChange(e);
              validatePassword(e);
            }}
          />
          <p>{errors.password}</p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FDFFB6',
              height: '2.5em',
              color: '#3e2463',
              fontStyle: 'bold',
              margin: '3em 2em 2em',
              hover: false,
            }}
            // onClick={(e) => handleSubmit(e)}
            onClick={(e) => handleSubmit(e)}
          >
            Ingresar
          </Button>

          {/* ESTE BOTON ES TEMPORAL, SERÁ ELIMINADO CUANDO SE INGRESE EL BOTON DE LA LIBRERIA DE GOOGLE */}
          <Button
            variant="contained"
            sx={{
              // backgroundColor: '#533c74',
              backgroundColor: '#533c74',
              height: '2.51em',
              color: '#fffff',
              fontStyle: 'bold',
              margin: '1em 1em 1em',
              hover: false,
            }}
          >
            Ingresar con Google
          </Button>

          <Link to="/">
            <Button
              variant="contained"
              sx={{
                // backgroundColor: '#533c74',
                backgroundColor: '#533c74',
                height: '2.5em',
                color: '#fffff',
                fontStyle: 'bold',
                margin: '.5em 2em 2em',
                hover: false,
              }}
            >
              Regresar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
