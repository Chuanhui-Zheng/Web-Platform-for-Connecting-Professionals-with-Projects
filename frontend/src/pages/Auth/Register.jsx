import { useState } from "react"
import CompanyRegisterForm from "./CompanyRegisterForm";
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ProfessionalRegisterForm from "./ProfessionalRegisterForm";

/**
 * Registration page component that renders a form for professional or company registration.
 * Displays a radio button group for user type selection and conditionally renders
 * the appropriate registration form based on the selection.
 * 
 * @returns {JSX.Element} The rendered Register component
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
          border:'1px solid rgba(23,59,66,0.14)',
          width:'auto',
          borderRadius:'35px',
          padding:'27px 10px',
          textAlign:'center',
          background:'rgba(255,255,255,0.94)', 
          zIndex:'1',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
          backdropFilter:'blur(29px)'
        }}
      >
      <Typography variant='h4' sx={{ color: '#173b42' }} fontWeight={600}>
        Register
      </Typography>
      <br />      
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleUserType}
        sx={{
          color: '#173b42',
          '& .MuiFormControlLabel-label': { color: '#173b42', fontWeight: 500 },
          '& .MuiRadio-root': { color: '#617579' },
          '& .Mui-checked': { color: '#d66d42' },
        }}
      >
        <FormControlLabel sx={{ color: '#173b42' }} value="professional" control={<Radio />} label="Professional" />
        <FormControlLabel sx={{ color: '#173b42' }} value="company" control={<Radio />} label="Company" />
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
