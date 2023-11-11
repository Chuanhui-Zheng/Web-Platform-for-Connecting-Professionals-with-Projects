import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiGet, apiPost } from "../api";
import DataTable from "./DataTable";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

// Professional columns
const professionalColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "professionalFullName", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "professionalEmail", headerName: "Email", flex: 1, minWidth: 100 },
  { field: "professionalPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100 },
  { field: "professionalSkills", headerName: "Skills", flex: 1, minWidth: 100 }
];

function ProjectProfessionalList({ projectId }) {
  const [update, setUpdate] = useState(false);
  const [professionalRows, setProfessionalRows] = useState([]);
  const [selectedProfessionalRowIds, setSelectedProfessionalRowIds] = useState([]);

  // Handle approving the applicant
  const handleApproveApplicant = () => {
    apiPost("/project/company/approve", {
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

  // Get applicant list
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
          setProfessionalRows(newData);
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      })
  }, [update])

  return (
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
        rows={professionalRows} 
        columns={professionalColumns} 
        onSelectionChange={setSelectedProfessionalRowIds} 
        checkboxSelection={true}
      />
    </Box>
  );
}

export default ProjectProfessionalList;