import React from 'react';
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

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditCompanyProfile = (props) => {
  console.log("edit company profile")
  const params = useParams();
  const [companyName, setNewCompanyName] = React.useState('');
  const [password, setNewPassword] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [linkedin, setNewLinkedin] = React.useState('');
  const [companyLogo, setNewCompanyLogo] = React.useState('');
  const [companyWebsite, setNewCompanyWebsite] = React.useState('');
  const [companyDescription, setNewCompanyDescription] = React.useState('');
  const [token, setToken] = React.useState('');
  const [userType, setUserType] = React.useState('')
  const [userId, setUserId] = React.useState()
  const [logo, setNewLogo] = React.useState('null')
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    console.log(getToken)
    if (getToken != null) {
        const tokenData = decodeJWT(getToken);
        setUserType(tokenData.userType)
        setUserId(parseInt(tokenData.userId))
    }
  }, []);

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
    companyLogo: null
        }).then((data) =>{
            console.log(data)
            if (!data.error) {
                console.log("worked");
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
        <EditForm buttonName="Save Changes" handleSubmit={handleSubmit}> 
            <div className='formprofileheader'>{ProfileHeader()}</div>
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
                            value={companyLogo}
                            onChange={(e) => setNewCompanyLogo(e.target.value)}
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
