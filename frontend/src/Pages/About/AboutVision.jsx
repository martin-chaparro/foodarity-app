import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


export default function AboutVision() {
  return (
    <Card sx={{ width: 400 , height: 372, background: '#6C698D', boxShadow: '4px 4px 10px rgba(0, 0, 0, 1)'}}>
      <CardContent>
        <Typography sx={{ color: "black", background: 'white', borderRadius: 1, display: "flex", justifyContent: "center", alignItems: "center", }} variant="h5" component="div">
        Vision
        </Typography>
        <Typography sx={{ color: "white", marginTop: 3}} variant="body2">
        Crear conciencia sobre la delicada situación alimentaria mundial y ser
        fuente de inspiración para dirigirnos a un futuro sustentable.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}