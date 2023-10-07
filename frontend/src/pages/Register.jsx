import { useState } from "react"
import CompanyRegisterForm from "../components/CompanyRegisterForm";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfessionalRegisterForm from "../components/ProfessionalRegisterForm";
import ProjectCandidateList from "./ProjectCandidateList";

function Register() {

    const [showForm, setShowForm] = useState(false);
    const [isCompany, setIsCompany] = useState(false);

    const handleClick = (type) => {
        setShowForm(true)
        setIsCompany(type == "company" ? true : false)
    }

    const handleClickBack = () => {
        setShowForm(false)
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            {showForm ? 
                (
                    <>
                        {isCompany ?
                            <CompanyRegisterForm /> :
                            <ProfessionalRegisterForm />
                        }
                        <Button 
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleClickBack}
                        >
                            Back
                        </Button>
                    </>
                    
                ) : (
                    <>
                        <h1>Are you a company or a professional?</h1>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="50vw"
                        >
                            <Button 
                                onClick={() => handleClick("company")}
                                variant="contained"
                                sx={{ height: '30vh', width: "20vw" }}
                            >
                                Company
                            </Button>
                            <Button 
                                onClick={() => handleClick("professional")}
                                variant="contained"
                                sx={{ height: '30vh', width: "20vw" }}
                            >
                                Professional
                            </Button>
                        </Box>
                        <ProjectCandidateList />
                    </>
                )
            }
        </Box>

    )
}

export default Register