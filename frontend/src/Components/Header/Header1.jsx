import React from 'react';

import { AppBar} from '@mui/material';

import styles from './Header1.module.css';
import logo from '../../assets/Mobil-Full-Header-Logo.png'
import logo1 from '../../assets/WEB-Logo-Combinado.png';

export default function Header1() {
  return (
      <AppBar>
      <img className={styles.logo1} src={logo1} alt="" />
      <img className={styles.logo} src={logo} alt=""/>
      </AppBar>
    //   <div className={styles.btncont}>
    //     <IconButton>
    //     <Stack spacing={2} direction="row">
    //     <Link to="/login">
    //       <Button variant="contained" type='submit'>Ingresar</Button>
    //       </Link>
    //       <Link to="/register">
    //       <Button variant="contained" type='submit'>Registrarse</Button>
    //       </Link>
    //     </Stack>
    //     </IconButton>
    //   </div>
    // </header>
  );
}
