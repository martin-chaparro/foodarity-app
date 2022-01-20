import React, { useEffect } from 'react';
import { apiWithToken } from '../../services/api';

function Fail() {
// hay que traerse el ID por params
const orderId = 1

useEffect(()=> {
  apiWithToken.put(`/orders/${orderId}?fail=true`)
},[])

  return <div>
FAIL
  </div>;
}

export default Fail;
