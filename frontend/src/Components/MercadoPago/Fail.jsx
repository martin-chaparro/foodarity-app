/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function Fail() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
// hay que traerse el ID por params
const orderId = 1

useEffect(()=> {
  apiWithToken.put(`/orders/${orderId}?fail=true`)
},[])

  return <div>
 {
        (alert('Hubo un error...'),
        console.log(params),
        navigate('/cart'))
      }
  </div>;
}

export default Fail;
