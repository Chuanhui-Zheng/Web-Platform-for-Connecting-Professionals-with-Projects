import React from 'react';
import PropTypes from 'prop-types';
import '../styles/EditForm.css'
import { ACCESS_TOKEN } from "../constants";
import EditForm from '../components/Forms/EditForm';
import { Button, TextField } from "@mui/material";
// import { apiPost } from "../api";
import decodeJWT from "../decodeJWT";

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
  const [token, setToken] = React.useState(localStorage.getItem(ACCESS_TOKEN));
  const [userType, setUserType] = React.useState('')
  const [logo, setNewLogo] = React.useState('null')
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
    if (token != null) {
        const tokenData = decodeJWT(token);
        setUserType(tokenData.userType)
    }
  }, []);

  const editCompanyProfile = async (args) => {
    const response = await fetch('http://localhost:5005/profiles/' + params.id, { // fix
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      navigate('/profile');  // fix
    }
  }

  const handleSubmit = async (e) => {
    apiPut("/edit/company", {token,
        companyName,
        password,
        phoneNumber,
        companyWebsite,
        companyDescription,
        companyLogo
        }).then((data) =>{
            if (!data.error) {
                console.log("worked");
            } else {
                throw new Error("Edit Failed");
            }
        })
  }

  return (
    <>
        <EditForm formName="Edit Profile" buttonName="Save Changes" handleSubmit={handleSubmit}> 
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    label="Company Name"
                    name="companyName"
                    value={companyName}
                    onChange={ (e) => setNewCompanyName(e.target.value)}
                />
                </div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
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
                    className="formInput"
                    type="text"
                    label="Phone Number"
                    name="companyPhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <TextField  
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    type="text"
                    label="Company Logo"
                    name="Company Logo"
                    value={companyLogo}
                    onChange={(e) => setNewCompanyLogo(e.target.value)}
                />
                </div>
            </div>
            <div className="row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    type="text"
                    label="Linkedin"
                    name="linkedin"
                    value={linkedin}
                    onChange={(e) => setNewLinkedin(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    type="text"
                    label="Company Website"
                    name="Website"
                    value={companyWebsite}
                    onChange={(e) => setNewCompanyWebsite(e.target.value)}
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
            {/* <Button onClick={() => handleSubmit({
                companyName: companyName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                linkedin: linkedin,
                companyWebsite: companyWebsite
            })}>Save Changes!</Button> */}
        </EditForm>


            {/* <h3>Edit Profile</h3>
            <div className="split-row">
                <div>
                    <label className="formlabel">Company Name</label>
                    <input className="formInput" type="text" value={companyName} onChange={(e) => setNewCompanyName(e.target.value)} />
                </div>
                <div>
                    <label className="formlabel" >Email</label>
                    <input className="formInput" type="text" value={emailAddress} onChange={(e) => setNewEmailAddress(e.target.value)}/>
                </div>
            </div>
            <div className="split-row">
                <div>
                    <label className="formlabel">Phone Number</label>
                    <input className="formInput" type="text" value={phoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label className="formlabel" ></label>
                    <div className='formInput'></div>
                </div>
            </div>
            <div className="row">
                <label className="formlabel">Linkedin</label>
                <input className="lineInput" type="text" value={linkedin} onChange={(e) => setNewLinkedin(e.target.value)}/>
            </div>
            <div className="row">
                <label className="formlabel">Company Website</label>
                <input className="lineInput" type="text" value={companyWebsite} onChange={(e) => setNewCompanyWebsite(e.target.value)}/>
            </div>
            <button onClick={() => editCompanyProfile({
                companyName: companyName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                linkedin: linkedin,
                companyWebsite: companyWebsite
            })}>Save Changes!</button> */}
    
    </>
  );
}

EditCompanyProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditCompanyProfile;
