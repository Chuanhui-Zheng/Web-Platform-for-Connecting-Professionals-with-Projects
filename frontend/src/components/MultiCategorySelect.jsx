import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

/** 
 * This is a component taken from Material UI to display a input field that allows
 * users to select multiple field. used for category on the frontend 
 * It will then set the fields in the parent form
 */ 
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * 
 * @param {*} name 
 * @param {*} personName 
 * @param {*} theme 
 * @returns 
 * MUI styles
 */
function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

/**
 * 
 * @param {*} param0 
 * @returns 
 * Set function passed in from parent to set values on selection
 * names parameter to show what can be selected
 * label parameter for the label of the field
 */
export default function MultipleSelectCategoryChip( { set, names, label } ) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  
	/**
	 * 
	 * @param {*} event 
	 * when a user selects input, set field in parent
	 */
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    set(value)
  };

  return (
    <div>
      <FormControl sx ={{mt: 1.5, mb:4, width:'100%'}}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box>
              {selected.map((value) => (
                <Chip key={value} label={value}/>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MultipleSelectCategoryChip.propTypes = {
	set: PropTypes.func,
	names: PropTypes.arrayOf(PropTypes.string),
	label: PropTypes.string,
}