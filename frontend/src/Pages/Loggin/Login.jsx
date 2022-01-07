import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import estilos from './Login.module.css';
import logo from '../../assets/Mobil-Full-Header-Logo.png';

export default function Login() {
  return (
    <div backgroundColor="transparent">
      <header className={estilos.header}>
        <div className={estilos.logo}>
          <img src={logo} alt="logo" />
        </div>
      </header>
      <div className={estilos.contener}>
        <h3>Ingrese su Email</h3>
        <input
          type="text"
          name="email"
          title="Email requerido"
          pattern="[a-zA-Z ]{2,254}"
          required
          placeholder="Email..."
        />
        <h3>Ingrese su Contraseña</h3>
        <input
          type="password"
          name="password"
          title="Contraseña requerida"
          required
          placeholder="Contraseña..."
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FDFFB6',
            height: '2.5em',
            color: '#3e2463',
            fontStyle: 'bold',
            margin: '5em 2em 2em',
            hover: false,
          }}
        >
          Ingresar
        </Button>

        {/* ESTE BOTON ES TEMPORAL, SERÁ ELIMINADO CUANDO SE INGRESE EL BOTON DE LA LIBRERIA DE GOOGLE */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#533c74',
            height: '2.51em',
            color: '#fffff',
            fontStyle: 'bold',
            margin: '10em 2em 2em',
            hover: false,
          }}
        >
          Ingresar con Google
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#533c74',
              height: '2.5em',
              color: '#fffff',
              fontStyle: 'bold',
              margin: '10em 2em 2em',
              hover: false,
            }}
          >
            Regresar
          </Button>
        </Link>
      </div>
    </div>
  );
}
