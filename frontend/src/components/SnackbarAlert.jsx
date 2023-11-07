import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for snackbar used to alery users of successful actions.
 */
const SnackbarAlert = ({message, toggleSuccess}) => {
  const [open, setOpen] = React.useState(true);

  /**
   * 
   * @param {*} reason 
   * @returns 
   * 
   * Resets all values to close the snackbar.
   */
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    toggleSuccess();
    setOpen(true);
  };

  /**
   * Automatically closes the snack bar after 3 seconds.
   */
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

SnackbarAlert.propTypes = {
	message: PropTypes.string,
	toggleSuccess: PropTypes.func,
}

export default SnackbarAlert;