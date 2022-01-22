/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function MpRedirect() {
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const code = params.get('code') || '';
  const state = params.get('state') || '';
  const [enabled, setenabled] = useState();
  // const navigate = useNavigate();

  // const handleRegister = () => {
  //   api.post(`/mercadopago/register?code=${code}&state=${state}`);
  // };

  useEffect(() => {
    if (code !== '' && state !== '') {
      apiWithToken
        .post(`/mercadopago/register?code=${code}&state=${state}`)
        .then((response) => {
          console.log(response.data);
          setenabled(true);
        })
        .catch((error) => {
          console.log(error);
          // navigate('/', { replace: true });
        });
    } else {
      setenabled(false);
      // navigate('/', { replace: true });
    }
  }, []);

  return (
    <div>
      {enabled === true && (
        alert('Comercio registrado correctamente'),
        navigate('/profilecompany')
      )}
      {enabled === false && (
        alert('Hubo un error, vuelva a intentarlo'),
        navigate('/home')
      )}
    </div>
  );
}

export default MpRedirect;
