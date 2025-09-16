import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import Header from './Header';
import { ReactComponent as ViewPoliciesIcon } from '../assets/Viewpolicies.svg';
import { ReactComponent as ArrowForwardIcon } from '../assets/arrow_forward.svg';
import { ReactComponent as AccessAlarmsIcon } from '../assets/access_alarms.svg';
import AvtharImage from '../assets/avthar.svg';
import { ReactComponent as RequiredInfoIcon } from '../assets/Required_info.svg';
import "../styles/Layouts.css";
import { Outlet, useNavigate } from "react-router-dom";

const Layouts = ({
   title = "Transport Request",
  subtitle = "Employee Request",
  showBackButton = false,
  currentState = "employee",
}) => {
  const navigate = useNavigate();
  const employeeData = {
    name: 'Manoj Kandan M',
    genId: '25504878',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06786669)'
  };
  
  const handleViewPolicies = () => {
    // your logic (e.g., open modal or navigate)
    console.log("View Policies clicked");
  };
  
  const handleStateChange = (path) => {
    navigate(path);
  };
const handleBackClick = () => {
  if (currentState === "reportee") {
    navigate("/cab_coordinator");   // Report → Cab Coordinator
  } else if (currentState === "cab") {
    navigate("/rm-pm-approval");    // Cab → RM/PM Approval
  } else if (currentState === "rm") {
    navigate("/");                  // RM → Employee
  } else {
    navigate("/");                  // Default fallback
  }
};

  return (
    <Box className="layout-container">
      <Header />
      <Box className="layout-content">
        <Typography className="layout-breadcrumb">
          My Workspace {'>'} Transport Request
        </Typography>
        <Box className="layout-card">
          {/* Title row */}
          <Box className="layout-title-row">
            <Box 
              className="layout-back-button"
             onClick={() => showBackButton && handleBackClick()}

              style={{ cursor: showBackButton ? 'pointer' : 'default' }}
            >
              <ArrowForwardIcon className="layout-back-icon" />
            </Box>
            <Typography className="layout-title-bold">
              {title}
              {subtitle && (
                <span className="layout-subtitle-bold">
                  - {subtitle}
                </span>
              )}
            </Typography>
            <Box className="layout-clock-container">
              <AccessAlarmsIcon className="layout-clock-icon" />
            </Box>
          </Box>
          {/* Employee Details */}
          <Box className="layout-employee-section">
            <Box className="layout-employee-profile">
              <Box className="layout-avatar-container">
                <Box className="layout-avatar-bg">
                  <Box
                    component="img"
                    src={AvtharImage}
                    alt={employeeData.name}
                    className="layout-avatar-img"
                  />
                </Box>
                <Box className="layout-avatar-status" />
              </Box>
              <Box>
                <Typography className="layout-employee-name">
  <span>{employeeData.name}</span>
  <span className="layout-dot-separator"> • </span>
  <strong>Gen ID: {employeeData.genId}</strong>
</Typography>

                <Typography className="layout-employee-email">
                  {employeeData.email}
                </Typography>
              </Box>
            </Box>
            <Box className="layout-divider" />
            <Box className="layout-employee-info">
              <Typography className="layout-label">Designation</Typography>
              <Typography className="layout-value">
                {employeeData.designation}
              </Typography>
            </Box>
            <Box className="layout-divider" />
            <Box className="layout-employee-info layout-division">
              <Typography className="layout-label">Division</Typography>
              <Typography className="layout-value">
                {employeeData.division}
              </Typography>
            </Box>
            <Box className="layout-divider" />
            <Box className="layout-employee-info">
              <Typography className="layout-label">Manager</Typography>
              <Typography className="layout-value">
                {employeeData.manager}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Required Information */}
        <Box className="layout-required-section">
          <RequiredInfoIcon className="layout-required-icon" />
          <Typography className="layout-required-title">
            Required Information
          </Typography>
        </Box>
        {/* Employee form will render here */}
        <Outlet />
        <Box className="layout-view-policies">
  <Box className="layout-policies-link" onClick={handleViewPolicies} style={{ cursor: 'pointer' }}>
    <ViewPoliciesIcon className="layout-policies-icon" />
    <span className="layout-policies-text">View Policies</span>
  </Box>
</Box>

      </Box>
    </Box>
  );
};

export default Layouts;