import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';
import '../styles/Company/CreateProject.css'
import { apiPost } from '../api';
import MultipleSelectChip from '../components/MultiSelect';
import MultipleSelectCategoryChip from '../components/MultiCategorySelect';
import decodeJWT from "../decodeJWT";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import {
  useNavigate,
} from 'react-router-dom';

const CreateProject = (props) => {
  console.log("create project page")
  const [projectName, setNewProjectName] = React.useState('');
  const [contactEmail, setNewContactEmail] = React.useState('');
  const [categories, setNewCategories] = React.useState([]);
  const [startDate, setNewStartDate] = React.useState('');
  const [endDate, setNewEndDate] = React.useState('');
  const [professionalsWanted, setNewProfessionalsWanted] = React.useState('');
  const [location, setNewLocation] = React.useState('');
  const [keyResponsibilites, setNewKeyResponsibilities] = React.useState('');
  const [skills, setNewSkills] = React.useState([]);
  const [projectDescription, setNewProjectDescription] = React.useState('');
  const [objectives, setNewObjectives] = React.useState('');
  const [confidentialInformation, setNewConfidentialInformation] = React.useState('');

  const navigate = useNavigate();
  const [ownUserId, setOwnUserId] = React.useState('');


  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling create project api")
    apiPost("/project/create", {
        companyId: ownUserId,
        projectName: projectName,
        contactEmail: contactEmail,
        projectStartDate: startDate,
        projectEndDate: endDate,
        projectCategories: categories,
        projectLocation: location,
        professionalsWanted: professionalsWanted,
        projectKeyResponsibilites: keyResponsibilites,
        projectSkills: skills,
        projectDescription: projectDescription,
        projectObjectives: objectives,
        projectConfidentialInformation: confidentialInformation
    }).then((data) =>{
        if (!data.error) {
            console.log(data)
        } else {
            throw new Error("Create Project Failed");
        }
    })
    .catch(() => {
        alert("Project Details are not valid.")
    });
    navigate("/companydashboard");
  }

  const handleSkillsChange = (value) => {
    setNewSkills(typeof value === 'string' ? value.split(',') : value,)
  }

  const handleCategoriesChange = (value) => {
    setNewCategories(typeof value === 'string' ? value.split(',') : value,)
  }

  return (
    <>
    <div className="formContainer">
        <h1>Create New Project</h1>
        <div className="split-row">
            <div>
                <label className="formlabel">Project Name</label>
                <input className="formInput" type="text" value={projectName} onChange={(e) => setNewProjectName(e.target.value)} />
            </div>
            <div>
                <label className="formlabel" htmlFor="contactEmail">Contact Email</label>
                <input className="formInput" type="text" value={contactEmail} onChange={(e) => setNewContactEmail(e.target.value)}/>
            </div>
        </div>

        <div className="split-row">
            <div classname="date-div">
                <div classname="date-div1">
                    <label className="formlabel">Start Date</label>
                    <input className="dateInput" type="date" value={startDate} onChange={(e) => setNewStartDate(e.target.value)} />
                </div>
                <div classname="date-div1">
                    <label className="formlabel">End Date</label>
                    <input className="dateInput" type="date" value={endDate} onChange={(e) => setNewEndDate(e.target.value)} />
                </div>
            </div>
            <div>
                <label className="formlabel">Category</label>
                <MultipleSelectCategoryChip 
                    value={categories}
                    set={handleCategoriesChange} 
                    names={["Software", "Construction"]}
                    label="Category" />
            </div>
        </div>

        <div className="split-row">
            <div>
                <label className="formlabel">Location</label>
                <input className="formInput" type="text" value={location} onChange={(e) => setNewLocation(e.target.value)}/>
            </div>
            <div>
                <label className="formlabel">Number of Professionals Wanted</label>
                <input className="formInput" type="text" value={professionalsWanted} onChange={(e) => setNewProfessionalsWanted(e.target.value)}/>
            </div>
        </div>
        <div className="row">
            <label className="formlabel">Key Responsiblities</label>
            <input className="lineInput" type="text" value={keyResponsibilites} onChange={(e) => setNewKeyResponsibilities(e.target.value)}/>
        </div>
        <div className="row">
            <label className="formlabel">Required Skills</label>
            <MultipleSelectChip 
                    value={skills}
                    set={handleSkillsChange} />
        </div>
        <div className="row">
            <label className="formlabel">Project Description</label>
            <textarea type="text" value={projectDescription} onChange={(e) => setNewProjectDescription(e.target.value)}/>
        </div>
        <div className="row">
            <label className="formlabel">Objective</label>
            <textarea type="text" value={objectives} onChange={(e) => setNewObjectives(e.target.value)}/>
        </div>
        <div className="row">
            <label className="formlabel">Confidential Information</label>
            <textarea type="text" value={confidentialInformation} onChange={(e) => setNewConfidentialInformation(e.target.value)}/>
        </div>
        <Button variant="outlined" onClick={handleSubmit}>Post Project!</Button>
    </div> 
    
    </>
  );
}

CreateProject.propTypes = {
  token: PropTypes.string,
}

export default CreateProject;