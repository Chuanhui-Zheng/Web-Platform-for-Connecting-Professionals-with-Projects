import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

function RegistrationErrorMessage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body1" component="h3" sx={{ color: "red" }}>
        Error:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Must be a valid email" sx={{ color: "red" }} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Password must be at least 8 characters long with at least 1 upper case and at least 1 lower case character" sx={{ color: "red" }} />
        </ListItem>
      </List>
    </Box>
  );
}

export default RegistrationErrorMessage;
