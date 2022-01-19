import React, {useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux'
import { getCart, removeInCart} from '../../redux/actions/cartActions'

function CartMenu() {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const handleRemove = (id) => {
    dispatch(removeInCart(id))
  }


  return (
    <span>
      {cart?.map(item => {
        return <MenuItem>
        <span>{item.product.lote}</span>
        <span>{item.quantity}</span>
          <button type='button' onClick={() => {handleRemove(item.product_id)}}>X</button>
          </MenuItem>
      })}
      {!cart.length && <MenuItem>
      CARRITO VACIO
      </MenuItem>}
    </span>
  );
}

export default CartMenu;
