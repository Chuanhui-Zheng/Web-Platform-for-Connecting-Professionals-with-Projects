import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarAlert = ({message, toggleSuccess}) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
      toggleSuccess();
      setOpen(true);
    };

    React.useEffect(() => {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }, []); 

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackbarAlert;