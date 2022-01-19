import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompanyShopCard from '../../Components/CompanyShopCard/CompanyShopCard';
import styles from './ShopCart.module.css';


export default function ShopCart() {
  return (
    <div className={styles.generalDivContainer}>
      <div  className={styles.generalSubDivContainer}>
        <div className={styles.divStringCart}>
      <p className={styles.StringCart}>Carrito <ShoppingCartIcon sx={{width: 20, height: 20, position: 'relative', top: 2, left: 2,}}/></p>
      </div>
      <div className={styles.CompanyShopCardContainer}>
        <CompanyShopCard/>
        </div>
      </div>
    </div>
  );
}
