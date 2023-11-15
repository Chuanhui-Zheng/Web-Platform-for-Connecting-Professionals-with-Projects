import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const paginationModel = { page: 0, pageSize: 5 };

/**
 * Data Table is used as a table that shows data about users. It gets the rows
 * and columns for the data table and on selection change and the 
 * checkbox selection.
 * 
 * @param {*} param0 
 * @returns 
 */
function DataTable({ rows, columns, onSelectionChange, checkboxSelection }) {
  const navigate = useNavigate();

  // Link to the respective profile page
  const handleOnRowClick = (rowData) => {
    // If it is part of the admin table do nothing
    for (const column of rowData.columns) {
      if ("field" in column) {
        if (column["field"] === "adminEmail") {
          return;
        }
      }
    }
    navigate(`/profile/${rowData.id}`);
  };

  // Calculate the height based on the number of rows
  const calculateHeight = (rowsLength) => {
    const rowHeight = 52;
    const headerHeight = 56;
    const paginationHeight = 52;

    return rowsLength <= 5
      ? headerHeight + (rowsLength * rowHeight) + paginationHeight + 1
      : 369;
  };

  const height = calculateHeight(rows.length);

  return (
    <Paper sx={{ height: height, width: "100%" }}>
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
};

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  onSelectionChange: PropTypes.func,
  checkboxSelection: PropTypes.bool
};

export default DataTable;
