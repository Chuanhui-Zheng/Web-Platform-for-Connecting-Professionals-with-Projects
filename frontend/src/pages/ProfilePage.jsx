import * as React from 'react';
import { Link, useNavigate, Navigate , useParams } from 'react-router-dom';
import { apiGet } from '../api';
import ProfessionalProfile from './Professional/ProfessionalProfile';
import CompanyProfile from './Companies/CompanyProfile';


const ProfilePage = () => {
    console.log("profile reached")
    const params = useParams();
    const [userType, setUserType] = React.useState('');
    const [userId, setUserId] = React.useState(params.userId.replace(":",""));

    React.useEffect(() => {
        console.log("calling usertype api in profile page.jsx id:", userId)
        
        apiGet("/user/type", `id=${userId}`)
                .then((data) => {
                    if (!data.error) {
                        console.log("calling usertype api in profile page.jsx type:", data.type)
                        // console.log("profile page: params.userId -", params.userId )
                        // console.log("profile page: userType -", data.type )
                        setUserType(data.type);
                    } else {
                        throw new Error("Get UserType Failed");
                    }
                })
                .catch(() => {
                    alert("UserType call not valid.");
                });
        
        console.log(" finsih calling usertype api in profile page.jsx", userType)
    }, []);

    return (
        <>
        { userType ? (userType === "Company" ?  <CompanyProfile userId={params.userId.replace(":","")}></CompanyProfile>  :  <ProfessionalProfile userId={params.userId.replace(":","")} ></ProfessionalProfile>) 
        : (<></>) }
        </>
    );
}

export default ProfilePage;