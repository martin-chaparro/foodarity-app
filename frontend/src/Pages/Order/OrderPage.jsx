/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCart } from '../../redux/actions/cartActions';

function OrderPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.cart);
  const [cart, setCart] = React.useState();

  useEffect(() => {
    if (!params.id) {
      navigate('/home');
    }
    dispatch(getCart());
  }, []);

  useEffect(() => {
    const data = initialCart.filter(
      (item) => item.product.company_id !== params.id
    );
    setCart(data);
  }, [initialCart]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {cart?.map((item) => (
        <div>{item.product.lote}</div>
      ))}
      <div>
        <label>
          <input type="radio" checked={false} onChange={console.log('asd ')}/>
          <span>Mercado Pago</span>
        </label>
        <label>
          <input type="radio" />
          <span>Acordar con el vendedor</span>
        </label>
      </div>
    </div>
  );
}

export default OrderPage;
