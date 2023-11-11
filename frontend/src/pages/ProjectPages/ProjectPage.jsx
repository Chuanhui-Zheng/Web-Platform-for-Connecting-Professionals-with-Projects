import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import { AppProvider } from '@toolpad/core/AppProvider';

import Header from '../../components/Header';

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0px',
  gap: '10px'
};

const secondaryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0px',
  // paddingLeft: '32px'
};


const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});

const statusOptions = ['Pending', 'Completed', 'Close'];


export default function ProjectPage() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
    };

    const companybuttons = [
      <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}}>Edit Project</Button>,
      <Button key="candidateList" sx={{backgroundColor: "grey"}}>Candidate List</Button>,
      // <Button key="company-status">Project Status</Button>,
      <Button
          sx={{backgroundColor: "#21b6ae"}}
          key="companyStatus"        
          size="small"
          ref={anchorRef}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
      >
      {statusOptions[selectedIndex]}<ArrowDropDownIcon />
      </Button>
    ];

    const professionalButtons = [
      <Button key="status" sx={{backgroundColor: "#21b6ae"}}>Approved</Button>,
    ];
    


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div style={headerStyle}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            <b> Welcome to Project Name</b>
          </Typography>
        </div>
        
        <Box style={secondaryStyle}>
          <Box>
            <Typography variant="h6" component="h1" gutterBottom>
              Company Name
            </Typography>

            <Container sx={{flexDirection: 'row'}}>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessCenterIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Category
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <DateRangeIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Start Date - End Date
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Location
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <GroupsIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Number of People
                </Typography>
              </Box>
            </Container>

            <Typography variant="body2" color="textSecondary" paragraph>
              Required Skills:
            </Typography>
            <Box mb={2}>
              <StyledChip label="React" />
              <StyledChip label="Node.js" />
              <StyledChip label="MongoDB" />
              <StyledChip label="AWS" />
            </Box>


          </Box>
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {companybuttons}
          </ButtonGroup>
        
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Avatar></Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          Project Confidential Information
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Project Description
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Key Responsibilities
        </Typography>
        <List sx={{ listStyleType: 'disc', padding: '10px 40px' }}>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          </List>
          <Typography variant="h5" component="h2" gutterBottom>
          Objectives
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Contact email
        </Typography>
      </Box>
    </Box>
  );
}
