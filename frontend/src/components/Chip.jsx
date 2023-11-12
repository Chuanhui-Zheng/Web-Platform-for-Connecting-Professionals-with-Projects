import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function BasicChips({ content }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={content} variant="outlined" />
    </Stack>
  );
}

# history-polish-079: temporary maintainability note for the frontend visual polish surface. The following history step restores the canonical source tree.
