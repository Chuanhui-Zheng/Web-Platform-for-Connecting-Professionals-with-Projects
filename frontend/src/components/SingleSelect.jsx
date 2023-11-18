import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/*
* MUI component that displays a single select input form
* Used for the project status field in edit project
*/
export default function BasicSelect({set, names, label}) {
  const [age, setAge] = React.useState('');

  // Handle field change and set the input in the parent 
  const handleChange = (event) => {
    setAge(event.target.value);
    set(event.target.value)
  };

  return (
    <Box sx={{ minWidth: '25vw' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={label}
          onChange={handleChange}
        >
            {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}