import * as React from 'react';
import { Link, useNavigate, Navigate , useParams } from 'react-router-dom';
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { apiGet } from '../api';
import EditCompanyProfile from './EditCompanyProfile';
import EditProfessionalProfile from './EditProfessionalProfile';


const EditProfilePage = () => {
    console.log("Edit profile reached")
    const params = useParams();
    const [userType, setUserType] = React.useState('');

    React.useEffect(() => {
        apiGet("/user/type", `id=${params.userId.replace(":","")}`)
                .then((data) => {
                    if (!data.error) {
                        setUserType(data.type);
                    } else {
                        throw new Error("Get UserType Failed");
                    }
                })
                .catch(() => {
                    alert("UserType call not valid.");
                });
    }, []);

    return (
        (<>
        {userType === "Company" ?  <EditCompanyProfile userId={params.userId.replace(":","")} ></EditCompanyProfile> :  <EditProfessionalProfile userId={params.userId.replace(":","")} ></EditProfessionalProfile> }
        </>)
    );
}

export default EditProfilePage;