import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';

function RaitingMainContent({ selectedUser, projectId }) {
  const { projectID } = useParams();
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [name, setName] = React.useState('');
  // const [professionalRating, setRating] = React.useState('');
  // const [professionalReview, setReview] = React.useState('');
  const [professionalReview, setReview] = React.useState('');
  const [ownUserId, setOwnUserId] = React.useState('');
  const [userType, setUserType] = React.useState('');

  // setName(selectedUser || '');
  console.log(selectedUser)
  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
        setUserType(tokenData.userType);
    }
  }, []);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('calling');
    apiPost("/project/company/rateProfessional", {
      userId: ownUserId,
      projectId: projectID,
      professionalRating: rating,
      professionalReview: professionalReview
    }).then((data) =>{
        if (!data.error) {
            console.log(data)
        } else {
            throw new Error("Rate Project Failed");
        }
    })
    .catch(() => {
        alert("Project Rating are not valid.")
    });

    if (userType === 'company') {
      navigate("/companydashboard");
    } else {
      navigate("/prodashbaord");
    }

  };

  useEffect(() => {
      if (selectedUser !== null) {
        setName(selectedUser.professionalFullName);
      }
  }, [selectedUser])

  return (
    <Card sx={{width: '100%', paddingLeft: '2vw', height: '100%'}}>
      <CardContent>
        <Typography variant="body1">Full Name</Typography>
        <TextField
          fullWidth
          label={name}
          placeholder={`${name} autofilled`}
              />
              <Typography style={{marginTop: '3vh'}} variant="body1">Give {name} a star rating out of 5</Typography>
              <Rating
                name="simple-controlled"
                sx={{color: '#cdc5c6'}}
                value={rating}
                onChange={handleRatingChange}
              />
              <TextField
                fullWidth
                label="What are the main reasons for your rating?"
                placeholder="Main Reason For Raiting"
              />
              <TextField 
                  sx={{ marginTop: '3vh' }}
                fullWidth
                label="Please provide any feedback"
                placeholder="Feedback Here"
                multiline
                rows={4}
              />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained">Back To Project</Button>
            <Button sx={{marginLeft: '3vw'}} variant="contained" color="primary" onClick={handleSubmit}>
              Submit Review
            </Button>
          </Box>
      </CardContent>
    </Card>
  );
};

export default RaitingMainContent;