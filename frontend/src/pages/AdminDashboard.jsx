import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, ButtonGroup, Input, Modal, TextField, Typography } from "@mui/material";
import { apiDelete, apiGet, apiPost } from "../api";
import { useNavigate } from "react-router-dom";
import Form from "../components/Forms/Form"
import decodeJWT from "../decodeJWT";

// Company columns
const companyColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 100 },
  { field: "companyName", headerName: "Company", flex: 1, minWidth: 100, maxWidth: 200 },
  { field: "companyEmail", headerName: "Email", flex: 1, minWidth: 100, maxWidth: 200 },
  { field: "companyPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100, maxWidth: 200 },
  { field: "companyWebsite", headerName: "Website", flex: 1, minWidth: 100, maxWidth: 200 },
];

// Professional columns
const professionalColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 100 },
  { field: "professionalFullName", headerName: "Name", flex: 1, minWidth: 100, maxWidth: 200 },
  { field: "professionalEmail", headerName: "Email", flex: 1, minWidth: 100, maxWidth: 200 },
  { field: "professionalPhoneNumber", headerName: "Phone Number", flex: 1, minWidth: 100, maxWidth: 200 },
];

// Admin columns
const adminColumns = [
  { field: "id", headerName: "ID", type: "number", flex: 1, maxWidth: 100 },
  { field: "adminEmail", headerName: "Email", flex: 1, minWidth: 100, maxWidth: 200 },
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
        // onRowClick={handleOnRowClick}
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
  const [createAdminDetails, setCreateAdminDetails] = useState({
    adminEmail: "",
    adminPassword: ""
  });
  const [reFetchData, setReFetchData] = useState(false);
  const adminId = decodeJWT(localStorage.getItem("token")).userId;

  // Function to fetch all data
  const fetchData = () => {
    apiGet("/admin/allCompanies")
      .then((data) => {
        if (!data.error) {
          setCompanyRows(data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        alert("Could not load company table");
      });

    apiGet("/admin/allProfessionals")
      .then((data) => {
        if (!data.error) {
          setProfessionalRows(data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        alert("Could not load professional table");
      });

    apiGet("/admin/allAdmins")
      .then((data) => {
        if (!data.error) {
          setAdminRows(data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        alert("Could not load admin table");
      });
  };

  // useEffect to run fetchData every 10 seconds or when instructed to
  useEffect(() => {
    fetchData(); // Fetch data immediately on mount
    const intervalId = setInterval(fetchData,10000); // Fetch data every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [reFetchData]);

  // Handle create admin modal
  const handleCreateAdminOpen = () => setCreateAdminOpen(true);
  const handleCreateAdminClose = () => setCreateAdminOpen(false);
  const handleCreateAdminSubmit = (e) => {
    e.preventDefault();

    apiPost("/admin/createAdmin", {
      ...createAdminDetails,
      "adminId": adminId
    })
      .then((data) => {
        if (data.error) {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error);
      });
    
    // Refetch
    setReFetchData(!reFetchData);
  };
  const handleCreateAdminOnChange = (e) => {
    const { name, value } = e.target;
    setCreateAdminDetails({
      ...createAdminDetails,
      [name]: value
    });
  };

  // Handle button click to log selected company rows
  const handleLogSelectedCompanies = () => {
    const selectedCompanies = companyRows.filter((row) =>
      selectedCompanyRowIds.includes(row.id)
    );
    console.log(`selectedCompanies = ${JSON.stringify(selectedCompanies)}`);
  };

  // Handle button click to log selected professional rows
  const handleLogSelectedProfessionals = () => {
    const professionalIds = professionalRows.filter((row) =>
      selectedProfessionalRowIds.includes(row.id)
    ).map((row) => row.id);
    apiDelete("/delete/professionals", {
      "userId": adminId,
      "professionalIds": professionalIds
    })
      .then((data) => {
        if (data.error) {
          throw new Error();
        }
      })
      .catch((data) => {
        alert(data.error);
      });
    
    // refect the data 
    setReFetchData(!reFetchData);
  };

  // Handle button click to log selected admin rows
  const handleLogSelectedAdmins = () => {
    const selectedAdmins = adminRows.filter((row) =>
      selectedAdminRowIds.includes(row.id)
    );
    console.log(`selectedAdmins = ${JSON.stringify(selectedAdmins)}`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Box display="flex" flexDirection="column" gap="20px" width="100%">
        <Box display="flex" flexDirection="row" gap="10px">
          <Button onClick={handleLogSelectedCompanies} variant="contained" color="error">
            Delete
          </Button>
        </Box>
        <DataTable rows={companyRows} columns={companyColumns} onSelectionChange={setSelectedCompanyRowIds} />
      </Box>
      <Button onClick={handleLogSelectedProfessionals} variant="contained" color="error" sx={{ mt: 2 }}>
        Delete
      </Button>
      <DataTable rows={professionalRows} columns={professionalColumns} onSelectionChange={setSelectedProfessionalRowIds} />
      <Button onClick={handleLogSelectedAdmins} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Log Selected Admins
      </Button>
      <Button onClick={handleCreateAdminOpen} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Create admin
      </Button>
      <Modal open={createAdminOpen} onClose={handleCreateAdminClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
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
      <DataTable rows={adminRows} columns={adminColumns} onSelectionChange={setSelectedAdminRowIds} />
    </Box>
  );
}
