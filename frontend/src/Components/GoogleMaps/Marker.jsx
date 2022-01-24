import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './Maker.module.css';

function Marker({company}) {

  window.scroll(0, 0)

  return(  
  <div >
    <Link to={`/company/${company.id}`} textDecoration="none">
    <div className={styles.container}>
    <div className={styles.title}>{company.name}</div>
    </div>
    {company.company_type_id === 1 ?
    <LocationOnIcon color='primary'/> :
    <LocationOnIcon color='secondary'/> 
    }
    </Link>
  </div>
  )}

export default Marker;
