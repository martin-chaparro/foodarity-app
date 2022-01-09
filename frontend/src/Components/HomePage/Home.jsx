// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import styles from './Home.module.css';
import HeaderHome from '../Header/HeaderHome';
import ProfileCard from '../ProfileCard/ProfileCard';
import ProductCard from '../ProductCard/ProductCard';
// import productos from '../Cards/product.json';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../Searchbar/Searchbar';

export default function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const allProducts = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    console.log('HOLAAAAAA');
    dispatch(getProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  // PAGINADO LOGICA
  // eslint-disable-next-line no-unused-vars
  const productPerPage = 5;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.home}>
      <HeaderHome />
      <div className={styles.homecont}>
        <div className={styles.contweb}>
          <ProfileCard />
        </div>

        <div className={styles.contmobile}>
          <SearchBar />

          <div className={styles.ProductCardDiv}>{/* <ProductCard/> */}</div>
          {currentProduct.map((product, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProductCard key={index} product={product} />
          ))}
          <Pagination
            paginado={paginado}
            products={allProducts.length}
            productsPerPage={productPerPage}
          />
        </div>
      </div>
    </div>
  );
}
