/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // hay que traerse el ID por params
  const orderId = 1;

  useEffect(() => {
    apiWithToken.put(`/orders/${orderId}`);
  }, []);

  return (
    <div>
      {
        (alert('Compra realizada con exito'),
        console.log(params),
        navigate('/profilecompany'))
      }
    </div>
  );
}

export default Success;
