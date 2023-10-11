import "../styles/Form.css"
import { Button, Box } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Form component for authorisation functionality.
 * It uses for input fields and has a button at the end.
 * 
 * @param {*} param0 
 * @returns 
 */
function Form({ buttonName, handleSubmit, children }) {
  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems= "center"
      width="50vw"
    >
      {children}
      <Button 
        className="form-input"
        type="submit"
        variant="contained"
        margin="normal"
        sx={{ backgroundColor: '#3b7c84', color: '#fff', borderRadius:"20px" }}
        onClick={handleSubmit}
      >
        {buttonName}
      </Button>
    </Box>
  );
};

Form.propTypes = {
  buttonName: PropTypes.string,
  handleSubmit: PropTypes.func,
  children: PropTypes.node
};

export default Form