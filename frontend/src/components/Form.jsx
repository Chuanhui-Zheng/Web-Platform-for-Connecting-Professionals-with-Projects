import "../styles/Form.css"
import { Button, Typography } from "@mui/material";

function Form({ formName, buttonName, handleSubmit, children }) {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Typography
        variant="h4"
        gutterBottom
      >
        {formName}
      </Typography>
      {children}
      <Button 
        className="form-button" 
        type="submit"
        variant="contained"
        margin="normal"
        sx={{ backgroundColor: '#F5A67F', color: '#fff' }}
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default Form