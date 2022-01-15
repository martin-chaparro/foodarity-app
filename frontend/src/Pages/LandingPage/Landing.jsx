import React from 'react';
import { Link } from 'react-router-dom';
// import Header1 from '../../Components/Header/Header1';
// import Footer from '../../Components/Footer/Footer';
import styles from './Landing.module.css';
import logoLanding from '../../assets/Mobil-background-landing.png';

export default function Landing() {
  return (
    <div className={styles.landing}>
      {/* <Header1 /> */}
      <div className={styles.content}>
        <div className={styles.btncontent}>
          <div>
            <Link to="/register">
              <button className={styles.btnreg} type="submit">
                Registrarse
              </button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <button className={styles.btningresar} type="submit">
                Ingresar
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img className={styles.imglogolanding} src={logoLanding} alt="logo" />
        </div>
        <div>
          <Link to="/home">
            <button className={styles.btncontinuar} type="submit">
              Continuar
            </button>
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
