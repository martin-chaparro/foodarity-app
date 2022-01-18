import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './OngSeccion.module.css';




export default function OngSeccion({ongs}) {

  const navigate = useNavigate()
    console.log("CONSOLE LOG ONGS!", ongs)
  
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
  


    return (
        <div>

            {ongs.map((ong) => (
                <div className={styles.cont}>
                    <div className={styles.divImg}>
                        <img src={ong.photo.url} alt="food" className={styles.img} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.nameDiv}>
                            <h3 className={styles.name}>{ong.name}</h3>
                        </div>
                        <p className={styles.description}>
                            {ong.description.slice(0, 70)}...
                        </p>
                    </div>
                </div>

            ))}
        </div>
    )}
