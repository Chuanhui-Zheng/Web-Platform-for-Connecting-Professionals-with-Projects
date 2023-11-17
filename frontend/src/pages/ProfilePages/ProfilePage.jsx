import * as React from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../../api';
import ProfessionalProfile from './ProfessionalProfile';
import CompanyProfile from './CompanyProfile';

const ProfilePage = () => {

	const params = useParams();
	const [userType, setUserType] = React.useState('');
	const [userId, setUserId] = React.useState(params.userId.replace(":",""));

	React.useEffect(() => {
		apiGet("/user/type", `id=${userId}`)
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
		<>
			{ userType ? (userType === "Company" ? 
			<CompanyProfile userId={params.userId.replace(":","")}></CompanyProfile> :  
			<ProfessionalProfile userId={params.userId.replace(":","")} ></ProfessionalProfile>) :
			(<></>) }
		</>
	);
}

export default ProfilePage;