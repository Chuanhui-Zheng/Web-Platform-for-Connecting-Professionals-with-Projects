import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Professional/EditProfile.css'

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

//   const CompanyProfileDetails = async () => {
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
//       setNewCompanyName(data.companyName);
//       setNewEmailAddress(data.emailAddress);
//       setNewPhoneNumber(data.phoneNumber);
//       setNewLinkedin(data.linkedin);
//       setNewCompanyWebsite(data.companyWebsite);
//     }
//   }

//   React.useEffect(() => {
//     CompanyProfileDetails();
//   }, []);

  return (
    <>
        <div className="formContainer">
            <h3>Edit Profile</h3>
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
            })}>Save Changes!</button>
        </div>
    </>
  );
}

EditCompanyProfile.propTypes = {
  id: PropTypes.string,
  token: PropTypes.string
}

export default EditCompanyProfile;
