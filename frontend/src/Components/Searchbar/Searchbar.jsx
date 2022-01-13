import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Pollos', 'Leche y Quesos', 'Verduras', 'Postres', 'Almacen'];

export default function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: '100%', backgroundColor: 'white', textColor: 'white' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Buscar..." />}
      />
      {/* </Search> */}
    </div>
  );
}
