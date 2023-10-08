import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#cdc5c6',
  },
  '& .MuiRating-iconHover': {
    color: '#cdc5c6',
  },
});

export default function CustomizedRating({ value: initialValue }) {
  const value = initialValue
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <StyledRating
        name="customized-color"
        value={value}
      />
    </Box>
  );
}


