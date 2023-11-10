import React, { useState } from 'react';
import { Grid2, Pagination, Box } from '@mui/material';
import ReviewCard from './ReviewCard';
import styles from "../styles/Pagination.module.css"

const ITEMS_PER_PAGE = 3;

const PaginationCards = ({reviews}) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentItems = reviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  console.log("rat", currentItems)
  return (
    <Box>
      <Grid2 container spacing={2}>
        {currentItems.map((review, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <ReviewCard review={review} />
          </Grid2>
        ))}
      </Grid2>
      <Box className={styles.PaginationBox}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default PaginationCards;