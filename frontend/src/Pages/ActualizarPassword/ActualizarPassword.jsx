/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

function ActualizarPassword() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isValid, setisValid] = useState(null);
  const [input, setInput] = useState({
    password: '',
    passwordDos:''
  });

  const confirm = () => {
    const emailCode = searchParams.get('emailcode');
    if (params.id > 0 && emailCode !== '') {
      api.post(`users/validate/${params.id}/${emailCode}`).then((res) => {
        
        if (res.status === 200 || res.status === 201) {
          
          setisValid(emailCode);
        } else {
          setisValid(false);
          alert('Error con el codigo de validacion');
          navigate('/home');
        }
      });
    } else {
      alert('Algo salio mal');
      navigate('/');
    }
  };

  useEffect(() => {
    confirm();
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('/users/updatepassword', {input,emailCode:isValid})
      // eslint-disable-next-line no-alert
      .then(() => {
        alert('Se actualizo la password')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        alert('Algo Salio mal')
        navigate('/')
      });
  };

  return ( isValid ?
    (<div>
      <form onSubmit={handleSubmit}>
        <h1>Formulario para recuparar Contraseña</h1>

        <div>
          <h4>Contraseña</h4>
          <input
            type="text"
            name="password"
            onChange={handleOnChange}
            value={input.password}
          />
        </div>
        <div>
          <h4>Vuelva a introducir su contraseña</h4>
          <input
            type="text"
            name="passwordDos"
            onChange={handleOnChange}
            value={input.passwordDos}
          />
        </div>
        <div>
          <br />
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>): null
  );
}

export default ActualizarPassword;
