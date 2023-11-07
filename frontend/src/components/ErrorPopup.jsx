import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ErrorPopup = ({ message, toggleError }) => {    
  return (
    <Dialog
      open={true}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">
        {message}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          Please try again
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleError} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorPopup;
