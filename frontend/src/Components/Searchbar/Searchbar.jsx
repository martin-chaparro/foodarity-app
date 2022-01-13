import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({ search, lote }) {
  const options = lote.map((productos) => productos.lote);
  // const [value] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');


// BORRAR ESTO
const [input, setInput] = React.useState('')
function handleChange(e) {
  e.preventDefault()
  setInput(e.target.value)
}


  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      {/* BORRAR EL SIGUIENTE FORM */}
      <form onSubmit={e => { e.preventDefault(); search(input)}}>
        <input onChange={e => handleChange(e)} value={input} />
        <button type='submit'>button</button>
      </form>
      <br />
      <Autocomplete
        // value={value}
        onChange={(event, newValue) => {
          search(newValue);
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
    </div>
  );
}
