import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";
import CompanyDashboard from "./CompanyDashboard";
import decodeJWT from "../../decodeJWT";
import NoAccessPage from "../ErrorPages/NoAccessPage";

export default function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.userType) {
        setUserType(decoded.userType);
      } else {
        setUserType("none");
      }
    } else {
      setUserType("none");
    }
  }, []);

  if (userType === null) {
    // Show a loading state or some placeholder until userType is determined
    return <p>Loading...</p>;
  }

  return (
    userType === "admin" ? <AdminDashboard />
    : (userType === "professional" ? <ProfessionalDashboard />
      : (userType === "company" ? <CompanyDashboard />
        : <NoAccessPage />
      )
    )
  );
}
