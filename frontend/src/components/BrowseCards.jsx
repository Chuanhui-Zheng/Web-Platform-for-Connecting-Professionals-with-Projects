import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

// CSS styling for the Browse Cards
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

// Content styling
const StyledCardContent = styled(CardContent)({
  textAlign: "left",
  padding: 16,
});

// Chip styling for skills
const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});

// Content overflow styling
const TruncateTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for creating cards to display a project when browsing for all projects.
 * On the card, it displays the project name, company, category, date range, location and 
 * number of professionals expected and skills for project, and has a view detail button.
 */
export default function BrowseCards({project}) {
  const navigate = useNavigate();
  return (
    <StyledCard tabIndex={0} aria-label="Project Description Card" sx={{width:'100%'}}>
      <StyledCardContent>
        <TruncateTypography sx={{height: "4vh"}} variant="h5" component="h2" gutterBottom>
          {project.projectName}
        </TruncateTypography>
        <Typography variant="body2" color="textSecondary">
          <b> {project.projectCompany} </b>
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <BusinessCenterIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
            {project.projectCategory.length == 0 ? 
            <Typography variant="body2" color="textSecondary">
              N/A
            </Typography>: 
            <Typography variant="body2" color="textSecondary">
              {project.projectCategory}
            </Typography>}
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
              {project.projectLocation || 'N/A'}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <GroupsIcon style={{ marginRight: 8 }} />
          <Typography variant="body2" color="textSecondary">
              {project.professionalsWanted || 'N/A'}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Required Skills:
        </Typography>
        <Box mb={2}>
          {project.projectSkills.map((skill, idx) => (
              <StyledChip key={idx} label={skill} />
          ))}
        </Box>
        <Button variant="contained" color="primary" fullWidth aria-label="View Project Details" onClick={() => {navigate(`/projectdetail/${project.projectId}`)}}>
          View Details
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
}

BrowseCards.propTypes = {
  project: PropTypes.object
}