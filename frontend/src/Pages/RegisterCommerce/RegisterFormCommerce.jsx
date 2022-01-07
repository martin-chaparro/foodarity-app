/* eslint-disable jsx-a11y/label-has-associated-control */
import Header from '../Component/Header/Header';
import styles from './RegisterFormCommerce.module.css';
import CommerceLogo from '../../assets/Mask-Group.png';

export default function RegisterFormCommerce() {
  return (
    <div className={styles.RegisterFormCommerce}>
      <Header />
      <form className={styles.form}>
        <div className={styles.commerceLogo}>
          <img className={styles.imgLogo} src={CommerceLogo} alt="CommerLogo" />
        </div>
        <div className={styles.divPhoto}>
          <p className={styles.inputText}>Presione para importar una imagen</p>
          <input className={styles.addPhoto} type="file" accept="image/*" />
        </div>
        <div className={styles.divsInputs}>
          <div className={styles.labelNombre}>
            <label>Nombre del comercio</label>
          </div>
          <div className={styles.divInputNombre}>
            <input className={styles.inputNombre} type="text" name="name" />
          </div>
          <div className={styles.labelDescripcion}>
            <label>Descripción</label>
          </div>
          <div className={styles.divInputDescripcion}>
            <input
              className={styles.inputDescripcion}
              type="text"
              name="name"
            />
          </div>
        </div>
        <div className={styles.divButton}>
          <button className={styles.button} type="submit">
            Enviar solicitud de registro
          </button>
        </div>
      </form>
    </div>
  );
}
