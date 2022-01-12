import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
  const [value, setValue] = React.useState(5);
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

        <p className={styles.description}>
          {product.description.slice(0, 70)}...
        </p>
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
              <Box sx={style} className={styles.BoxGeneral}>
                <Box className={styles.boxCompany} sx={{ width: 225,}}>
                  <div className={styles.CompanyNameDiv}>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2, fontSize: 24, margin: 0 }}
                      className={styles.titleTypographyName}
                    >
                      {product.company.name}
                    </Typography>
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
                        defaultValue={5}
                        precision={1}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            className={styles.star}
                            fontSize="inherit"
                          />
                        }
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2, position: 'relative', left: 0, }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Box>
                  </div>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2, margin: 0, position: 'relative', right: 5, bottom: 40, fontSize: 18, }}
                      className={styles.titleTypographyStreet}
                    ><LocationOnIcon/>
                      {product.company.address.street}
                    </Typography>
                      <div className={styles.divFavButton}>
                        <button className={styles.favButton} type='submit'>
                        Añadir a favoritos
                        <FavoriteIcon sx={{color: 'white',}}/>
                        </button>
                      </div>
                </Box>
                <Box sx={{ width: 330 }}>
                  <div className={styles.DivPostData}>
                    <div className={styles.PostImgDiv}>
                      <img
                        className={styles.PostImg}
                        src={product.photo}
                        alt="ProductPhoto"
                      />
                    </div>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, margin: 0, fontSize: 12 }}
                    className={styles.titleTypographyDesc}
                  >
                    {product.description}
                  </Typography>
                  </div>
                  <div><h3>
                    El lote expira: {product.expirationDate}
                    </h3></div>
                    <div><h3>
                    Categoria: {product.category.name}
                    </h3></div>
                  <div className={styles.divBtnReservar}>
                    <button className={styles.btnReservar} type="submit">
                      Reservar
                    </button>
                  </div>
                </Box>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
