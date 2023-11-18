import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { apiPost } from '../api';
import { useNavigate } from "react-router-dom";
import decodeJWT from '../decodeJWT';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for the raitings page's main content section.
 */
const RaitingMainContent = ({ selectedUser, projectId }) => {
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [name, setName] = React.useState('');
  const [professionalReview, setReview] = React.useState('');
  const [ownUserId, setOwnUserId] = React.useState('');
  const [userType, setUserType] = React.useState('');

  /**
   * User effect to set the current userId and type
   */
  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
        setUserType(tokenData.userType);
    }
  }, []);

  /**
   * 
   * @param {*} event 
   * @param {*} newValue 
   * 
   * Function to set the raiting that is given
   */
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  /**
   * 
   * @param {*} event 
   * 
   * Saves the review given on change of the review.
   */
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    const reviewConstruct = event.target.value
    setReview(reviewConstruct)
  };

  /**
   * 
   * @param {*} event 
   * 
   * Saves the review content
   */
  const handleReasonChange = (event) => {
    const reviewConstruct = feedback
    setReview(reviewConstruct)
  };

  /**
   * 
   * @param {*} e 
   * 
   * Function to submit the raiting into the database and show the dashboard.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If professional then posts a project review other wise posts a professioanl review for a company.
    if (userType === 'professional') {
      apiPost("/project/professional/rateProject", {
        userId: ownUserId,
        projectId: projectId,
        projectRating: rating,
        projectReview: professionalReview
      }).then((data) =>{
        if (!data.error) {
          console.log('tard is a bitch')
          navigate('/dashboard', {state:{showSnackBar: true, message: 'Rated company'}})
        } else {
          throw new Error("Rate Project Failed");
        }
      })
      .catch((err) => {
        alert(err)
      });
    } else {
      apiPost("/project/company/rateProfessional", {
        userId: selectedUser.professionalId,
        projectId: projectId,
        professionalRating: rating,
        professionalReview: professionalReview
      }).then((data) =>{
        if (!data.error) {
          console.log('fucking bitch')
          navigate('/dashboard', {state:{showSnackBar: true, message: 'Rated professional'}})
        } else {
          throw new Error("Rate Project Failed");
        }
      })
      .catch((err) => {
        alert(err)
      });
    }
  };

  /**
   * Use effect for the selected user to identify which user is being rated.
   */
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
    <Card sx={{width: '100%', paddingLeft: '2vw', height: '100%', borderRadius:'0px 0px 20px 0px'}}>
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
          <Button sx={{marginLeft: '3vw'}} variant="contained" color="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

RaitingMainContent.propTypes = {
	selectedUser: PropTypes.any,
	projectId: PropTypes.any,
}

export default RaitingMainContent;