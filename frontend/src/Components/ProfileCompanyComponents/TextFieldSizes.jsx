import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

export function NuevoLote() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Nombre Nuevo Lote"
        id="filled-size-normal"
        defaultValue=""
        variant="filled"
      />
    </Box>
  );
}

export function Cantidad() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Cantidad"
        type="number"
        id="filled-size-normal"
        defaultValue=""
        variant="filled"
      />
    </Box>
  );
}

export function Amount() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '224px' }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">
            Precio Unitario ARS{' '}
          </InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </Box>
  );
}

export function Fecha() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        // label="Fecha Publicacion"
        id="filled-size-normal"
        defaultValue=""
        variant="filled"
        type="date"
      />
    </Box>
  );
}

export function Categoria() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        // label="Fecha Publicacion"
        id="filled-size-normal"
        defaultValue=""
        variant="filled"
        type="date"
      />
    </Box>
  );
}
