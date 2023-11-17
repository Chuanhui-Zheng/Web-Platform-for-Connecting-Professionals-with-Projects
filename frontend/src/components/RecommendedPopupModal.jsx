import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    ListItem
} from '@mui/material';
import BrowseCards from './BrowseCards';

const RecommendedPopupModal = ({ titleText, recommended, toggleShowRecommended }) => {
    console.log('here')
    return (
        <Dialog open={true} 
            maxWidth="lg" 
            fullWidth
            sx={{ height: 'auto', maxHeight: '80vh' }}
        >
            <DialogTitle>
                {titleText}
            </DialogTitle>
            <DialogContent dividers>
                {recommended.length > 0 ? (
                    <Grid container spacing={2}>
                        {recommended.map((project, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <ListItem disablePadding>
                                    <BrowseCards project={project} />
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography sx={{ textAlign: 'center', padding: '16px' }}>
                        There are currently no recommendations. Please try again later.
                    </Typography>
                )}
            </DialogContent>
            <Button onClick={toggleShowRecommended} color="primary" style={{ margin: '16px' }}>
                Close
            </Button>
        </Dialog>
    );
}

export default RecommendedPopupModal;