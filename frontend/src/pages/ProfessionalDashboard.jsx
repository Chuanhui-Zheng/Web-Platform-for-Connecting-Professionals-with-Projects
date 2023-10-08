import React from 'react';
import TitleCard from '../components/Professional/Dashboard/TitleCard.jsx'; 
import ProjectCard from '../components/Professional/Dashboard/ProjectCard.jsx';
import styles from '../styles/Professional/Dashboard.module.css'

const ProfessionalDashboard = () => {
    return (
      <>
        {TitleCard('Rating', '4/5')}
        {TitleCard('Projects Completed', '4/5')}
        {TitleCard('Current Projects', '4/5')}
        {TitleCard('Certifications', '4/5')}
        <div className={styles.dashboardProjects}>
          <h1>Current Projects</h1>
          {ProjectCard('Project Name 1', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
        {ProjectCard('Project Name 2', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
        {ProjectCard('Project Name 3', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
           
        </div>
        <div className={styles.dashboardProjects}>
          <h1>Past Projects</h1>
          {ProjectCard('a', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfa \
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asdaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asd")}
            {ProjectCard('a', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfa \
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asdaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asd")}
            {ProjectCard('a', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfa \
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asdaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdf\
            asd")}
        </div>
      </>
    );
}

export default ProfessionalDashboard;