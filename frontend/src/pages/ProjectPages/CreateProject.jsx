import React from 'react';
import { Button, TextField } from '@mui/material';
import '../../styles/Company/CreateProject.css'
import { apiPost } from '../../api';
import MultipleSelectChip from '../../components/MultiSelect';
import MultipleSelectCategoryChip from '../../components/MultiCategorySelect';
import decodeJWT from "../../decodeJWT";
import { useDashboard } from '../../context/DashboardContext';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns 
 * Create project page that allows company user to create a project
 */
const CreateProject = () => {
  const [projectName, setNewProjectName] = React.useState('');
  const [contactEmail, setNewContactEmail] = React.useState('');
  const [categories, setNewCategories] = React.useState([]);
  const [startDate, setNewStartDate] = React.useState('');
  const [endDate, setNewEndDate] = React.useState('');
  const [professionalsWanted, setNewProfessionalsWanted] = React.useState('');
  const [location, setNewLocation] = React.useState('');
  const [keyResponsibilities, setNewKeyResponsibilities] = React.useState('');
  const [skills, setNewSkills] = React.useState([]);
  const [projectDescription, setNewProjectDescription] = React.useState('');
  const [objectives, setNewObjectives] = React.useState('');
  const [confidentialInformation, setNewConfidentialInformation] = React.useState('');
  const navigate = useNavigate();
  const [ownUserId, setOwnUserId] = React.useState('');
  const { triggerDashboardUpdate } = useDashboard();

  // Get userId
  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
    }
  }, []);

  // Call create project api
  const handleSubmit = async (e) => {
    e.preventDefault();
    apiPost("/project/create", {
			companyId: ownUserId,
			projectName: projectName,
			contactEmail: contactEmail,
			projectStartDate: startDate,
			projectEndDate: endDate,
			projectCategories: categories,
			projectLocation: location,
			professionalsWanted: professionalsWanted,
			projectKeyResponsibilites: keyResponsibilities,
			projectSkills: skills,
			projectDescription: projectDescription,
			projectObjectives: objectives,
			projectConfidentialInformation: confidentialInformation
    }).then((data) =>{
			if (!data.error) {
				triggerDashboardUpdate();
			} else {
				throw new Error("Create Project Failed");
			}
    })
    .catch(() => {
			alert("Project Details are not valid.")
    });
    navigate('/dashboard', {state:{showSnackBar: true, message: 'Successfully created project'}})
  }

	// Handle skills input
  const handleSkillsChange = (value) => {
    setNewSkills(typeof value === 'string' ? value.split(',') : value,)
  }

	// Handle categories input
  const handleCategoriesChange = (value) => {
    setNewCategories(typeof value === 'string' ? value.split(',') : value,)
  }

  return (
    <>
    <div className="formContainer">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="formRow">
          <TextField label="Project Name" variant="outlined" required value={projectName} onChange={(e) => setNewProjectName(e.target.value)}/>
          <TextField label="Contact Email" variant="outlined" required value={contactEmail} onChange={(e) => setNewContactEmail(e.target.value)}/>
        </div>

        <div className="formRow">
          <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" value={startDate} onChange={(e) => setNewStartDate(e.target.value)}/>
          <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" value={endDate} onChange={(e) => setNewEndDate(e.target.value)}/>
        </div>

        <div className="formRow">
          <MultipleSelectCategoryChip value={categories} set={handleCategoriesChange} names={["Software", "Construction"]} label="Category"/>
          <TextField label="Location" variant="outlined" value={location} sx={{mt:1.4}}onChange={(e) => setNewLocation(e.target.value)}/>
        </div>

        <div className="formRow">
          <TextField label="Professionals Wanted" variant="outlined" value={professionalsWanted} nChange={(e) => setNewProfessionalsWanted(e.target.value)}/>
          <MultipleSelectChip value={skills} set={handleSkillsChange} label="Required Skills" sx={{ml:3}}/>
        </div>

        <div className="formRow">
          <TextField label="Key Responsibilities" variant="outlined" fullWidth value={keyResponsibilities} onChange={(e) => setNewKeyResponsibilities(e.target.value)}/>
        </div>

        <div className="formRow">
          <TextField label="Project Description" variant="outlined" multiline rows={4} fullWidth required value={projectDescription} onChange={(e) => setNewProjectDescription(e.target.value)}/>
        </div>

        <div className="formRow">
          <TextField label="Objectives" variant="outlined" multiline rows={4} fullWidth value={objectives} onChange={(e) => setNewObjectives(e.target.value)}/>
        </div>

        <div className="formRow">
          <TextField label="Confidential Information" variant="outlined" multiline rows={4} fullWidth value={confidentialInformation} onChange={(e) => setNewConfidentialInformation(e.target.value)}/>
        </div>

        <div className="buttonContainer">
            <Button  sx={{bgColor:"F5A67F"}} onClick={()=>navigate("/dashboard")}>Cancel</Button>
            <Button variant="contained" sx={{bgColor:"F5A67F"}} type="submit">Submit</Button>
        </div>

      </form>
    </div>
    </>
  );
}

export default CreateProject;