import { Card, CardContent, Typography, Box, Chip, Button, CardMedia  } from "@mui/material";
import { styled } from "@mui/system";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

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

const StyledCardContent = styled(CardContent)({
  textAlign: "left",
  padding: 16,
});

const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});

/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that displays the cards for dashboard,
 * containting summarised information about a project.
 */
export default function DashboardCard({project}) {
  const navigate = useNavigate();
  return (
    <StyledCard tabIndex={0} aria-label="Project Description Card" sx={{width:'100%'}}>
      <CardMedia 
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
        title="Company Logo"
        alt="Company Logo"
      />
      <StyledCardContent>
        <Typography variant="h5" component="h2" fontWeight={400} gutterBottom>
          {project.projectName}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <BusinessCenterIcon style={{ marginRight: 8 }} />
          {project.projectCategories.length == 0 ? 
          <Typography variant="body2" color="textSecondary">
            N/A
          </Typography>
          : 
          <Typography variant="body2" color="textSecondary">
            {project.projectCategories}
          </Typography>}
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
        <Typography variant="body2" color="textSecondary" paragraph>
          Required Skills:
        </Typography>
        <Box mb={2}>
          {project.projectSkills.length == 0 ? <Typography variant="body2" color="textSecondary">
          <StyledChip label={'none'} />
          </Typography> : project.projectSkills.map((skill, idx) => (
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

DashboardCard.propTypes = {
	project: PropTypes.object,
}