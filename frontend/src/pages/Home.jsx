import React from "react";
import styles from "../styles/Home.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Find Your Dream Project Today!</h1>
      {/* <h2 className={styles.title}>Find Your Dream Project Today!</h2> */}
      <div class={styles.searchBar}>
        <input 
          type="text" 
          className={styles.search}
          placeholder="Search for a Project Title or Company" 
        />
        <button className={styles.searchButton} onClick={()=>navigate('/allprojects')}>
          <SearchIcon fontSize="medium"></SearchIcon>
        </button>
        
      </div>
    </div>
    </>
  );
}

export default Home;
