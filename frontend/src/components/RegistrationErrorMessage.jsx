import { Typography, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import PropTypes from 'prop-types';

/**
 * 
 * @returns 
 * Compoent for registration error message.
 */
function RegistrationErrorMessage({ emailError = false, passwordError = false }) {
  if (!emailError && !passwordError) return null;

  return (
    <Box role="alert" aria-live="polite" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body1" component="h3" sx={{ color: "red" }}>
        Error:
      </Typography>
      <List>
        {emailError && <ListItem>
          <ListItemIcon>
            <CircleIcon sx={{ color: "red", fontSize: 8 }} />
          </ListItemIcon>
          <ListItemText primary="Must be a valid email" sx={{ color: "red" }} />
        </ListItem>}
        {passwordError && <ListItem>
          <ListItemIcon>
            <CircleIcon sx={{ color: "red", fontSize: 8 }} />
          </ListItemIcon>
          <ListItemText primary="Password must be at least 8 characters long with at least 1 upper case and at least 1 lower case character" sx={{ color: "red" }} />
        </ListItem>}
      </List>
    </Box>
  );
}

RegistrationErrorMessage.propTypes = {
  emailError: PropTypes.bool,
  passwordError: PropTypes.bool,
};

export default RegistrationErrorMessage;
