import { useState } from "react"
import CompanyRegisterForm from "./CompanyRegisterForm";
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ProfessionalRegisterForm from "./ProfessionalRegisterForm";

/**
 * Registration page that opens form for professional or company
 * @returns
 */
function Register() {
  const [selectedUserType, setSelectedUserType] = useState("");

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
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" flexDirection="column" 
        sx={{
          border:'1px solid #fff',
          width:'auto',
          borderRadius:'35px',
          padding:'27px 10px',
          textAlign:'center',
          background:'rgba(255,255,255,0.3)', 
          zIndex:'1',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
          backdropFilter:'blur(29px)'
        }}
      >
      <Typography variant='h4' color="white" fontWeight={500}>
        Register
      </Typography>
      <br />      
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleUserType}
        sx={{color:'white'}}
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
    </Box>
  );
}

export default Register