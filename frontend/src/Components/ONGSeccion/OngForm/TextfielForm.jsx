import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

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
        defaultValue=""
        value={input.quantity}
        variant="filled"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
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

export function Categoria({ categories, setInput, input }) {
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
          sx={{ width: 464 }}
          name="category"
          value={cat}
          label="Categoria"
          onChange={handleChange}
        >
          {categories.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export function Descripcion({ handleOnChange, input }) {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState('Controlled');

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '464px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-multiline-static"
        label="Descripcion"
        multiline
        rows={4}
        onChange={(e) => {
          handleOnChange(e);
        }}
        value={input.description}
        variant="filled"
        name="description"
      />
    </Box>
  );
}
