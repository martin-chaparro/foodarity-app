import React, { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import CompanyShopCard from '../../Components/CompanyShopCard/CompanyShopCard';
import styles from './ShopCart.module.css';
import { getCart } from '../../redux/actions/cartActions';



export default function ShopCart() {

  const {cart} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [cartByCommerce, setCartByCommerce] = React.useState()

  useEffect(() => {
    dispatch(getCart())
  },[]
  )

  useEffect(() =>{
    const byCommerce = []
    cart.forEach(item => {
      if (!byCommerce[item.product.company_id]) {
        byCommerce[item.product.company_id] = [item]
      } else {
        byCommerce[item.product.company_id].push(item)
      }
      
    })
    console.log(byCommerce)
    console.log(cartByCommerce)
    setCartByCommerce(byCommerce)
  }, [cart])


  return (
    <div className={styles.generalDivContainer}>
      <div  className={styles.generalSubDivContainer}>
        <div className={styles.divStringCart}>
      <p className={styles.StringCart}>Carrito <ShoppingCartIcon sx={{width: 20, height: 20, position: 'relative', top: 2, left: 2,}}/></p>
      </div>
      <div className={styles.CompanyShopCardContainer}>
        {cartByCommerce?.map(commerceCart => <CompanyShopCard cart={commerceCart}/>)}
        </div>
      </div>
    </div>
  );
}
