// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
// import { useState } from 'react';
import styles from './UserDetail.module.css';

// import RegisterUserFormEditable from './RegisterUserFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function UserDetail({ detail }) {
  //   const [displayDetail, setDisplayDetail] = useState(true);
  // email, id, phone, photo, deleted, socialPhoto, status;
  const { name } = detail;

  //   function handleOnclick() {
  //     setDisplayDetail(false);
  //   }

  return (
    <div className={styles.infocont}>
      <div className={styles.companydetail}>
        <div className={styles.cont}>
          <h3 className={styles.titulo}>Hola {name}!</h3>
        </div>
        <div>
          <h4>
            Bienvenido a tu portal de usuario, aquí puedes ver tu información de
            cuenta, actualizar tus datos de usuario o ver el historial de tus
            compras anteriores. En caso de requerir ayuda, o simplemente
            enviarnos sugerencias, puedes ver nuestra información en el botón de
            Centro de Ayuda que se encuentra en el menú izquierdo.
          </h4>
        </div>
      </div>
    </div>
  );
}
