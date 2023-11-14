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
      <Box display="flex"
      justifyContent="center"
      alignItems="center" flexDirection="column" 
      sx={{border:'1px solid #fff', width:'auto',borderRadius:'35px', padding:'27px 10px',textAlign:'center',background:'rgba(255,255,255,0.3)', zIndex:'1' ,boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backdropFilter:'blur(29px)'}}>
      <Typography variant='h4' color="white" fontWeight={500}>Register</Typography>
      <br></br>      
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