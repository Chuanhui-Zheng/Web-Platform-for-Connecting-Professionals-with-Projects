import * as React from 'react';
import styles from '../styles/ProfileHeader.module.css'
import {
    Card,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Divider,
    ListItem,
    List,
    IconButton,
    Typography,
    ListItemButton,
    // AccountCircleIcon,
  } from '@mui/material';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { apiGet } from '../api';

function RaitingSideBar({professionals, projectName}) {
    const [name, setNames] = React.useState('');
    const [profilePhoto, setProfilePhoto] = React.useState({});


    const getName = (professionalId) => {
        apiGet('/user/details/professional', professionalId)
        .then((data) => {
            setNames(data)
            setProfilePhoto(d)
        })
    }

    return (
        <Card sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginRight: '4vw', paddingRight: '1vw'}}>
            <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto'}}>
                Project Members
            </Typography>
            <Typography variant='h7' sx={{marginLeft: 'auto', marginRight: 'auto'}}>Start Reviewing each Member</Typography>

            
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: 'auto', marginRight: 'auto'}}>
                {professionals.map((professional, idx) => (
                    <>
                        <ListItemButton alignItems="flex-start">
                            
                        <ListItemAvatar>
                            <AccountCircleIcon sx={{color: 'grey', fontSize: '3rem'}}/> 
                        </ListItemAvatar>
                        <ListItemText
                        primary='NAME here'
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {/* projectHere: */}
                                {projectName}:
                            </Typography>
                            {" Click here to review "}
                            </React.Fragment>
                        }
                        
                        />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                </>    
                ))}
                
            </List>
        </Card>
    ); 
}

export default RaitingSideBar;