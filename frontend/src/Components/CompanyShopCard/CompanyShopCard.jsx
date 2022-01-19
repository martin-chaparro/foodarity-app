import React from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductShopCard from '../ProductShopCard/ProductShopCard';
import styles from './CompanyShopCard.module.css';


export default function CompanyShopCard({cart}) {

  const getTotalPrice = () => {
    let total = 0
    cart.forEach(item => {
      total += item.product.price * item.quantity
    })
    return total
  }

  return (
    <div className={styles.generalDiv}>
      <div className={styles.productShopCardDiv}>
        <div className={styles.titleCompanyDiv}>
          <p className={styles.titleCompany}>{cart[0].product.company.name}</p>
        </div>
      </div>
      {cart?.map(item => <ProductShopCard item={item}/>)}
      
      <div className={styles.TotalDiv}>
          <p className={styles.total}>
              Total ${getTotalPrice()}.00
          </p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buyButton} type="submit">
          Comprar{' '}
          <ShoppingCartCheckoutIcon
            sx={{ widht: 15, height: 15, position: 'relative', left: 2 }}
          />
        </button>
       
      </div>
    </div>
  );
}
