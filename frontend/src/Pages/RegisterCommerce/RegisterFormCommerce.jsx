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
        <div className={styles.divsInputs}>
          <div className={styles.labelNombre}>
            <label>Nombre del comercio</label>
          </div>
          <div className={styles.divInputNombre}>
            <input className={styles.inputNombre} type="text" name="name" autoComplete='off'/>
          </div>
          <div className={styles.labelNombre}>
            <label>Url de sitio web</label>
          </div>
          <div className={styles.divInputNombre}>
            <input className={styles.inputNombre} type="text" name="name" autoComplete='off'/>
          </div>
          <div className={styles.labelDescripcion}>
            <label>Descripción</label>
          </div>
          <div className={styles.divInputDescripcion}>
            <textarea
              className={styles.inputDescripcion}
              type="text"
            />
          </div>
          <div className={styles.divlabelPhone}>
            <label className={styles.labelPhone}>Teléfono</label>
          </div>
          <div className={styles.phoneDivs}>
            <input
              className={styles.areacod}
              type="number"
              placeholder="Cód. Área"
            />
            <input
              className={styles.phonenumber}
              type="number"
              placeholder="Número"
            />
          </div>
          <div className={styles.divlabelDir}>
            <label className={styles.labelDir}>Dirección</label>
          </div>
          <div className={styles.divInputsCalleyNum}>
            <input 
            className={styles.calle} 
            type="text" 
            placeholder="Calle" />
            <input
              className={styles.numCalle}
              type="number"
              placeholder="Número de calle"
            />
          </div>
          <div className={styles.divCodPostal}>
              <input 
              className={styles.inputCodPostal}
              type="number" 
              placeholder='Cód. Postal'/>
          </div>
          <div className={styles.divCiudadyProv}>
            <input 
            className={styles.inputCiudad}
            type="text" 
            placeholder="Ciudad" />
            <input 
                className={styles.inputProv}
            type="text" 
            placeholder="Provincia" />
          </div>
          <div className={styles.divSelects}>
          <select className={styles.selectCiudad}>
              <option value="City">Ciudad</option>
          </select>
           <select className={styles.selectProvincia}> 
            <option value="Prov">Provincia</option>
           </select>
          </div>
        </div>
        <div className={styles.divButton}>
          <button 
          className={styles.button} 
          type="submit">Enviar solicitud de registro</button>
        </div>
      </form>
    </div>
  );
}
