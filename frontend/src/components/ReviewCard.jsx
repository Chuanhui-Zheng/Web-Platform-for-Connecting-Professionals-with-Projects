import React from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import styles from '../styles/ReviewCard.module.css'

const ReviewCard = ({ review }) => {

  return (
    <Card sx={{ width: 300, height: 200}}>
      <CardHeader
        avatar={<Avatar src={""} alt={review.projectCompany} />}
        title={
            <div className={styles.title}>
                {review.projectCompany}
                <div>⭐ {review.professionalRating}</div>
            </div>
        }
        subheader={review.projectName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {review.professioanlRatingReview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;