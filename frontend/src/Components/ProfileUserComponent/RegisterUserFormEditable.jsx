/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validateLetters = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (!/[a-zA-Z ]+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo letras',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };


  const validateEmail = (e) => {
    const { name, value } = e.target;
    const expresion =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setInput({
      ...input,
      [name]: value,
    });
    if (!expresion.test(value)) {
      setErrors({
        ...errors,
        [name]: 'No es un email valido!',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateNum = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    // eslint-disable-next-line no-useless-escape
    if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Solo numeros',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
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
              <input
                required 
                value={input.name}
                type="text"
                name="name"
                autoComplete="off"
                onChange={(e) => {
                  handleOnChange(e);
                  validateLetters(e);
                }}
              />
              <div>
              <p className={estilos.errors}>{errors.name}</p>
              </div>
              <h5>Email</h5>
              <input
                required
                value={input.email}
                type="text"
                name="email"
                autoComplete="off"
                onChange={(e) => {
                  handleOnChange(e);
                  validateEmail(e);
                }}
              />
              <div>
              <p className={estilos.errors}>{errors.email}</p>
              </div>
              <h5>Número Celular</h5>
              <input
                required
                value={input.phone}
                type="text"
                name="phone"
                autoComplete="off"
                onChange={(e) => {
                  handleOnChange(e);
                  validateNum(e);
                }}
              />
              <div>
              <p className={estilos.errors}>{errors.phone}</p>
              </div>
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
