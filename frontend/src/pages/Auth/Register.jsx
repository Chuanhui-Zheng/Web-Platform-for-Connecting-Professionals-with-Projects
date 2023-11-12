import { useState } from "react"
import CompanyRegisterForm from "./CompanyRegisterForm";
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfessionalRegisterForm from "./ProfessionalRegisterForm";

function Register() {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [isCompany, setIsCompany] = useState(false);

  const handleClick = (type) => {
    setShowForm(true)
    setIsCompany(type == "company" ? true : false)
  }


  const handleUserType = (e) => {
    setSelectedUserType(e.target.value)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant='h4'>Register</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleUserType}
      >
        <FormControlLabel value="professional" control={<Radio />} label="Professional" />
        <FormControlLabel value="company" control={<Radio />} label="Company" />
      </RadioGroup>
      {selectedUserType === "company" 
        ? <CompanyRegisterForm />
        : (selectedUserType === "professional"
          ? <ProfessionalRegisterForm />
          : <></>
        )
      }
    </Box>
  );
}

export default Register