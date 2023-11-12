import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import presentationscreen from '../../assets/presentationscreen2.png';
import LinearProgress from '@mui/material/LinearProgress';

// image position layout style
const imgStyle = {
  position:'absolute',
};

/**
 * 
 * @returns 
 * Loading Page for a project
 */
export default function LoadingPage() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#F5F5F5', borderRadius: '20px' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        textAlign: 'center', position: 'relative'}}>
        <img src={presentationscreen} style={imgStyle} />
        <Typography variant="h6" color="black" component="h1" position="relative" gutterBottom>
          Loading...
          <LinearProgress color="success" />
          <Box color='#F5F5F5'><br></br>.<br></br>.<br></br>.<br></br>.</Box>
        </Typography>
      </Box> 
    </Box>
  );
}