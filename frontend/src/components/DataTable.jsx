import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

function DataTable({ rows, columns, onSelectionChange, checkboxSelection }) {
  const navigate = useNavigate();

  // Link to the respective profile page
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
    // <Paper sx={{ height: "auto", minHeight: 200, width: "100%" }}>
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={Boolean(checkboxSelection)}
        disableRowSelectionOnClick 
        onRowSelectionModelChange={(newSelection) => onSelectionChange(newSelection)}
        onRowClick={handleOnRowClick}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DataTable;