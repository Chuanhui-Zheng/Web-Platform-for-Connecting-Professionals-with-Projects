import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";
import CompanyDashboard from "./CompanyDashboard";
import decodeJWT from "../../decodeJWT";
import NoAccessPage from "../ErrorPages/NoAccessPage";
import LoadingPage from "../ErrorPages/LoadingPage"

/**
 * Dashboard component that redirects a user to the correct dashboard page
 * @returns 
 */
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

  // Set loading page
  if (userType === null) {
    return <LoadingPage />
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
