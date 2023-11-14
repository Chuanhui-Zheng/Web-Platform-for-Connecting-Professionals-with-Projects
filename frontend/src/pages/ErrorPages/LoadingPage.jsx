import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import presentationscreen from '../../assets/presentationscreen2.png';
import LinearProgress from '@mui/material/LinearProgress';

const imgStyle = {
  position:'absolute',
};

export default function LoadingPage() {
    return (
      <Box sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
        textAlign: 'center', position: 'relative'}}>
        <img src={presentationscreen} style={imgStyle} />
        <Typography variant="h6" color="black" component="h1" position="relative" gutterBottom>
          Loading...<LinearProgress color="success" /><Box color='#F5F5F5'><br></br>.<br></br>.<br></br>.<br></br>.</Box>
      </Typography>
      </Box> 
    );
  }