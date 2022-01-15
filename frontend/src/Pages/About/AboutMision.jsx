import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function AboutMision() {
  return (
    <Card sx={{ width: 400 , height: 372, background: '#6C698D',}}>
      <CardContent>
        <Typography sx={{ color: "black", background: 'white', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", }} variant="h5" component="div">
        Mision
        </Typography>
        <Typography sx={{ color: "white", marginTop: 5}} variant="body2">
        Evitar la pérdida de alimentos mientras contribuimos para reducir la
        producción de desperdicios y contaminación. Ayudamos a los comerciantes
        a minimizar perdidas mientras que damos oportunidad para que personas
        comunes y ONG puedan adquirir alimentos en buen estado a excelentes
        precios.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}