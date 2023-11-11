import '../../styles/EditForm.css'
import { Button, Typography } from "@mui/material";

function EditForm({ formName, buttonName, handleSubmit, children }) {
  return (
    <form onSubmit={handleSubmit} className="formContainer1">
      <Typography
        variant="h4"
        gutterBottom
      >
        {formName}
      </Typography>
      {children}
      <Button 
        className="form-button1" 
        type="submit"
        variant="contained"
        margin="normal"
        sx={{ backgroundColor: '#F5A67F', color: '#fff', margin: 3 }}
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default EditForm;