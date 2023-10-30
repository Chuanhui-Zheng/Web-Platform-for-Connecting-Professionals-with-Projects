import { Box, Typography } from "@mui/material";
import ProjectCard from "../components/Professional/Dashboard/ProjectCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiGet } from "../api";

function ProjectApplicantList() {
  const params = useParams();
  const [projectList, setProjectList] = useState([]);

  // insert api call here (turn into async)
  useEffect(() => {
    // API call....
    console.log(`projectId = ${params.projectId.replace(":","")}`);

    apiGet("/project/applicant/list", `projectId=${params.projectId.replace(":","")}`)
      .then((data) => {
        if (!data.error) {
          console.log(`data = ${data}`)
          setProjectList(data)
          console.log(JSON.stringify(data[0], null, 2));
        } else {
          throw new Error("Get Project Candidate List Failed");
        }
      })
      .catch((error) => {
        alert("error")
      })

    // try {
    //   const res = await axios.get(`/projectCandidateList${projectId}`, "GET")
    //   console.log('Data:', res.data);
    //   setProjectList(res.) // data structure of the response
    // } catch (error) {
    //   alert(error)
    // }

  }, [])

  return (
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
            projectId={applicant.professionalId}
            // projectDescription={applicant.professionalEmail}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProjectApplicantList