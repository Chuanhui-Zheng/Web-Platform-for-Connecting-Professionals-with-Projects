import { Box, Typography } from "@mui/material";
import ProjectCard from "../components/Professional/Dashboard/ProjectCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiGet } from "../api";
import decodeJWT from "../decodeJWT";

function ProjectApplicantList() {
  const params = useParams();
  const [projectList, setProjectList] = useState([]);
  // Set professional as default as it is the minimal amount of perms
  const [userType, setUserType] = useState("professional");
  const [currUserId, setCurrUserId] = useState(0);

  // Check if they are the respective company
  useEffect(() => {
    // Check if they are a professional
    const token = localStorage.getItem("token");
    const tokenData = decodeJWT(token);
    setUserType(tokenData.userType);

    if (tokenData.userType == "professional") {
      return;
    }

    console.log(`projectId = ${params.projectId.replace(":","")}`)
    apiGet("/project/details", `projectId=${params.projectId.replace(":","")}`)
      .then((data) => {
        if (!data.error) {
          console.log(`data = ${data}`)
          console.log(`data JSON = ${JSON.stringify(data[0], null, 2)}`);
          // setCurrUserId(data.pCompanyId)
        } else {
          throw new Error("Get Project Candidate List Failed");
        }
      })
      .catch(() => {
        alert("error when getting project details")
      });

  }, [])

  // insert api call here (turn into async)
  useEffect(() => {
    // API call
    apiGet("/project/applicant/list", `projectId=${params.projectId.replace(":","")}`)
      .then((data) => {
        if (!data.error) {
          setProjectList(data)
          console.log(JSON.stringify(data[0], null, 2));
        } else {
          throw new Error("Get Project Candidate List Failed");
        }
      })
      .catch((error) => {
        alert("error")
      })

  }, [])

  return (
    
    userType === "company" ?
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Project Applicant List
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="80vw"
        >
          {projectList.map((applicant, index) => (
            <ProjectCard
              key={index}
              projectName={applicant.professionalFullName}
              projectDescription={applicant.professionalSkills.join(', ')}
              // projectDescription={applicant.professionalEmail}
            />
          ))}
        </Box>
      </Box>
      : 
      <Box>
        <Typography variant="h1">
          No access allowed
        </Typography>
      </Box>
  );
}

export default ProjectApplicantList