import { Button, DialogContentText } from '@mui/material';
import JEMMADialog from './JEMMADialog';

const ErrorPopup = ({ message, toggleError }) => {    
  return (
    <JEMMADialog
      titleText={message}
      bodyChildren={
        <DialogContentText id="error-dialog-description">
          {"Please try again."}
        </DialogContentText>
      }
      actionChildren={
        <Button onClick={toggleError} color="primary">
          Close
        </Button>
      }
    />
  );
}

export default ErrorPopup;
