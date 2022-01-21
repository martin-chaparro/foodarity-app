import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import estilos from './Bienvenida.module.css';
// import { apiWithToken } from '../../services/api';


export default function EliminarUser(/* {detail} */) {

 /*  const handleDelete = () => {
    apiWithToken.delete(`/users/${detail.id}`).then(res => {
      if (res.status === 200) {
        console.log('borrado')
      } else {
        console.log('algo fallo')
      }
    })
  }
   */

  return (
    <div className={estilos.parent}>
      <div className={estilos.texto}>
        <Box
          sx={{
            width: 300,
            marginTop: 1,
          }}
        >
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 1 }}
            >
              Eliminar la Cuenta
            </Typography>
          </div>
          <br />
          <div>
            <Typography
              variant="body"
              gutterBottom
              sx={{ align: 'justify', color: '#8865b9', marginTop: 7 }}
            >
              Lamentamos que quieras
              <span style={{ color: '#e63946' }}> eliminar </span> tu cuenta.
            </Typography>
            <br />
            <br />
            <Typography
              variant="body"
              gutterBottom
              sx={{ align: 'justify', color: '#8865b9' }}
            >
              Si te preocupa los cambios de nuestras Condiciones de Servicio,
              puedes ponerte en contacto con alguno de nuestros asesores en
              cualquiera de nuestros centros de atención, y con mucho gusto te
              atenderemos.
              <br />
              <br />
              Si estás seguro de eliminar tu cuenta, te recordamos que dispones
              de 15 días posteriores de la eliminación para recuperar tus datos,
              por lo que finalizando ese periodo, tus datos de cuenta quedarán
              completamente eliminados.
            </Typography>
          </div>
        </Box>
      </div>
      <div className={estilos.texto2}>
        <Box
          sx={{
            width: 500,
            // maxWidth: 100,
            marginTop: 1,
          }}
        >
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 3 }}
            >
              Eliminar Cuenta
            </Typography>
          </div>
          <br />
          <div>
            <Typography
              variant="body"
              gutterBottom
              sx={{
                align: 'justify',
                color: '#8865b9',
                marginTop: 7,
                fontSize: 20,
              }}
            >
              Lamentamos que quieras
              <span style={{ color: '#e63946' }}> eliminar </span> tu cuenta.
            </Typography>
            <br />
            <br />
            <Typography
              variant="body"
              gutterBottom
              sx={{ align: 'justify', color: '#8865b9', fontSize: 20 }}
            >
              Si te preocupa los cambios de nuestras Condiciones de Servicio,
              puedes ponerte en contacto con alguno de nuestros asesores en
              cualquiera de nuestros Centros de Atención, y con mucho gusto te
              atenderemos.
              <br />
              <br />
              Si estás seguro de eliminar tu cuenta, te recordamos que dispones
              de 15 días posteriores de la eliminación para recuperar tus datos,
              por lo que finalizando ese periodo, tus datos de cuenta quedarán
              completamente eliminados.
            </Typography>
          </div>
          <Button
            sx={{
              backgroundColor: '#e63946',
              '&:hover': { backgroundColor: '#e6394690 !important' },
              marginTop: 5,
            }}
          >
            ELIMINAR
          </Button>
        </Box>
      </div>
    </div>
  );
}
