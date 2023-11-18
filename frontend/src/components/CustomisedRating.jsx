import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#cdc5c6',
  },
  '& .MuiRating-iconHover': {
    color: '#cdc5c6',
  },
});
/**
 * 
 * @param {*} param0 
 * @returns 
 * Compoonent that displays rating to 5 stars
 */
export default function CustomisedRating({ value: initialValue }) {
  const value = initialValue
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <StyledRating
        name="customized-color"
        value={value}
        defaultValue={2.5} 
        precision={0.5} 
        readOnly
      />
    </Box>
  );
}

CustomisedRating.propTypes = {
	value: PropTypes.string,
}
