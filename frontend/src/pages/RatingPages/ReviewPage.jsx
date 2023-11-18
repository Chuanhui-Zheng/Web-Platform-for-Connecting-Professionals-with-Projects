import * as React from 'react';
import { useParams } from 'react-router-dom';
import RateProfessional from './RateProfessional';
import RateProject from './RateProject';
import decodeJWT from '../../decodeJWT';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Typography } from '@mui/material';

/**
 * 
 * @returns 
 * Raitings page which can be used to either rate professioals or projects through calling their respective compeonts.
 */
const ReviewPage = () => {
	const params = useParams();
	const [userType, setUserType] = React.useState('');

	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			setUserType(tokenData.userType);
		}
	}, []);

	return (
		<PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}>
			<>
				<div style={{width:'100%', height:70, backgroundColor:'white', display:'flex', alignItems:'center', borderRadius:'20px 20px 0px 0px'}}>
					<Typography sx={{fontWeight: 'bold', fontSize:'36px', marginLeft: 'auto', marginRight: 'auto'}}>Review Page</Typography>
				</div>
				{ userType ? (userType === "company" ?  <RateProfessional projectId={params}></RateProfessional>  :  <RateProject projectId={params} ></RateProject>) 
				: (<></>) }
			</>
		</PageContainer>
	);
}

export default ReviewPage;