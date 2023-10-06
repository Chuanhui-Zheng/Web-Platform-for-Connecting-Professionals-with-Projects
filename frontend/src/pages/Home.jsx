import { useNavigate } from 'react-router-dom';
import styles from "../styles/Home.module.css";
import SearchIcon from '@mui/icons-material/Search';
import image from '../assets/projector2.png';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/**
 * Style component for image
 */
const imgStyle = {
  position:'absolute',
  width: 'min(360px, 42vw)',
  right: '6%',
  bottom: '4%',
  opacity: 0.92,
};

/**
 * Home page for Projector platform.
 * 
 * @returns 
 */
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.titleContainer} home-hero`} aria-labelledby="home-title">
        <img src={image} style={imgStyle} alt="Projector illustration" />
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">A better way to collaborate</span>
          <h1 id="home-title" className={styles.title}>Find Your Dream Project Today!</h1>
          <p className="home-hero__copy">
            Meet ambitious professionals, discover meaningful work, and turn good ideas into projects that move.
          </p>
        </div>
        <div className={styles.searchBar} role="search">
          <input 
            type="text" 
            className={styles.search}
            placeholder="Search for a Project Title or Company" 
          />
          <button className={styles.searchButton} onClick={()=>navigate('/allprojects')}>
            <SearchIcon fontSize="medium" />
          </button>
        </div>
        <button className="home-hero__link" onClick={() => navigate('/allprojects')}>
          Explore all projects <ArrowForwardRoundedIcon fontSize="small" />
        </button>
      </div>
    </>
  );
}

export default Home;
