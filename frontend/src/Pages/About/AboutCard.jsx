import * as React from 'react';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import styles from './About.module.css';


export default function AboutCard() {

  

  return (
   
    <Card sx={{ background: '#6C698D', boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}} className={styles.containerCard} >
      <CardContent>
        <Typography sx={{ color: "black", background: 'white', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", }} variant="h5" component="div">
        Acerca de Nosotros
        </Typography>
        <Typography sx={{ color: "white", marginTop: 2}} variant="body2">
        <p>Foodarity es una app que te permite ubicar de manera sumamente simple
        ofertas de alimentos en buen estado, pero que están cerca de llegar a su
        tiempo de vida media, lo cual representa un problema muy grande:
        desperdicio de alimentos.
        <br/>
         Foodarity, más que una app, es una comunidad
        donde comercios pueden poner ofertas de alimento que necesitan ser
        vendidos rápidamente al y usuarios comunes puedan aprovecharlas, a su
        vez, damos especial atención a las ONG, que a través de ofertas
        especiales pueden obtener estos alimentos y aprovecharlos en obras
        benéficas. Nuestro nombre Nace de Food (comida) y Solidarity
        (solidaridad), dado nuestro objetivos de luchar contra el desperdicio de
        alimentos, disminuir la generación de desperdicios y brindar ayuda a los
        sectores de la comunidad que más lo necesiten.</p>
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}