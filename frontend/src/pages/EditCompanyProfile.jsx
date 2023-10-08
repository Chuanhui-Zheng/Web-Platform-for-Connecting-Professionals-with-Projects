import React from 'react';
import PropTypes from 'prop-types';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditCompanyProfile = (props) => {
  const params = useParams();
  const [companyName, setNewCompanyName] = React.useState('');
  const [emailAddress, setNewEmailAddress] = React.useState('');
  const [phoneNumber, setNewPhoneNumber] = React.useState('');
  const [linkedin, setNewLinkedin] = React.useState('');
  const [companyWebsite, setNewCompanyWebsite] = React.useState('');
  
  const navigate = useNavigate();


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

  const CompanyProfileDetails = async () => {
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
      setNewCompanyName(data.companyName);
      setNewEmailAddress(data.emailAddress);
      setNewPhoneNumber(data.phoneNumber);
      setNewLinkedin(data.linkedin);
      setNewCompanyWebsite(data.companyWebsite);
    }
  }

  React.useEffect(() => {
    CompanyProfileDetails();
  }, []);

  return (
    <>
        <div className="formContainer">
        
        </div>    

      Edit Profile!<br />
      Company Name: <input type="text" placeholder={companyName} onChange={(e) => setNewCompanyName(e.target.value)} /><br />
      Email Address: <input type="text" placeholder={emailAddress} onChange={(e) => setNewEmailAddress(e.target.value)} /><br />
      Phone Number: <input type="text" placeholder={phoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} /><br />
      Linkedin: <input type="text" placeholder={linkedin} onChange={(e) => setNewLinkedin(e.target.value)} /><br />
      Company Website: <input type="text" placeholder={companyWebsite} onChange={(e) => setNewCompanyWebsite(e.target.value)} /><br />
     
      <button onClick={() => editCompanyProfile({
        companyName: companyName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        linkedin: linkedin,
        companyWebsite: companyWebsite
      })}>Save Changes!</button>
    </>
  );
}

EditCompanyProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditCompanyProfile;
