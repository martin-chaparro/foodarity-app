import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

export default function SearchBar({ search, lote }) {
  const options = lote.map((productos) => productos.lote);
  // const [value] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');


// BORRAR ESTO
// const [input, setInput] = React.useState('')
// function handleChange(e) {
//   e.preventDefault()
//   setInput(e.target.value)
// }
 useEffect(() => {
  search(inputValue);
 }, [inputValue])

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      {/* BORRAR EL SIGUIENTE FORM */}
      {/* <form onSubmit={e => { e.preventDefault(); search(input)}}>
        <input onChange={e => handleChange(e)} value={input} />
        <button type='submit'>button</button>
      </form> */}
      <br />
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
