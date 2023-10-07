import React from 'react';
import PropTypes from 'prop-types';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditProfessionalProfile = (props) => {
  const params = useParams();
  const [fullName, setNewFullName] = React.useState('');
  const [emailAddress, setNewEmailAddress] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [bio, setNewBio] = React.useState('');
  const [education, setNewEducation] = React.useState('');
  const [qualification, setNewQualification] = React.useState('');
  const [skills, setNewSkills] = React.useState('');
  const [linkedin, setNewLinkedin] = React.useState('');
  const [otherLinks, setOtherLinks] = React.useState('');
  
  const navigate = useNavigate();


  const editProfessionalProfile = async (args) => {
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

  const ProfessionalProfileDetails = async () => {
    const response = await fetch('http://localhost:5005/profiles/' + params.id, { // fix
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setNewFullName(data.fullName);
      setNewEmailAddress(data.emailAddress);
      setNewPhoneNumber(data.phoneNumber);
      setNewBio(data.bio);
      setNewEducation(data.education);
      setNewQualification(data.qualification);
      setNewSkills(data.skills);
      setNewLinkedin(data.linkedin);
      setOtherLinks(data.otherLinks);
    }
  }

  React.useEffect(() => {
    ProfessionalProfileDetails();
  }, []);

  return (
    <>
      Edit Profile!<br />
      Full Name: <input type="text" placeholder={fullName} onChange={(e) => setNewFullName(e.target.value)} /><br />
      Email Address: <input type="text" placeholder={emailAddress} onChange={(e) => setNewEmailAddress(e.target.value)} /><br />
      Phone Number: <input type="text" placeholder={phoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} /><br />
      Bio: <input type="text" placeholder={bio} onChange={(e) => setNewBio(e.target.value)} /><br />
      Education: <input type="text" placeholder={education} onChange={(e) => setNewEducation(e.target.value)} /><br />
      Qualification: <input type="text" placeholder={qualification} onChange={(e) => setNewQualification(e.target.value)} /><br />
      Skills: <input type="text" placeholder={skills} onChange={(e) => setNewSkills(e.target.value)} /><br />
      Linkedin: <input type="text" placeholder={linkedin} onChange={(e) => setNewLinkedin(e.target.value)} /><br />
      Other Links: <input type="text" placeholder={otherLinks} onChange={(e) => setOtherLinks(e.target.value)} /><br />
     
      <button onClick={() => editProfessionalProfile({
        fullName: fullName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        bio: bio,
        education: education,
        qualification: qualification,
        skills: skills,
        linkedin: linkedin,
        otherLinks: otherLinks
      })}>Save Changes!</button>
    </>
  );
}

EditProfessionalProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditProfessionalProfile;
