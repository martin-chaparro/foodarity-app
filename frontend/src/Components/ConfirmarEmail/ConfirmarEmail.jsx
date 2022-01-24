/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useParams, useNavigate,useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

function ConfirmarEmail() {
  const params = useParams();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  
  const confirm =() => {
    const emailCode = searchParams.get('emailcode');
    console.log(emailCode);
    console.log(params.id);
    if (params.id > 0 && emailCode !== '') {
      api.post(`users/validate/${params.id}/${emailCode}`).then((res) => {
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
