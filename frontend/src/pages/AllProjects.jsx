import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

function AllProjects() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    return (
      <Box>
        <Box sx={{ width: '45%', height: '100%', backgroundColor: 'grey' }}>
          <Collapse orientation="horizontal" in={checked} sx={{ height: '100%'}}>
          <div>
          <h1>Welcome to the Home Page</h1>
          <p>Search Bar here.</p>
        </div>
          </Collapse>
        </Box>
        {/* <div>
          <h1>Welcome to the Home Page</h1>
          <p>Search Bar here.</p>
        </div> */}
      </Box>
      
    );
}

export default AllProjects;