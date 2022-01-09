import React from 'react';

import styles from './Home.module.css';
import HeaderHome from '../Header/HeaderHome';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProductCard from '../ProductCard/ProductCard';
// import productos from '../Cards/product.json';

export default function Home() {
  // const products = productos;

  // console.log(product);
  return (
    <div className={styles.home}>
      <HeaderHome />
      <div className={styles.homecont}>
        <div className={styles.contweb}>
          <ProfileCard />
        </div>

        <div className={styles.contmobile}>
          <div className={styles.searchbarDiv}>
          <input
            className={styles.searchbar}
            type="text"
            placeHolder="Search.."
          />
            </div>
            <div className={styles.ProductCardDiv}>
            <ProductCard/>
            </div>
            {/* {products.map((product, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ProductCard key={index} product={product} />
            ))} */}
        </div>
      </div>
    </div>
  );
}
