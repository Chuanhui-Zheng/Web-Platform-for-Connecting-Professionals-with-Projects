import * as React from 'react';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import BasicChips from "../../components/Chip";
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";

const ProfessionalProfile = () => {
    console.log("professional profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    return (

        <>
        {ProfileHeader()}
        <div className={styles.ProfessionalProfileContent}>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Summary</h1>
            <div className={styles.ProfessionalProfileText}>
                {description}
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Skills</h1>
            <div className={styles.ProfessionalProfileSkillsContainer}>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Projects</h1>
            <div class={styles.ProfessionalProfileProjectList}>
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
            </div>
        </div>
        </>
    );
}

export default ProfessionalProfile;