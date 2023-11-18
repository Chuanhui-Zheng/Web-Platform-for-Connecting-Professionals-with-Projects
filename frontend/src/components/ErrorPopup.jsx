import { Button, DialogContentText } from '@mui/material';
import JEMMADialog from './JEMMADialog';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for a modal that is used to alert users of an error.
 */
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

ErrorPopup.propTypes = {
	message: PropTypes.string,
	toggleError: PropTypes.object,
}

export default ErrorPopup;
