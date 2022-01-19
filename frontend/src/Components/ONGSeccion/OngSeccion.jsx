import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OngSeccion.module.css';




export default function OngSeccion( {ong}) {

const navigate = useNavigate(); 

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);



const handleCompanyClick = (event, id)=>{
  navigate(`/company/${id}`, { replace: true })
}

    return (
       
        <div>
        
                
                <div className={styles.cont}>
                    <div className={styles.divImg}>
                        <img src={ong.logo.url} alt="food" className={styles.img}
                          
                         />
                    </div>
                    
                    <div className={styles.content}>
                        <div className={styles.nameDiv}>
                            <h3 className={styles.name}>{ong.name} </h3>
                        </div>
                    </div>
                    <button type='button' onClick={(e)=>{ handleCompanyClick(e, ong.id)} }>VISITAR PERFIL</button>
                </div>
       
        </div>
    )}
