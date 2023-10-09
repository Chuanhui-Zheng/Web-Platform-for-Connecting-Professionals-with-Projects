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
        name: "Candidate 1",
        description: "Hi I am candidate 1"
      },
      {
        name: "Candidate 2",
        description: "Hi I am candidate 2"
      },
      {
        name: "Candidate 3",
        description: "Hi I am candidate 3"
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="80vw"
      >
        {projectList.map((project, index) => (
          <ProjectCard
            key={index}
            projectName={project.name}
            projectDescription={project.description}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProjectCandidateList