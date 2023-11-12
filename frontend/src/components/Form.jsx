import "../styles/Form.css"
import { Button, Box } from "@mui/material";

function Form({ buttonName, handleSubmit, children }) {
  return (
    <Box 
      // onSubmit={handleSubmit} 
      // className="form-container"
      // fullWidth
      display="flex"
      flexDirection="column"
      width="50vw"
    >
      {children}
      <Button 
        className="form-input"
        type="submit"
        variant="contained"
        margin="normal"
        sx={{ backgroundColor: '#F5A67F', color: '#fff' }}
        onClick={handleSubmit}
      >
        {buttonName}
      </Button>
    </Box>
  );
}

export default Form