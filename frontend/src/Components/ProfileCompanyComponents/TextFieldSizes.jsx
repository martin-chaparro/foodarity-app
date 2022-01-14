import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

export function NuevoLote({ handleOnChange, input }) {
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
        name="lote"
        value={input.lote}
        variant="filled"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </Box>
  );
}

export function Cantidad({ handleOnChange, input }) {
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
        name="quantity"
        id="filled-size-normal"
        // defaultValue=""
        value={input.quantity}
        variant="filled"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </Box>
  );
}

export function Amount({ handleOnChange, input }) {
  // const [values, setValues] = React.useState({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '224px' }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">
            Precio Unitario ARS{' '}
          </InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={input.price}
            name="price"
            onChange={(e) => {
              handleOnChange(e);
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </Box>
  );
}

export function Fecha({ handleOnChange, input }) {
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
        label="Fecha Expiracion"
        id="filled-size-normal"
        variant="filled"
        type="date"
        name="expirationDate"
        value={input.publicationDate}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </Box>
  );
}

export function Categoria({ setInput, input }) {
  const [cat, setCat] = React.useState('');

  const handleChange = (event) => {
    setCat(event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: '25ch' }}>
        <InputLabel id="demo-simple-select-filled-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          name="category"
          value={cat}
          label="Categoria"
          // onChange={(e) => {
          //   handleOnChange(e);
          // }}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>none</em>
          </MenuItem>
          <MenuItem value="almacen">Almacen</MenuItem>
          <MenuItem value="Restorant/Rotiseria">Restorant/Rotiseria</MenuItem>
          <MenuItem value="Verduleria">Verduleria</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
