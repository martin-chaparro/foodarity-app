/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const externalReference = params.get('external_reference');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    apiWithToken.put(`/orders/${externalReference}`).then(() => {
      setRedirect(true);
    });
  }, [externalReference]);

  useEffect(() => {
    if (redirect) {
      alert('Compra realizada con exito');
      navigate('/home');
    }
  }, [redirect]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Redirecting...
    </div>
  );
}

export default Success;
