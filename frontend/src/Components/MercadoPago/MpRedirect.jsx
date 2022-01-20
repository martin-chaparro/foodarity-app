/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function MpRedirect() {
  const [params] = useSearchParams();
  const code = params.get('code') || '';
  const state = params.get('state') || '';
  const [enabled, setenabled] = useState(false);
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
      {enabled ? (
        <>
          <br />
          <br />
          <br />
          <h1>Comercio registrado correctamente</h1>
          <p>Aca va el boton para redireccionar o volver</p>
        </>
      ) : (
        <>
          <br />
          <br />
          <br />
          <h1>Cargando</h1>
        </>
      )}
    </div>
  );
}

export default MpRedirect;
