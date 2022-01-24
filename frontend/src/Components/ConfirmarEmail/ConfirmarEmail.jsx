/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

function ConfirmarEmail() {
  const params = useParams();
  const navigate = useNavigate();

  const confirm =() => {
    if (params.id > 0) {
      api.post(`users/validate/${params.id}`).then((res) => {
        console.log(res.status)
        if (res.status === 200) {
          alert('Email confirmado, ya puedes ingresar.');
          navigate('/login')
        } else {
          alert('El email ya estaba confirmado, ya puedes ingresas.');
          navigate('/login')
        }
      });
    } else {
      alert('falta el id...');
      navigate('/')
    }
  }

  useEffect(() => {
    confirm()
  },[])

    
  return <div>{}</div>;
}

export default ConfirmarEmail;
