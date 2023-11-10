import React from 'react';
import '../../styles/EditForm.css';
import EditForm from '../../components/EditForm';
import { TextField } from "@mui/material";
import { apiPut } from "../../api";
import decodeJWT from "../../decodeJWT";
import MultipleSelectCategoryChip from '../../components/MultiCategorySelect';
import MultipleSelectChip from '../../components/MultiSelect';
import BasicSelect from '../../components/SingleSelect';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditProject = ( { userId }) => {
  console.log("p")
  const params = useParams();
  const [projectName, setNewProjectName] = React.useState('');
  const [contactEmail, setNewContactEmail] = React.useState('');
  const [category, setNewCategories] = React.useState([]);
  const [startDate, setNewStartDate] = React.useState('');
  const [endDate, setNewEndDate] = React.useState('');
  const [professionalsWanted, setNewProfessionalsWanted] = React.useState('');
  const [location, setNewLocation] = React.useState('');
  const [keyResponsibilites, setNewKeyResponsibilities] = React.useState('');
  const [skills, setNewSkills] = React.useState([]);
  const [projectStatus, setNewProjectStatus] = React.useState('');
  const [projectDescription, setNewProjectDescription] = React.useState('');
  const [objectives, setNewObjectives] = React.useState('');
  const [confidentialInformation, setNewConfidentialInformation] = React.useState('');
  
  const navigate = useNavigate();
  const [token, setToken] = React.useState('');
  const [ownUserId, setOwnUserId] = React.useState('');

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    console.log(getToken)
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
    }
  }, []);

  const handleSkillsChange = (value) => {
    setNewSkills(typeof value === 'string' ? value.split(',') : value,)
  }

  const handleCategoriesChange = (value) => {
    setNewCategories(typeof value === 'string' ? value.split(',') : value,)
  }

  const handleStatusChange = (value) => {
    setNewProjectStatus(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling api")
    console.log(token)
    console.log(params.projectID.replace(":",""))
    // console.log(userId)
    apiPut("/edit/project", {token: token,
        projectId: params.projectID.replace(":",""),
        projectName: projectName,
        contactEmail: contactEmail, 
        projectStartDate: startDate,
        projectEndDate: endDate,
        projectCategory: category,
        projectLocation: location,
        professionalsWanted: professionalsWanted,
        projectKeyResponsibilities: keyResponsibilites, 
        projectSkills: skills,
        projectDescription: projectDescription,
        projectObjectives: objectives,
        projectConfidentialInformation: confidentialInformation,
        projectStatus: projectStatus
        }).then((data) =>{
            if (!data.error) {
                console.log("edit project worked")
                console.log(data)
            } else {
                throw new Error("Edit Failed");
            }
        })
        .catch(() => {
            alert("Edit details are not valid.")
          });
  }

  return (
    <>
        <EditForm formName="Edit Project" buttonName="Save Changes" handleSubmit={handleSubmit}> 
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    label="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={ (e) => setNewProjectName(e.target.value)}
                />
                </div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Contact Email"
                    name="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                />
            </div>
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="date"
                    label="Start Date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="date"
                    label="End Date"
                    name="endDate"
                    format=""
                    value={endDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    label="Location"
                    name="location"
                    value={location}
                    onChange={ (e) => setNewLocation(e.target.value)}
                />
                </div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Number of Professionals Wanted"
                    name="professionalsWanted"
                    value={professionalsWanted}
                    onChange={(e) => setNewProfessionalsWanted(e.target.value)}
                />
            </div>
            <div className="row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="lineInput"
                    type="text"
                    label="Key Responsibilities"
                    name="keyResponsibilites"
                    value={keyResponsibilites}
                    onChange={(e) => setNewKeyResponsibilities(e.target.value)}
                    sx={{width:'65vw'}}
                    />
                </div>
            </div>       
            <div className="split-row"> 
                <div>
                <MultipleSelectChip 
                    value={skills}
                    set={handleSkillsChange} />
                </div>
                <div>
                <MultipleSelectCategoryChip 
                    value={category}
                    set={handleCategoriesChange}
                    names={["Software", "Construction"]}
                    label="Category" />
                </div>
            </div>  
            <div className="row">
                <div>
                    <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={4}
                    variant="filled"
                    className="textareaform"
                    margin="normal"
                    type="text"
                    label="Project Description"
                    name="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    />
                </div>
            </div>    
            <div className="row">
                <div>
                    <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={4}
                    variant="filled"
                    className="textareaform"
                    margin="normal"
                    type="text"
                    label="Objective"
                    name="projectObjective"
                    value={objectives}
                    onChange={(e) => setNewObjectives(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <TextField
                    id="filled-multiline-static"
                    multiline
                    rows={4}
                    variant="filled"
                    className="textareaform"
                    margin="normal"
                    type="text"
                    label="Confidential Information"
                    name="confidentialInformation"
                    value={confidentialInformation}
                    onChange={(e) => setNewConfidentialInformation(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div>
                <BasicSelect 
                    value={projectStatus}
                    set={handleStatusChange} 
                    names={["Complete", "Active"]}
                    label="Project Status"
                    
                 />
                    
                </div>
               
            </div>    
            

        </EditForm>
    </>
  );
}

export default EditProject;