import React from 'react';
import PropTypes from 'prop-types';
import '../styles/EditForm.css'
import EditForm from '../components/Forms/EditForm';
import { Button, TextField } from "@mui/material";

import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { apiPut } from '../api';

const EditProfessionalProfile = (props) => {
  console.log("edit professional profile")
  const params = useParams();
  const [fullName, setNewFullName] = React.useState('');
  const [emailAddress, setNewEmailAddress] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [bio, setNewBio] = React.useState('');
  const [education, setNewEducation] = React.useState('');
  const [qualification, setNewQualification] = React.useState('');
  const [skills, setNewSkills] = React.useState('');
  const [linkedin, setNewLinkedin] = React.useState('');
  const [otherLinks, setNewOtherLinks] = React.useState('');
  
  const navigate = useNavigate();


  const handleSubmit = async (e) => {


  }
    
    
//     ('http://localhost:5005/editprofile/' + params.id, { // fix
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${props.token}`,
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(args),
//     });
//     const data = await response.json();
//     if (data.error) {
//       alert(data.error);
//     } else {
//       navigate('/profile');  // fix
//     }
//   }

//   const ProfessionalProfileDetails = async () => {
//     const response = await fetch('http://localhost:5005/profiles/' + params.id, { // fix
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${props.token}`,
//         'Content-type': 'application/json',
//       }
//     });
//     const data = await response.json();
//     if (data.error) {
//       alert(data.error);
//     } else {
//       setNewFullName(data.fullName);
//       setNewEmailAddress(data.emailAddress);
//       setNewPhoneNumber(data.phoneNumber);
//       setNewBio(data.bio);
//       setNewEducation(data.education);
//       setNewQualification(data.qualification);
//       setNewSkills(data.skills);
//       setNewLinkedin(data.linkedin);
//       setNewOtherLinks(data.otherLinks);
//     }
//   }

//   React.useEffect(() => {
//     ProfessionalProfileDetails();
//   }, []);

  return (
    <>
        <EditForm formName="Edit Profile" buttonName="Save Changes" handleSubmit={handleSubmit}> 
            <div className="links">
                <a className="link" href="url">email@gmail.com</a>
                <a className="link" href="url">hello.com</a>
                <a className="link" href="url">other professional link</a>
            </div>
            <div className="split-row">
                <div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    label="Full Name"
                    name="fullName"
                    value={fullName}
                    onChange={ (e) => setNewFullName(e.target.value)}
                />
                </div>
                    <TextField
                    variant="filled"
                    margin="normal"
                    className="formInput"
                    type="text"
                    label="Contact Email"
                    name="contactEmail"
                    value={emailAddress}
                    onChange={(e) => setNewEmailAddress(e.target.value)}
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
                    name="phonenNumber"
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
                    label="Skills"
                    name="skills"
                    value={skills}
                    onChange={(e) => setNewSkills(e.target.value)}
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
                    className="formInput"
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
                    className="formInput"
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
                    className="lineInput"
                    type="text"
                    label="Other Links"
                    name="otherlinks"
                    value={otherLinks}
                    onChange={(e) => setNewOtherLinks(e.target.value)}
                    />
                </div>
            </div>     
        </EditForm>

        {/* <div className="formContainer">
            <h3>Edit Profile</h3>
            <div className="links">
                <a className="link" href="url">email@gmail.com</a>
                <a className="link" href="url">linkedin.com</a>
                <a className="link" href="url">other professional link</a>
            </div>
            
            <div className="split-row">
                <div>
                    <label className="formlabel">Full Name</label>
                    <input className="formInput" type="text" value={fullName} onChange={(e) => setNewFullName(e.target.value)} />
                </div>
                <div>
                    <label className="formlabel" htmlFor="contactEmail">Email</label>
                    <input className="formInput" type="text" value={emailAddress} onChange={(e) => setNewEmailAddress(e.target.value)}/>
                </div>
            </div>
            <div className="split-row">
                <div>
                    <label className="formlabel">Phone Number</label>
                    <input className="formInput" type="text" value={phoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <label className="formlabel" htmlFor="contactEmail">Skills</label>
                    <input className="formInput" type="text" value={skills} onChange={(e) => setNewSkills(e.target.value)}/>
                </div>
            </div>
            <div className="row">
                <label className="formlabel">Tell Us About Yourself</label>
                <textarea type="text" value={bio} onChange={(e) => setNewBio(e.target.value)}/>
            </div>
            <div className="split-row">
                <div>
                    <label className="formlabel">Qualifications</label>
                    <input className="formInput" type="text" value={qualification} onChange={(e) => setNewQualification(e.target.value)} />
                </div>
                <div>
                    <label className="formlabel" htmlFor="contactEmail">Education</label>
                    <input className="formInput" type="text" value={education} onChange={(e) => setNewEducation(e.target.value)}/>
                </div>
            </div>
            <div className="row">
                <label className="formlabel">Linkedin</label>
                <input className="lineInput" type="text" value={linkedin} onChange={(e) => setNewLinkedin(e.target.value)}/>
            </div>
            <div className="row">
                <label className="formlabel">Other Professional Link</label>
                <input className="lineInput" type="text" value={otherLinks} onChange={(e) => setNewOtherLinks(e.target.value)}/>
            </div>
            <button onClick={() => editProfessionalProfile()}>Save Changes!</button>
        </div> */}
    </>
  );
}

EditProfessionalProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditProfessionalProfile;