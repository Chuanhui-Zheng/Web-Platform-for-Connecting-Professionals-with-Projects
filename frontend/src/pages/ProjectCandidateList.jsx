import { Box, Typography } from "@mui/material";
import ProjectCard from "../components/Professional/Dashboard/ProjectCard";
import { useEffect, useState } from "react";


function ProjectCandidateList() {
  const [projectList, setProjectList] = useState([]);

  // insert api call here
  useEffect(() => {
    // API call....

    setProjectList([
      {
        name: "hi",
        description: "description of hi"
      },
      {
        name: "hi2",
        description: "description of hi2"
      },
      {
        name: "hi3",
        description: "description of hi3"
      }
    ])

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
        Project Candidate List
      </Typography>
      {/* <ProjectCard 
        projectName="[HERE IS PROJECT NAME]"
        projectDescription="[HERE IS PROJECT DESCRIPTION]"
      >
      </ProjectCard> */}
      {projectList.map((project, index) => (
        <ProjectCard
          key={index}
          projectName={project.name}
          projectDescription={project.description}
        />
      ))}
    </Box>
  );
}

export default ProjectCandidateList