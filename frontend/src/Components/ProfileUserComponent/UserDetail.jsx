// eslint-disable-next-line import/no-duplicates
import React, { useState } from 'react';
// eslint-disable-next-line import/no-duplicates
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './UserDetail.module.css';
import RegisterUserFormEditable from './RegisterUserFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function UserDetail({ detail }) {
  const [displayDetail] = useState(true);
  // setDisplayDetail;
  // email, id, phone, photo, deleted, socialPhoto, status;
  const { name, email, phone, status } = detail;

  // function handleOnclick() {
  //   setDisplayDetail(false);
  // }

  return (
    <div className={styles.parent}>
      {displayDetail ? (
        <div>
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 4 }}
            >
              Información de Perfil
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '2em' }}
            >
              Nombre:
              <span style={{ color: '#8865b9' }}>
                {' '}
                {name || 'Usuario no registrado'}{' '}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Email Registrado:
              <span style={{ color: '#8865b9' }}>
                {' '}
                {email || 'No registrado aún'}{' '}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Teléfono de Contacto:
              <span style={{ color: '#8865b9' }}>
                {phone || ' No registrado aún'}{' '}
              </span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Dirección:
              <span style={{ color: '#8865b9' }}> No registrado aún</span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Método de Pago:
              <span style={{ color: '#8865b9' }}> No registrado aún</span>
            </Typography>
          </div>
          <div>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '0' }}
            >
              Status de la Cuenta:
              <span style={{ color: '#8865b9' }}>
                {status || 'En proceso de confirmación'}{' '}
              </span>
            </Typography>
          </div>

          <RegisterUserFormEditable />
        </div>
      ) : (
        <RegisterUserFormEditable />
      )}
    </div>
  );
}
