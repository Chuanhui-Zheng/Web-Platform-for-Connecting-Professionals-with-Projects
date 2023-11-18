import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import DataTable from "./DataTable";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { useProject } from '../context/ProjectContext';
import PropTypes from "prop-types";

// Professional columns
const professionalColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "professionalFullName", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "professionalEmail", headerName: "Email", flex: 1, minWidth: 100 },
  { field: "professionalPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100 },
  { field: "professionalSkills", headerName: "Skills", flex: 1, minWidth: 100 }
];

/**
 * Component that is shows professionals on a project from a DataTable.
 * 
 * @param {*} param0 
 * @returns 
 */
function ProjectProfessionalList({ projectId, listType, toggleSnackbar, setSnackBarMessage }) {
  const [update, setUpdate] = useState(false);
  const [applicantRows, setApplicantRows] = useState([]);
  const [professionalRows, setProfessionalRows] = useState([]);
  const [selectedProfessionalRowIds, setSelectedProfessionalRowIds] = useState([]);
  const { triggerProjectUpdate } = useProject();

  // Handle approving the applicant
  const handleApproveApplicant = () => {
    apiPost("/project/company/approve", {
      "professionalIds": selectedProfessionalRowIds,
      "projectId": projectId
    })
      .then((data) => {
        if (!data.error) {
          setUpdate(!update);
          setSnackBarMessage('Applicant approved');
          toggleSnackbar();
          triggerProjectUpdate();
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      });
  }

  // Handle rejecting the applicant
  const handleRejectApplicant = () => {
    apiPost("/project/company/reject", {
      "professionalIds": selectedProfessionalRowIds,
      "projectId": projectId
    })
      .then((data) => {
        if (!data.error) {
          setUpdate(!update);
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      });
  }

  // Get applicant list and team list
  useEffect(() => {
    apiGet("/project/applicant/list", `projectId=${projectId}`)
      .then((data) => {
        if (!data.error) {
          const newData = data
            .filter((professional) => professional.status === "Pending approval")
            .map(({ professionalId, ...rest }) => ({
              "id": professionalId,
              ...rest
            }));
          setApplicantRows(newData);
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      })

    apiGet("/project/professional/list", `projectId=${projectId}`)
      .then((data) => {
        if (!data.error) {
          const newData = data
            .map(({ professionalId, ...rest }) => ({
              "id": professionalId,
              ...rest
            }));
          setProfessionalRows(newData);
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      })
  }, [update, projectId]);

  return (
    <Box display="flex" flexDirection="column" gap="50px" >
      {listType === 'applicant' ? 
      <Box display="flex" flexDirection="column" width="100%">
        <Box display="flex" flexDirection="row" gap="10px">
          <Button 
            onClick={handleApproveApplicant} 
            variant="contained" 
            color="success"
            disabled={selectedProfessionalRowIds.length === 0}
            startIcon={<ThumbUp />} 
          >
            Approve
          </Button>
          <Button 
            onClick={handleRejectApplicant} 
            variant="contained" 
            color="error"
            disabled={selectedProfessionalRowIds.length === 0}
            startIcon={<ThumbDown />} 
          >
            Reject
          </Button>
        </Box>
        <DataTable 
          rows={applicantRows} 
          columns={professionalColumns} 
          onSelectionChange={setSelectedProfessionalRowIds} 
          checkboxSelection={true}
        />
      </Box>: 
      <DataTable 
        rows={professionalRows} 
        columns={professionalColumns} 
        checkboxSelection={false}
      />
      }
    </Box>
  );
};

ProjectProfessionalList.propTypes = {
  projectId: PropTypes.string,
  listType: PropTypes.string,
  toggleSnackbar: PropTypes.func,
  setSnackBarMessage: PropTypes.func
};

export default ProjectProfessionalList;