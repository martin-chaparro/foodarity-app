/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalProductDetails from '../ProductCard/ModalProductDetails';
import styles from './ProductShopCard.module.css';  

export default function ProductShopCard({item}) {
    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = React.useState(item.quantity)

  const handleOnChange = (e) => {
      setQuantity(e.target.value)
  }

    return (
        <div className={styles.generalContainerDiv}>
            <div className={styles.subGeneralContainerDiv}>
                <div className={styles.divImg}>
                    <img className={styles.img} src={item.product.photo.url} alt="" />
                </div>
                <div className={styles.lote}>
           <p>{item.product.lote}</p>
           </div>
           <div className={styles.details}>
           <button className={styles.buttonDetails} type='submit'  onClick={handleOpen}>Detalles</button>
           {false && <ModalProductDetails open={open} handleClose={handleClose} />}
           </div>
           <div className={styles.precio}>
           <p><b>${item.product.price * item.quantity}.00</b></p>
           </div>
           <div className={styles.divInput}>
           <input  className={styles.input} type="number" min='1' max={item.product.quantity} value={quantity} onChange={handleOnChange}/>
           <p className={styles.stock}>stock disponible {item.product.quantity}</p>
           </div>
           <div className={styles.icon}>
               <button className={styles.deleteButton} type='submit'>
           <DeleteIcon
           />
           </button>
           </div>
            </div>
        </div>
    )
}
