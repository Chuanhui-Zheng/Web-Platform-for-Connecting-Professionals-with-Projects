import PropTypes from 'prop-types';
import React from 'react';
import Button from '@mui/material/Button';
import '../styles/Company/CreateProject.css'
// import api from "..//api";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import {
  useNavigate,
} from 'react-router-dom';

const CreateProject = (props) => {
  const [projectName, setNewProjectName] = React.useState('');
  const [contactEmail, setNewContactEmail] = React.useState('');
  const [category, setNewCategory] = React.useState('');
  const [startDate, setNewStartDate] = React.useState('');
  const [endDate, setNewEndDate] = React.useState('');
  const [professionalsWanted, setNewProfessionalsWanted] = React.useState('');
  const [location, setNewLocation] = React.useState('');
  const [keyResponsibilites, setNewKeyResponsibilities] = React.useState('');
  const [requiredSkills, setNewRequiredSkills] = React.useState('');
  const [projectDescription, setNewProjectDescription] = React.useState('');
  const [objectives, setNewObjectives] = React.useState('');
  const [confidentialInformation, setNewConfidentialInformation] = React.useState('');

  const navigate = useNavigate();

  const createProject = async (args) => {
    try {
        // const res = await api.post("/api/projects/create/", 
        //     { 
        //         projectName, 
        //         contactEmail, 
        //         category, 
        //         startDate,
        //         endDate,
        //         professionalsWanted,
        //         location,
        //         keyResponsibilites,
        //         requiredSkills,
        //         projectDescription,
        //         objectives,
        //         confidentialInformation
        //     });
        navigate("/companydashbaord")
    } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
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
                    <input className="dateInput" type="text" value={startDate} onChange={(e) => setNewStartDate(e.target.value)} />
                </div>
                <div classname="date-div1">
                    <label className="formlabel">End Date</label>
                    <input className="dateInput" type="text" value={endDate} onChange={(e) => setNewEndDate(e.target.value)} />
                </div>
            </div>
            <div>
                <label className="formlabel">Category</label>
                <input className="formInput" type="text" value={category} onChange={(e) => setNewCategory(e.target.value)} />
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
            <input className="lineInput" type="text" value={requiredSkills} onChange={(e) => setNewRequiredSkills(e.target.value)}/>
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
        <Button variant="outlined" onClick={() => createProject({
            projectName: projectName,
            contactEmail: contactEmail,
            startDate: startDate,
            endDate: endDate,
            category: category,
            location: location,
            professionalsWanted: professionalsWanted,
            keyResponsibilites: keyResponsibilites,
            requiredSkills: requiredSkills,
            projectDescription: projectDescription,
            objectives: objectives,
            confidentialInformation: confidentialInformation
        })}>Post Project!</Button>
    </div> 
    
    </>
  );
}

CreateProject.propTypes = {
  token: PropTypes.string,
}

export default CreateProject;