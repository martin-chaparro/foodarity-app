import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/NavbarCommerce';
import CompanyProductCard from './CompanyProductCard';
import styles from './CompanyVisualizer.module.css';
 import Banner from '../../assets/Banner.jpg';
import { api } from '../../services/api';

export default function CompanyVisualizer() {
  const [company, setcompany] = useState()
  // eslint-disable-next-line no-unused-vars
  const [products, setproducts] = useState()
  const params = useParams()


  useEffect(() => {
  api.get(`/companies/id/${params.id}`).then(res => setcompany(res.data))
  api.get(`/products/company/${params.id}`).then(res => setproducts(res.data))
  }, []);
  
  console.log(params)

  // eslint-disable-next-line no-restricted-globals
  window.scrollTo(0,0);
  
  
  return (
    <div className={styles.componentDiv}>
      <Navbar />
      <div className={styles.GeneralProfileImgs}>
        <div className={styles.BannerDiv}>
          <div className={styles.LogoDiv}>
            <img className={styles.logoImg} src={company?.logo.url} alt="CompanyLogo" />
        </div>
          <img className={styles.bannerImg} src={Banner} alt="CompanyBanner" />
          </div>
      </div>
      <div className={styles.infoContent}>
     
          <div className={styles.email}>
          
            <p>{company?.email}</p>
          </div>
          <div className={styles.phone}>
            <p>Tel. Contacto: {company?.phone}</p>
          </div>
      
          <div className={styles.stateCityNumber}>
            <p className={styles.stateName}>{company?.address.state.name},  </p>
            <p className={styles.cityName}>{company?.address.city.name}  </p>
        
          </div>
          <div className={styles.street}>
            <p className={styles.streetName}>Calle: {company?.address.street}</p>
            <p className={styles.addressNumber}> {company?.address.number}  </p>
          </div>
          <div className={styles.zipcode}>
            <p>Cód. Postal: {company?.address.zipcode}</p>
          </div>
      </div>
      <div className={styles.divh2}>
        <h2 className={styles.h2}>Publicaciones de la empresa</h2>
      </div>
         <div className={styles.divRenderCards}>
         {products && products.map((product, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <CompanyProductCard key={index} product={product} />
         ))}
        </div>
      
    </div>
  );
}
