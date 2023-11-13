import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/EditForm.css'
import EditForm from '../../components/EditForm';
import { Button, Snackbar, TextField } from "@mui/material";
import decodeJWT from "../../decodeJWT";
import ProfileHeader from "../../components/ProfileHeader";
import { fileToDataUrl } from '../../helpers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../../components/VisuallyHiddenInput";
import MultipleSelectChip from '../../components/MultiSelect';
import { useHeader } from '../../HeaderContext';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { apiPut } from '../../api';
import SnackbarAlert from '../../components/SnackbarAlert';

const EditProfessionalProfile = ( { userId } ) => {
  console.log("edit professional profile")
  const params = useParams();
  const [fullName, setNewFullName] = React.useState('');
  const [password, setNewPassword] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [bio, setNewBio] = React.useState('');
  const [education, setNewEducation] = React.useState('');
  const [qualification, setNewQualification] = React.useState('');
  const [skills, setNewSkills] = React.useState([]);
  const [website, setNewWebsite] = React.useState('');
  const [photo, setNewPhoto] = React.useState(null);
 
  const [ownUserId, setOwnUserId] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);
  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();
  const [showSnackBar, setShowSnackbar] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  const toggleSnackbar = () => {
      setShowSnackbar(!showSnackBar)
  }

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    console.log(getToken)
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
        // console.log("edit professinoal profile get own user id from token", tokenData.userId)
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file

    fileToDataUrl(file).then((dataUrl) => {
        setNewPhoto(dataUrl); // Store the data URL in state
        console.log("File as data URL:", dataUrl);
    }).catch((error) => {
        console.error("Error converting file to data URL:", error);
    });
  };

  const handleSkillsChange = (value) => {
    setNewSkills(typeof value === 'string' ? value.split(',') : value,)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling api")
    apiPut("/edit/professional", {
        id: userId,
        professionalFullName: fullName,
        professionalPassword: password,
        professionalWebsite: website,
        professionalPhoneNumber: phoneNumber,
        professionalDescription: bio,
        professionalQualifications: qualification,
        professionalEducation: education,
        professionalSkills: skills,
        professionalPhoto: photo
    }).then((data) =>{
        console.log("frontend")
        console.log(password + "hi")
        console.log(data)
        console.log(photo)
        if (!data.error) {
            setRefresh((prev) => !prev);
            console.log("worked editprof");
            triggerHeaderUpdate();
            toggleSnackbar();
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
        <div className="formHeader"> <ProfileHeader userId={userId} userType="professional" refresh={refresh}/> </div> 
        <EditForm buttonName="Save Changes" handleSubmit={handleSubmit}> 
            {/* <div className='formprofileheader'>{ProfileHeader()}</div> */}
            <div className="split-row" sx={{padding:0}}>
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    label="Full Name"
                    name="fullName"
                    value={fullName}
                    onChange={ (e) => setNewFullName(e.target.value)}
                />
                </div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Phone Number"
                    name="phonenNumber"
                    value={phoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <MultipleSelectChip 
                    
                    value={skills}
                    set={handleSkillsChange} />
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
                    label="Tell us About Yourself"
                    name="bio"
                    value={bio}
                    onChange={(e) => setNewBio(e.target.value)}
                    />
                </div>
            </div>
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Qualifications"
                    name="qualifications"
                    value={qualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    type="text"
                    label="Education"
                    name="Education"
                    value={education}
                    onChange={(e) => setNewEducation(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="lineInput"
                    type="text"
                    label="Website"
                    name="Website"
                    value={website}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    sx={{width:'65vw'}}
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <Button
                        sx={{ margin: '30px 0 0 0' }}
                        className="upload"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Profile Photo
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            name="professionalPhoto"
                            value=''
                            onChange={handleFileChange}
                        />
                    </Button>
                    {fileName && <p>Selected file: {fileName}</p>}
                </div>
            </div>     
        </EditForm>
        {showSnackBar && <SnackbarAlert message={'Successfully edited profile'} toggleSuccess={toggleSnackbar}/>}
    </>
  );
}

EditProfessionalProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditProfessionalProfile;