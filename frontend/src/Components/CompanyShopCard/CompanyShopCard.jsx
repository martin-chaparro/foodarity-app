import React from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductShopCard from '../ProductShopCard/ProductShopCard';
import styles from './CompanyShopCard.module.css';


export default function CompanyShopCard() {

  return (
    <div className={styles.generalDiv}>
      <div className={styles.productShopCardDiv}>
        <div className={styles.titleCompanyDiv}>
          <p className={styles.titleCompany}>Nombre de compania</p>
        </div>
      </div>
      <ProductShopCard/>
      <div className={styles.TotalDiv}>
          <p className={styles.total}>
              Total $000.000
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
