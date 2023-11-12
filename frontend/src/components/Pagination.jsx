import React, { useState } from 'react';
import { Grid2, Pagination, Box } from '@mui/material';
import ReviewCard from './ReviewCard';
import styles from "../styles/Pagination.module.css"
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that creates pages for review cards
 * It displays a varying amount of reviews on a page
 * and has a pagination feature to change pages
 */
const PaginationCards = ({reviews, type}) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);  

	// Change how many cards displayed on a page based on window size
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width > 1560 && width <= 1950) {
        setItemsPerPage(4);
      } else if (width > 1950) {
        setItemsPerPage(5); 
      } else if (width < 1560 && width >= 1170) {
        setItemsPerPage(3); 
      } else if (width < 1170) {
        setItemsPerPage(2); 
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

	const totalPages = Math.ceil(reviews.length / itemsPerPage);

	// Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };
  const currentItems = reviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {currentItems.map((review, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <ReviewCard review={review} type={type} page={page}/>
          </Grid2>
        ))}
      </Grid2>
      <Box className={styles.PaginationBox}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
};

PaginationCards.propTypes = {
    reviews: PropTypes.object,
    type: PropTypes.string,
}

export default PaginationCards;
