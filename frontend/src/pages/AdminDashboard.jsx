import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button, ButtonGroup } from "@mui/material";
import { apiGet } from "../api";
import { useNavigate } from "react-router-dom";

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

  // Fetch companies
  useEffect(() => {
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
  }, []);

  // Fetch professionals
  useEffect(() => {
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
  }, []);

  // Fetch admins
  useEffect(() => {
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
  }, []);

  // Handle button click to log selected company rows
  const handleLogSelectedCompanies = () => {
    const selectedCompanies = companyRows.filter((row) => selectedCompanyRowIds.includes(row.id));
    console.log(`selectedCompanies = ${JSON.stringify(selectedCompanies)}`);
  };

  // Handle button click to log selected professional rows
  const handleLogSelectedProfessionals = () => {
    const selectedProfessionals = professionalRows.filter((row) => selectedProfessionalRowIds.includes(row.id));
    console.log(`selectedProfessionals = ${JSON.stringify(selectedProfessionals)}`);
  };

  // Handle button click to log selected admin rows
  const handleLogSelectedAdmins = () => {
    const selectedAdmins = adminRows.filter((row) => selectedAdminRowIds.includes(row.id));
    console.log(`selectedAdmins = ${JSON.stringify(selectedAdmins)}`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
        >
          <Button 
            onClick={handleLogSelectedCompanies} 
            variant="contained" 
            color="primary" 
          >
            Edit
          </Button>
          <Button 
            onClick={handleLogSelectedCompanies} 
            variant="contained" 
            color="error" 
          >
            Delete
          </Button>
        </Box>
        <DataTable 
          rows={companyRows} 
          columns={companyColumns} 
          onSelectionChange={setSelectedCompanyRowIds} 
        />
      </Box>
      <Button onClick={handleLogSelectedProfessionals} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Log Selected Professionals
      </Button>
      <DataTable rows={professionalRows} columns={professionalColumns} onSelectionChange={setSelectedProfessionalRowIds} />
      <Button onClick={handleLogSelectedAdmins} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Log Selected Admins
      </Button>
      <DataTable rows={adminRows} columns={adminColumns} onSelectionChange={setSelectedAdminRowIds} />
    </Box>
  );
}
