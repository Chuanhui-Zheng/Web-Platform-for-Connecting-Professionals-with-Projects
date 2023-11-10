import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, ButtonGroup, Input, Modal, TextField, Typography } from "@mui/material";
import { apiDelete, apiGet, apiPost } from "../../api";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form"
import decodeJWT from "../../decodeJWT";
import { Delete, Add } from '@mui/icons-material';
import ErrorPopup from "../../components/ErrorPopup";


// Company columns
const companyColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "companyName", headerName: "Company", flex: 1, minWidth: 100 },
  { field: "companyEmail", headerName: "Email", flex: 1, minWidth: 100 },
  { field: "companyPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100 },
  { field: "companyWebsite", headerName: "Website", flex: 1, minWidth: 100 },
];

// Professional columns
const professionalColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "professionalFullName", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "professionalEmail", headerName: "Email", flex: 1, minWidth: 100 },
  { field: "professionalPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100 },
];

// Admin columns
const adminColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1 },
  { field: "adminEmail", headerName: "Email", flex: 1, minWidth: 100 },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable({ rows, columns, onSelectionChange }) {

  const navigate = useNavigate();

  const handleOnRowClick = (rowData) => {
    // If it is part of the admin table do nothing
    for (const column of rowData.columns) {
      if ("field" in column) {
        if (column["field"] === "adminEmail") {
          return
        }
      }
    }

    navigate(`/profile/${rowData.id}`);
  }

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick 
        onRowSelectionModelChange={(newSelection) => onSelectionChange(newSelection)}
        onRowClick={handleOnRowClick}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default function AdminDashboard() {
  const [companyRows, setCompanyRows] = useState([]);
  const [professionalRows, setProfessionalRows] = useState([]);
  const [adminRows, setAdminRows] = useState([]);
  const [selectedCompanyRowIds, setSelectedCompanyRowIds] = useState([]);
  const [selectedProfessionalRowIds, setSelectedProfessionalRowIds] = useState([]);
  const [selectedAdminRowIds, setSelectedAdminRowIds] = useState([]);
  const [createAdminOpen, setCreateAdminOpen] = useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [adminId, setAdminId] = useState(
    decodeJWT(localStorage.getItem("token")).userId
  );
  const [createAdminDetails, setCreateAdminDetails] = useState({
    adminEmail: "",
    adminPassword: ""
  });

  // Function to fetch all data
  const fetchData = () => {
    Promise.all([
      apiGet("/admin/allCompanies"),
      apiGet("/admin/allProfessionals"),
      apiGet("/admin/allAdmins")
    ])
    .then(([companies, professionals, admins]) => {
      if (!companies.error) {
        setCompanyRows(companies);
      } else {
        throw new Error();
      }
  
      if (!professionals.error) {
        setProfessionalRows(professionals);
      } else {
        throw new Error();
      }
  
      if (!admins.error) {
        setAdminRows(admins);
      } else {
        throw new Error();
      }
    })
    .catch(data => {
      setErrorMessage(data.error);
    });
  };  

  // useEffect to run fetchData every 10 seconds or when instructed to
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);
  
  // Toggle error
  const toggleError = () => {
    setError(!error);
  }

  // Handle create admin modal
  const handleCreateAdminOpen = () => setCreateAdminOpen(true);
  const handleCreateAdminClose = () => setCreateAdminOpen(false);
  const handleCreateAdminSubmit = (e) => {
    e.preventDefault();
    apiPost("/admin/createAdmin", { ...createAdminDetails, "adminId": adminId })
      .then((data) => {
        if (data.error) {
          throw new Error();
        }
        // Fetch new data, reset form and close modal
        fetchData();
        setCreateAdminDetails({ adminEmail: "", adminPassword: "" })
        handleCreateAdminClose();
      })
      .catch((data) => {
        setErrorMessage(data.error);
        toggleError();
      });
  };
  
  // Handle when creating admin details is changing
  const handleCreateAdminOnChange = (e) => {
    const { name, value } = e.target;
    setCreateAdminDetails({
      ...createAdminDetails,
      [name]: value
    });
  };

  // Handle button click to log selected company rows
  const handleDeleteCompanies = () => {
    const companyIds = companyRows.filter((row) =>
      selectedCompanyRowIds.includes(row.id)
    ).map((row) => row.id);
    apiDelete("/delete/companies", {
      "userId": adminId,
      "companyIds": companyIds
    })
      .then((data) => {
        if (!data.error) {
          fetchData();
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        setErrorMessage(data.error);
        toggleError();
      });
  };

  // Handle button click to log selected professional rows
  const handleDeleteProfessionals = () => {
    const professionalIds = professionalRows.filter((row) =>
      selectedProfessionalRowIds.includes(row.id)
    ).map((row) => row.id);
    apiDelete("/delete/professionals", {
      "userId": adminId,
      "professionalIds": professionalIds
    })
      .then((data) => {
        if (!data.error) {
          fetchData();
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        setErrorMessage(data.error);
        toggleError();
      });
  };

  // Handle button click to log selected admin rows
  const handleDeleteAdmins = () => {
    const deleteAdminIds = adminRows.filter((row) =>
      selectedAdminRowIds.includes(row.id)
    ).map((row) => row.id);
    apiDelete("/delete/admins", {
      "adminId": adminId,
      "deleteAdminIds": deleteAdminIds
    })
      .then((data) => {
        if (!data.error) {
          fetchData();
        } else {
          throw new Error();
        }
      })
      .catch((data) => {
        setErrorMessage(data.error);
        toggleError();
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="50px">
        <Box display="flex" flexDirection="column" width="100%">
          <Box alignSelf="flex-start">
            <Button 
              onClick={handleDeleteCompanies} 
              variant="contained" 
              color="error"
              disabled={selectedCompanyRowIds.length === 0}
              startIcon={<Delete />} 
            >
              Delete Company
            </Button>
          </Box>
          <DataTable rows={companyRows} columns={companyColumns} onSelectionChange={setSelectedCompanyRowIds} />
        </Box>
    
        <Box display="flex" flexDirection="column" width="100%">
          <Box alignSelf="flex-start">
            <Button 
              onClick={handleDeleteProfessionals} 
              variant="contained" 
              color="error" 
              disabled={selectedProfessionalRowIds.length === 0}
              startIcon={<Delete />} 
            >
              Delete Professional
            </Button>
          </Box>
          <DataTable rows={professionalRows} columns={professionalColumns} onSelectionChange={setSelectedProfessionalRowIds} />
        </Box>
    
        <Box display="flex" flexDirection="column" width="100%">
          <Box display="flex" flexDirection="row" gap="10px">
            <Button 
              onClick={handleDeleteAdmins} 
              variant="contained" 
              color="error"
              disabled={selectedAdminRowIds.length === 0}
              startIcon={<Delete />} 
            >
              Delete Admin
            </Button>
            <Button 
              onClick={handleCreateAdminOpen} 
              variant="contained" 
              color="secondary"
              startIcon={<Add />} 
            >
              Create Admin
            </Button>
          </Box>
          <DataTable rows={adminRows} columns={adminColumns} onSelectionChange={setSelectedAdminRowIds} />
        </Box>
    
        <Modal open={createAdminOpen} onClose={handleCreateAdminClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Form 
              formName={"New Admin"} 
              buttonName={"Create new admin"} 
              handleSubmit={handleCreateAdminSubmit}
            >
              <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Admin Email"
                name="adminEmail"
                value={createAdminDetails.adminEmail}
                onChange={handleCreateAdminOnChange}
              />
              <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Admin Password"
                name="adminPassword"
                value={createAdminDetails.adminPassword}
                onChange={handleCreateAdminOnChange}
              />
            </Form>
          </Box>
        </Modal>
      </Box>
      {error && <ErrorPopup message={errorMessage} toggleError={toggleError}/>}
    </>
  );
}
