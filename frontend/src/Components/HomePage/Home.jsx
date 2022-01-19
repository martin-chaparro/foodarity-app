// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { getOngs} from '../../redux/actions/CompaniesActions';
import styles from './Home.module.css';
import ProductCard from '../ProductCard/ProductCard';
import Navbar from '../Navbar/Navbar';
import FiltroWeb from '../Drawer/FiltroWeb';
import Pagination from '../Pagination/BasicPagination';
import BannerSearch from '../Searchbar/BannerSearch';
import OngSeccion from '../ONGSeccion/OngSeccion';


export default function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const allProducts = useSelector((state) => state.product.products);
  const allProductsList = useSelector((state) => state.product.allProductsList);
  const allOngs = useSelector((state) => state.companies.ongs);
  // TODO revisar si se actualiza

  // const [currentPage, setCurrentPage] = useState(1);

  // PAGINADO LOGICA
  // eslint-disable-next-line no-unused-vars
  // const productPerPage = 5;
  // const indexOfLastProduct = currentPage * productPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  /*  const currentProduct = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ); */

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOngs());
  }, [dispatch]);

  const [allProductValues, setAllProductValues] = useState({
    lote: '',
    size: '',
    page: '',
    categoryName: '',
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    expirationDate: '',
    order: '',
  });

  const handleSearch = () => {
    dispatch(getProducts(allProductValues));
  };

  const paginado = (page) => {
    setAllProductValues({ ...allProductValues, page });
  };

  const filtrado = (params = {}) => {
    const data = {
      categoryId: params.categoryId || null,
      categoryName: params.categoryName || null,
      order: params.order || null,
      minPrice: params.minPrice || null,
      maxPrice: params.maxPrice || null,
      expirationDate: params.expirationDate || null,
    };
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        delete data[key];
      }
    });

    setAllProductValues({ ...allProductValues, ...data, page: 1 });
  };

  const search = (lote) => {
    setAllProductValues({ ...allProductValues, lote, page: 1 });
  };

  useEffect(() => {
    handleSearch();
  }, [allProductValues]);



  return (
    <div>
      <div>
        <Navbar filtrado={filtrado} /> 
        <BannerSearch
          search={search}
          lote={allProductsList}
          sx={{ marginBottom: '1em', width: '100%' }}
          filtrado={filtrado}
        />
        <Pagination paginado={paginado} />
      </div>
      <div className={styles.parent}>
        <div className={styles.filtroWeb}>
          <FiltroWeb filtrado={filtrado} />
        </div>
        <div className={styles.divContainerCards}>
          {allProducts.map((product, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <div className={styles.contOngs}>
        <h2 className={styles.titleOng}>¡Conoce nuestras ONGs!</h2>
          {allOngs?.map((ong) => {
          return (
            
             <OngSeccion key={ong.id} ong={ong}  />
           
          )})
         
        }
        </div>
      </div>
    </div>
  );
}
