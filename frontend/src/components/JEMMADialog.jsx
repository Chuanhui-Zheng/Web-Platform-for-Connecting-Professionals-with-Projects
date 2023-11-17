import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

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

export default JEMMADialog;
