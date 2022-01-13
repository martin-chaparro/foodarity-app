import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { styled, alpha } from '@mui/material/styles';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 1),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 1),
//   },
//   marginRight: theme.spacing(0),
//   marginLeft: 0,
//   width: '50%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(5),
//     width: 'auto',
//   },
// }));

const options = [
  'Pollo',
  'Leche',
  'Quesos',
  'Vegetables',
  'Frutas',
  'Postres',
  'Popotes',
];

export default function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br /> */}
      {/* <Search> */}
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
