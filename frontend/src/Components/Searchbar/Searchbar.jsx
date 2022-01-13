import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

export default function SearchBar({ search, lote }) {
  const options = lote.map((productos) => productos.lote);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    search(inputValue);
  }, [inputValue]);

  return (
    <div>
      <Autocomplete
        // value={value}
        onChange={() => {
          search(inputValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="free-solo-2-demo"
        disableClearable
        freeSolo
        options={options}
        sx={{ width: '100%', backgroundColor: 'white', textColor: 'white' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Buscar..." />}
      />
    </div>
  );
}
