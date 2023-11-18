import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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