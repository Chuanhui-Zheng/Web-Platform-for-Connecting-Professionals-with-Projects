import React from "react";
import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";
// import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%"
  }
}));

// const StyledCardMedia = styled(CardMedia)({
//   height: 0,
//   paddingTop: "56.25%", // 16:9 aspect ratio
// });

const StyledCardContent = styled(CardContent)({
  textAlign: "left",
  padding: 16
});

const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});

export default function BrowseCards({project}) {
  const navigate = useNavigate();
  return (
    <StyledCard tabIndex={0} aria-label="Project Description Card" sx={{width:'100%'}}>
      {/* <StyledCardMedia
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
        title="Company Logo"
        alt="Company Logo"
      /> */}
      <StyledCardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {project.projectName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {project.projectCompany} 
          </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <BusinessCenterIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
          {project.projectCategory}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <DateRangeIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
          {project.projectStartDate} - {project.projectEndDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
          {project.projectLocation}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <GroupsIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
          {project.professionalsWanted}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" paragraph>
          Required Skills:
        </Typography>
        <Box mb={2}>
          {project.projectSkills.map((skill, idx) => (
            <StyledChip key={idx} label={skill} />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          aria-label="View Project Details"
          onClick={() => {navigate(`/projectdetail/${project.projectId}`)}}
        >
          View Details
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

// export default BrowseCards;