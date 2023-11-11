import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiGet, apiPost } from "../api";
import decodeJWT from "../decodeJWT";
import DataTable from "./DataTable";
import NoAccessPage from "./../pages/ErrorPages/NoAccessPage"

// Professional columns
const professionalColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "professionalFullName", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "professionalEmail", headerName: "Email", flex: 1, minWidth: 100 },
  { field: "professionalPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100 },
  { field: "professionalSkills", headerName: "Skills", flex: 1, minWidth: 100 }
];

function ProjectApplicantList() {
  const params = useParams();
  const [professionalRows, setProfessionalRows] = useState([]);
  // Set professional as default as it is the minimal amount of perms
  const [userType, setUserType] = useState("professional");
  const [pCompanyId, setPCompanyId] = useState("professional");
  const [currUserId, setCurrUserId] = useState(0);
  const [update, setUpdate] = useState(false);
  const [selectedProfessionalRowIds, setSelectedProfessionalRowIds] = useState([]);


  // // Handle approving an applicant
  // const handleApprove = async (professionalId) => {
  //   try {
  //     const data = await apiPost("/project/company/approve", {
  //       professionalId: professionalId,
  //       projectId: projectId,
  //     });
  
  //     if (data.error) {
  //       throw new Error(data.error);
  //     }
  
  //     setUpdate((update) => !update);
  //   } catch (error) {
  //     alert("Could not approve professional");
  //   }
  // };
  
  // // Handle rejecting an applicant
  // const handleReject = async (professionalId) => {
  //   try {
  //     const data = await apiPost("/project/company/reject", {
  //       professionalId: professionalId,
  //       projectId: projectId,
  //     });
  
  //     if (data.error) {
  //       throw new Error(data.error);
  //     }
  
  //     // Update the page
  //     setUpdate((update) => !update);
  //   } catch (error) {
  //     alert("Could not reject professional")
  //   }
  // }

  // Check if they are the a company and the project owner
  useEffect(() => {
    // Check if they are a professional
    const token = localStorage.getItem("token");
    const tokenData = decodeJWT(token);
    setUserType(tokenData.userType);
    setCurrUserId(tokenData.userId);

    if (tokenData.userType == "professional") {
      return;
    }

    apiGet("/project/details", `projectId=${projectId}`)
      .then((data) => {
        if (!data.error) {
          setPCompanyId(data.pCompanyId)
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      });
  }, [])

  // Get applicant list
  useEffect(() => {
    apiGet("/project/applicant/list", `projectId=${projectId}`)
      .then((data) => {
        if (!data.error) {
          console.log(JSON.stringify(data, null, 2));
          professionalRows(data)
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error)
      })
  }, [update])

  return (
    userType === "company" && currUserId == pCompanyId ?
      <DataTable>
        <DataTable 
          rows={professionalRows} 
          columns={professionalColumns} 
          onSelectionChange={setSelectedProfessionalRowIds} 
        />
      </DataTable>
      : 
      <NoAccessPage />
  );
}

export default ProjectApplicantList