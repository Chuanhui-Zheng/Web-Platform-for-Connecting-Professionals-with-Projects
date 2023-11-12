import React from "react";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <>
    {/* <div className={styles.titleContainer}> */}
      <h1 className={styles.title}>Find Your Dream Project Today!</h1>
      <div class={styles.searchBar}>
        <input 
          type="text" 
          className={styles.search}
          placeholder="Search for a Project Title or Company" 
        />
         <button className={styles.searchButton}>
           🔍
         </button>
       </div>
     {/* </div> */}
    </>
  );
}

export default Home;
