import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Dialog used for multiple various pop-ups across the platform.
 * It gets titleText and uses it for the title. It gets a set of children for
 * the body and another set for the actions.
 * 
 * @param {*} param0
 * @returns 
 */
const JEMMADialog = ({ titleText, bodyChildren, actionChildren }) => {
  return (  
    <Dialog
      open={true}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">
        {titleText}
      </DialogTitle>
      <DialogContent>
        {bodyChildren}
      </DialogContent>
      <DialogActions>
        {actionChildren}
      </DialogActions>
    </Dialog>
  );
};

JEMMADialog.propTypes = {
  titleText: PropTypes.string,
  bodyChildren: PropTypes.node,
  actionChildren: PropTypes.node
};

export default JEMMADialog;
