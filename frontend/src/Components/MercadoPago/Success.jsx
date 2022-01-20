import React, { useEffect } from 'react';
import { apiWithToken } from '../../services/api';

function Success() {
// hay que traerse el ID por params
const orderId = 1

useEffect(()=> {
  apiWithToken.put(`/orders/${orderId}`)
},[])

  return <div>
SUCCESS
  </div>;
}

export default Success;
