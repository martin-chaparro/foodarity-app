import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import styles from './ProductCard.module.css';
// import Company from '../../assets/SuperDia.png';

const labels = {
  1: 'Bajo',
  2: 'Normal',
  3: 'Bien',
  4: 'Buenisimo',
  5: 'Excelente',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: 300,
  p: 4,
};

export default function ProductCard({ product }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  return (
    <div className={styles.productcard}>
      <div className={styles.divImg}>
        <img src={product.photo} alt="food" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.nameDiv}>
          <h3 className={styles.name}>{product.lote}</h3>
        </div>

        <p className={styles.description}>{(product.description).slice(0,70)}...</p>
        <div className={styles.divInc}>
          <p className={styles.nameInc}>{product.company.name}</p>
          <p className={styles.precio}>${product.price}</p>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btnresdiv}>
            <button className={styles.btnres} type="submit">
              Reservar
            </button>
          </div>
          <div className={styles.btndetdiv}>
            <button
              onClick={handleOpen}
              className={styles.btndet}
              type="submit"
            >
              {' '}
              Ver detalle
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className={styles.Box}>
                  <div className={styles.CompanyNameDiv}>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, fontSize: 20, margin: 0, }}
                    className={styles.titleTypographyName}
                  >
                   {product.company.name}
                  </Typography>
                  </div>
                <div className={styles.DivcompanyData}>
                  <div className={styles.companyImgDiv}>
                  <img className={styles.companyImg} src={product.photo} alt="CompanyPhoto" />
                  </div>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, margin: 0, }}
                  className={styles.titleTypographyDesc}
                >
                  {product.description}
                </Typography>
                </div>
                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    className={styles.Rating}
                    name="hover-feedback"
                    defaultValue={3}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon className={styles.star} fontSize="inherit" />
                    }
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2, position: 'relative', left: 10 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
                <div className={styles.divBtnComprar}>
                <button className={styles.btnComprar} type="submit">Reservar</button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
