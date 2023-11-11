import React, { useState, useEffect, } from 'react';
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
import { apiPost } from '../api';

import { useNavigate, useParams } from "react-router-dom";
import decodeJWT from '../decodeJWT';

function RaitingMainContent({ selectedUser, projectId }) {
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [mainReason, setMainReason] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [name, setName] = React.useState('');
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
    const reviewConstruct = event.target.value
    setReview(reviewConstruct)
  };

  const handleReasonChange = (event) => {
    setMainReason(event.target.value);
    const reviewConstruct = feedback
    setReview(reviewConstruct)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    if (userType === 'professional') {
      console.log('calling', ownUserId, projectId, rating, professionalReview);
      apiPost("/project/professional/rateProject", {
        userId: ownUserId,
        projectId: projectId,
        projectRating: rating,
        projectReview: professionalReview
      }).then((data) =>{
          if (!data.error) {
              console.log(data)
          } else {
              throw new Error("Rate Project Failed");
          }
      })
      .catch((err) => {
          alert(err)
      });
      navigate("/dashboard");
    } else {
      console.log('calling', selectedUser.professionalId, projectId, rating, professionalReview);
      apiPost("/project/company/rateProfessional", {
        userId: selectedUser.professionalId,
        projectId: projectId,
        professionalRating: rating,
        professionalReview: professionalReview
      }).then((data) =>{
          if (!data.error) {
              console.log(data)
          } else {
              throw new Error("Rate Project Failed");
          }
      })
      .catch((err) => {
          alert(err)
      });
      navigate("/dashboard");
    }

  };

  useEffect(() => {
      if (selectedUser !== null) {
        if (userType === 'company') {
          setName(selectedUser.professionalFullName);
        } else {
          setName(selectedUser.companyName);
        }
      }
  }, [selectedUser])

  return (
    <Card sx={{width: '100%', paddingLeft: '2vw', height: '100%'}}>
      <CardContent>
        <Typography variant="body1">This review is for:</Typography>
        <TextField
          fullWidth
          label={name}
          placeholder={`${name} autofilled`}
          disabled
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
                onChange={handleReasonChange}
              />
              <TextField 
                  sx={{ marginTop: '3vh' }}
                fullWidth
                label="Please provide any feedback"
                placeholder="Feedback Here"
                multiline
                rows={4}
                value={feedback}
                onChange={handleFeedbackChange}
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