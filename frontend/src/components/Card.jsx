import { Box, Typography } from "@mui/material";

function Card({ headerText, descriptionOneText, descriptionTwoText, handleClick, children }) {
  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      sx={{
        width: '80vw',
        border: '1px solid black',
        borderRadius: '8px',
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          transform: 'scale(1.008)',
        },
        alignItems: "center",
        alignContent: "center",
        padding: "10px"
      }}
      onClick={handleClick}
    >
      <Box 
        display="flex" 
        flexDirection="column"
      >
        <Typography
          variant="h3"
        >
          {headerText}
        </Typography>
        <Typography
          variant="p"
        >
          {descriptionOneText}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap="10px"
      >
        {children}
      </Box>
    </Box>
  );
}

export default Card;