import React from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import styles from '../styles/ReviewCard.module.css'
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that displays a review card. For a review by a company: 
 * Displays company name, project name, rating and review on the professional's profile.
 * For a review by a professional:
 * displays the professional's name, rating and review on the project page
 * Review parameter has the review dictionary 
 */
const ReviewCard = ({ review, type, page }) => {

	const [name, setName] = React.useState('');
	const [project, setProject] = React.useState('');
	const [rating, setRating] = React.useState('');
	const [reviewContent, setReviewContent] = React.useState('');
    const [photo, setPhoto] = React.useState('');
  
	// Set review details based on review type
	React.useEffect(() => {
        console.log("review", review)
		if (type === "professional") {
			setName(review.projectCompany);
			setProject(review.projectName);
			setRating(review.professionalRating);
			setReviewContent(review.professioanlRatingReview);
            setPhoto(review.projectCompanyLogo);
		} else if (type === "project") {
			setName(review.professionalName);
			setRating(review.projectRating);
			setReviewContent(review.projectRatingReview);
            setPhoto(review.professionalPhoto)
		}
			
	}, [page]);
    
  return (
    <Card sx={{ width: 300, height: 200}}>
      <CardHeader
        avatar={<Avatar src={photo} alt={name} />}
        title={
					<div className={styles.title}>
						{name}
						<div>⭐ {rating}</div>
					</div>
        }
        subheader={project}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {reviewContent}
        </Typography>
      </CardContent>
    </Card>
  );
};

ReviewCard.propTypes = {
    review: PropTypes.object,
    type: PropTypes.string,
    page: PropTypes.number,
}

export default ReviewCard;