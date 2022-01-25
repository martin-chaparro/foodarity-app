// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { getOngs } from '../../redux/actions/CompaniesActions';
import styles from './Home.module.css';
import ProductCard from '../ProductCard/ProductCard';
import Navbar from '../Navbar/Navbar';
import FiltroWeb from '../Drawer/FiltroWeb';
import Pagination from '../Pagination/BasicPagination';
import BannerSearch from '../Searchbar/BannerSearch';
import OngSeccion from '../ONGSeccion/OngSeccion';
import NotFound from './NotFound';

export default function Home() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const allProducts = useSelector((state) => state.product.products);
  const allProductsList = useSelector((state) => state.product.allProductsList);
  const allOngs = useSelector((state) => state.companies.ongs);

  const [filterOngs , setFilterOngs] = useState()

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOngs());
  }, [dispatch]);

  useEffect(() => {
    setFilterOngs(allOngs.filter(ongs => ongs.deleted === false && ongs.status === "Habilitada"))
  },[allOngs])

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
        <Navbar filtrado={filtrado} />
        <BannerSearch
          search={search}
          lote={allProductsList}
          sx={{ marginBottom: '1em', width: '100%' }}
          filtrado={filtrado}
        />
      <div className={styles.ongAndTitleContainer}>
      <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', margin: 2 , fontWeight: '700'}}
        >
          Conoce nuestras ONGs
        </Typography>
        <div className={styles.contOngs}>
          {filterOngs?
           ( filterOngs.map((ong) => { return <OngSeccion key={ong.id} ong={ong} />;})): <h2>No hay ONGs</h2>}
        </div>
        </div>
        <Pagination paginado={paginado} />
      <div className={styles.parent}>
        <div className={styles.filtroWeb}>
          <FiltroWeb filtrado={filtrado} />
        </div>
        <div className={styles.divContainerCards}>
          {allProducts.length >0 ? ( allProducts.map((product, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProductCard key={index} product={product} />
          ))): <NotFound />}
        </div>
      </div>
    </div>
  );
          }