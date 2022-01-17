import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './ProductCard.module.css';




export default function ProductCard({ product }) {

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ExpirationDate = product.expirationDate;
  const Date = ExpirationDate.split('-').reverse().join('/');


  const handleCompanyClick = (event, id)=>{
    navigate(`company/${id}`, { replace: true })
  }
  return (
    <div className={styles.productcard}>
      <div className={styles.divImg}>
        <img src={product.photo.url} alt="food" className={styles.img} />
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
              <Box  className={styles.BoxGeneral}>
                <Box className={styles.boxCompany} sx={{ width: 225,}}>
                  <div className={styles.CompanyNameDiv}>
                    <Typography
                      id="modal-modal-description"
                      className={styles.titleTypographyName}
                      onClick={(e) => handleCompanyClick(e, product.company.id)}
                    >
                      {product.company.name}
                    </Typography>
                  </div>
                  <div className={styles.divStreet}>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2,}}
                      className={styles.titleTypographyStreet}
                    ><LocationOnIcon sx={{ position: 'relative', bottom: 5,}}/>
                      {product.company.address.state.name}, {product.company.address.city.name}
                    </Typography>
                    </div>
                      <div className={styles.divFavButton}>
                        <button className={styles.favButton} type='submit'>
                        Añadir a favoritos
                        <FavoriteIcon className={styles.heart}/>
                        </button>
                      </div>
                </Box>
                <Box sx={{ width: 330 }}>
                  <div className={styles.DivPostData}>
                    <div className={styles.PostImgDiv}>
                      <img
                        className={styles.PostImg}
                        src={product.photo.url}
                        alt="ProductPhoto"
                      />
                    </div>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, }}
                    className={styles.titleTypographyDesc}
                  >
                    {product.description}
                  </Typography>
                  </div>
                  <div className={styles.expDate}><h3>
                    El lote expira: {Date}
                    </h3></div>
                    <div className={styles.category}><h3>
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
