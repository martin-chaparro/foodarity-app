/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { GoogleLogin } from 'react-google-login';
// import { logInUsers } from '../../actions/index';
import { startGoogleLogin, startLogin } from '../../redux/actions/authActions';
// import Header from '../../Components/Header/Header';
import estilos from './Login.module.css';
import logo from '../../assets/WEB-Full-Header-Logo.png';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        [name]: 'No es un email válido!',
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

  const responseGoogleSucces = ({ tokenId }) => {
    dispatch(startGoogleLogin(tokenId));
  };
  const responseGoogleFail = () => {
    navigate('/login', { replace: true });
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
    <div backgroundcolor="transparent">
      <div className={estilos.contLogo}>
        <Link to='/'>
     <img className={estilos.logo}src={logo} alt="" />
     </Link>
     </div>
     <form onSubmit={handleSubmit}>
      <div>
        <div className={estilos.contener}>
          <h3>Ingrese su Email</h3>
          <input
            type="text"
            name="email"
            value={input.email}
            autoComplete="off"
            title="Email requerido"
            pattern="[a-zA-Z ]{2,254}"
            required
            placeholder="Email..."
            onChange={(e) => {
              handleOnChange(e);
              validateEmail(e);
            }}
          />
          <div className={estilos.divErrorEmail}>
            <p className={estilos.errors}>{errors.email}</p>
          </div>
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
          <div className={estilos.divErrorContraseña}>
            <p className={estilos.errors}>{errors.password}</p>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FDFFB6',
              height: '2.5em',
              color: '#3e2463',
              fontStyle: 'bold',
              margin: '3em 2em 2em',
            }}
            // onClick={(e) => handleSubmit(e)}
            onClick={(e) => handleSubmit(e)}
          >
            Ingresar
          </Button>

          <GoogleLogin
            clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
            buttonText="Continuar con Google"
            onSuccess={responseGoogleSucces}
            onFailure={responseGoogleFail}
            cookiePolicy="single_host_origin"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </form>
    </div>
  );
}
