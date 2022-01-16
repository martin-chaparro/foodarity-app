import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import styles from './About.module.css';


export default function AboutValores() {
  return (
    <Card sx={{ minwidth: 275, background: '#6C698D',boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}}className={styles.containerCard}>
      <CardContent>
        <Typography sx={{ color: "black", background: 'white', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", }} variant="h5" component="div">
        Valores
        </Typography>
        <Typography sx={{ color: "white", marginTop: 2}} variant="body2">
        <ul>
          <li>
            <b>Diversidad e Inclusión:</b> Somos un espacio al que todos podemos
            pertenecer, unidos por el objetivo de evitar el innecesario
            desperdicio de alimentos y crear conciencia.
          </li>
          <li>
            <b>Responsabilidad Social:</b> Nuestra comunidad es sumamente
            importante, por eso damos prioridades a las ONG para obtener
            beneficios y ayudar a los más necesitados.
          </li>
          <li>
            <b>Integridad:</b> Trabajamos de manera íntegra y transparente, con
            una fuerte ética profesional y social.
          </li>
          <li>
            <b>Impacto:</b> Creemos firmemente que nuestro trabajo impactará de
            manera positiva la conciencia del colectivo, logrando una reducción
            importante en el desperdicio de alimentos y generación de
            desperdicios.
          </li>
          <li>
            <b>Economía:</b> Ayudamos a los comercios, y especialmente al
            pequeño empresario, a convertir posibles pérdidas en ganancias.
          </li>
        </ul>
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}