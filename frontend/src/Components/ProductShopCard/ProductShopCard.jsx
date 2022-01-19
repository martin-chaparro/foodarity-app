/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from './ProductShopCard.module.css';  

export default function ProductShopCard() {
    return (
        <div className={styles.generalContainerDiv}>
            <div className={styles.subGeneralContainerDiv}>
                <div className={styles.divImg}>
                    <img className={styles.img} src="" alt="" />
                </div>
                <div className={styles.lote}>
           <p>Lote</p>
           </div>
           <div className={styles.details}>
           <button className={styles.buttonDetails} type='submit'>Detalles</button>
           </div>
           <div className={styles.precio}>
           <p>$Precio</p>
           </div>
           <div className={styles.divInput}>
           <input  className={styles.input} type="number"/>
           <p className={styles.stock}>stock disponible</p>
           </div>
           <div className={styles.icon}>
               <button className={styles.deleteButton} type='submit'>
           <DeleteForeverIcon
           onClick=''
           />
           </button>
           </div>
            </div>
        </div>
    )
}
