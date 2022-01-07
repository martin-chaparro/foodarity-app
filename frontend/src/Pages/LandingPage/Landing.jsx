import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './Landing.module.css';
import logoLanding from '../../assets/Mobil-background-landing.png';

export default function Landing() {
  return (
    <div className={styles.landing}>
      <Header />

      <div className={styles.content}>
        <div className={styles.btncontent}>
          <div>
            <button className={styles.btnreg} type="submit">
              Registrarse
            </button>
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
          <button className={styles.btncontinuar} type="submit">
            Continuar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
