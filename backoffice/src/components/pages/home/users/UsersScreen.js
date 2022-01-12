import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Layout } from '../../../layout/Layout';

export const UsersScreen = () => {
  return (
    <Layout>
      <Grid>
        <Typography variant="h4" gutterBottom component="div">
          User Screen
        </Typography>
      </Grid>
      <Divider />
      <Grid mt={2}>
        <Button variant="outlined">Agregar Usuario</Button>
      </Grid>
      <Grid container spacing={3} pt={2}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <h1>Ejemplo de una card</h1>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
