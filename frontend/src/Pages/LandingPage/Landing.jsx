import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Landing.module.css';
import logoLanding from '../../assets/Mobil background landing.png';

export default function Landing() {
  return (
    <div className={styles.landing}>
      <Header />

      <div className={styles.content}>
        <div className={styles.btncontent}>
          <div>
            <button type="submit">Registrarse</button>
          </div>
          <div>
            <button type="submit">Ingresar</button>
          </div>
        </div>
        <div>
          <img src={logoLanding} alt="logo" />
        </div>
        <div>
          <button type="submit">Continuar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
