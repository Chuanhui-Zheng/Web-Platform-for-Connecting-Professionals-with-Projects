import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Basic material ui component for creating chips
 */
export default function BasicChips({ content }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={content} variant="outlined" />
    </Stack>
  );
}

BasicChips.propTypes = {
  content: PropTypes.string,
}