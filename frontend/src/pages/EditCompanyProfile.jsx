import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import '../styles/EditForm.css'
import { ACCESS_TOKEN } from "../constants";
import EditForm from '../components/Forms/EditForm';
import { Button, TextField } from "@mui/material";
import { apiPut } from "../api";
import decodeJWT from "../decodeJWT";
import ProfileHeader from "../components/ProfileHeader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../components/VisuallyHiddenInput";
import { fileToDataUrl } from '../helpers';
import { useHeader } from '../HeaderContext';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditCompanyProfile = ( { userId }) => {
  console.log("edit company profile")
  const params = useParams();
  const [companyName, setNewCompanyName] = React.useState('');
  const [password, setNewPassword] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [companyLogo, setNewCompanyLogo] = React.useState(null);
  const [companyWebsite, setNewCompanyWebsite] = React.useState('');
  const [companyDescription, setNewCompanyDescription] = React.useState('');
  
  const [ownUserId, setOwnUserId] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);
  const { triggerHeaderUpdate } = useHeader();
  
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    console.log(getToken)
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setOwnUserId(tokenData.userId);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    console.log(file)
    
    fileToDataUrl(file).then((dataUrl) => {
        setNewCompanyLogo(dataUrl); // Store the data URL in state
        console.log("File as data URL:", dataUrl);
      }).catch((error) => {
        console.error("Error converting file to data URL:", error);
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("calling api")
    // console.log(userId)
    apiPut("/edit/company", {id: userId,
    companyName: companyName,
    companyPassword: password,
    companyPhoneNumber: phoneNumber,
    companyWebsite: companyWebsite,
    companyDescription: companyDescription,
    companyLogo: companyLogo
        }).then((data) =>{
            console.log(data)
            if (!data.error) {
                console.log("gots here")
                setRefresh((prev) => !prev);
                triggerHeaderUpdate();
                console.log("worked1");
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
        <div className="formHeader"> <ProfileHeader userId={userId} userType="company" refresh={refresh}/> </div>
        <EditForm buttonName="Save Changes" handleSubmit={handleSubmit} refresh={refresh}> 
            {/* <div className='formprofileheader'>{ProfileHeader()}</div> */}
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput1"
                    label="Company Name"
                    name="companyName"
                    value={companyName}
                    onChange={ (e) => setNewCompanyName(e.target.value)}
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
                    name="companyPhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        sx={{ margin: '30px 0 0 0' }}
                        className="upload"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Company Logo
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            name="companyLogo"
                            value=''
                            onChange={handleFileChange}
                        />
                    </Button>
                </div>
            </div>
            <div className="row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="lineInput"
                    type="text"
                    label="Company Website"
                    name="Website"
                    value={companyWebsite}
                    onChange={(e) => setNewCompanyWebsite(e.target.value)}
                    sx={{width:'65vw'}}
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
                    label="Tell us About Yourself"
                    name="bio"
                    value={companyDescription}
                    onChange={(e) => setNewCompanyDescription(e.target.value)}
                    />
                </div>
            </div>      
        </EditForm>
    </>
  );
}

EditCompanyProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditCompanyProfile;