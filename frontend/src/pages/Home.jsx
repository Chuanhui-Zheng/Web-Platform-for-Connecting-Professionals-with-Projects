import React from "react";
import styles from "../styles/Home.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import image from '../assets/projector2.png';


const imgStyle = {
  position:'absolute',
  // top: '10',
  width: '20%',
  // bottom: '',
  top: '53%',
  // left: '10%',
};
function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div className={styles.titleContainer}>
    <img src={image} style={imgStyle} />
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
