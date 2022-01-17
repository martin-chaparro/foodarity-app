/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import estilos from './RegisterUserFormEditable.module.css';

const Input = styled('input')({
  display: 'none',
});

export default function RegisterUserFormEditable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: '#7ED957',
          '&:hover': { backgroundColor: '#7ED95790 !important' },
          marginTop: 5,
        }}
      >
        ACTUALIZAR DATOS
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ marginTop: 10, zIndex: 9999 }}
      >
        <div className={estilos.contenedor}>
          <FormGroup>
            {/* TITULO */}
            <div className={estilos.cabeza}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ color: '#3E2463', marginTop: 1, position: 'static' }}
              >
                ACTUALIZAR INFORMACIÓN
              </Typography>
            </div>

            {/* CAMBIAR FOTO */}
            <div className={estilos.photo}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <div>
                  <img
                    className={estilos.imgLogo}
                    src="https://acortar.link/s829DX"
                    alt="img"
                  />
                </div>
                <label htmlFor="icon-button-file">
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <h5>Cambiar Foto de Perfil</h5>
              </Stack>
            </div>

            {/* INPUTS: NOMBRE, EMAIL Y CONTRASEÑA */}
            <div className={estilos.inputs1}>
              <h5>Nombre</h5>
              <input type="text" name="name" autoComplete="off" />
              <h5>Email</h5>
              <input type="text" name="name" autoComplete="off" />
              <h5>Contraseña</h5>
              <input type="text" name="name" autoComplete="off" />
              <h5>Número Celular</h5>
              <input type="text" name="name" autoComplete="off" />
            </div>
          </FormGroup>

          {/* BOTONES: CANCELAR Y ACEPTAR */}
          <div className={estilos.botones}>
            <div>
              <Button
                onClick={handleClose}
                type="submit"
                sx={{
                  backgroundColor: '#7ED957',
                  '&:hover': { backgroundColor: '#7ED95790 !important' },
                  marginTop: 5,
                  marginRight: 5,
                }}
              >
                CANCELAR
              </Button>
            </div>
            <div>
              <Button
                onClick={handleClose}
                type="submit"
                sx={{
                  backgroundColor: '#7ED957',
                  '&:hover': { backgroundColor: '#7ED95790 !important' },
                  marginTop: 5,
                }}
              >
                ACEPTAR
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
