import * as React from 'react';
import RateProfessional from './RateProfessional';
import RateProject from './RateProject';
import decodeJWT from '../../decodeJWT';
import { PageContainer } from '@toolpad/core/PageContainer';


const ReviewPage = () => {
    const params = useParams();
    const [userType, setUserType] = React.useState('');
    // const [userId, setUserId] = React.useState(params.userId.replace(":",""));

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            // setOwnUserId(tokenData.userId);
            setUserType(tokenData.userType);
            console.log(tokenData.userType)
        }
    }, []);

    return (
        <PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}>
        <>
        { userType ? (userType === "company" ?  <RateProfessional projectId={params}></RateProfessional>  :  <RateProject projectId={params} ></RateProject>) 
        : (<></>) }
        </>
        </PageContainer>
    );
}

export default ReviewPage;