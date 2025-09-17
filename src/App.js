import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Employee from "./components/cab/Employee";
import RM_PM_Approval from "./components/cab/RM_PM_Approval";
import CabCoordinator from "./components/cab/cab_coordinator";
import Report from "./components/cab/Report";
import OutingEmployee from "./components/outing/Employee";
import GA_Approval from "./components/outing/GA_Approval";
import Reportee from "./components/outing/Reportee"; // <-- ✅ Import Reportee

function App() {
  return (
    <Router>
      <Routes>
        {/* Employee page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="Employee Request" currentState="employee" />}
        >
          <Route path="/" element={<Employee />} />
        </Route>

        {/* RM/PM Approval page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="RM/PM Approval" showBackButton={true} currentState="rm" />}
        >
          <Route path="/rm-pm-approval" element={<RM_PM_Approval />} />
        </Route>

        {/* Cab Coordinator page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="Cab Coordinator" showBackButton={true} currentState="cab" />}
        >
          <Route path="/cab_coordinator" element={<CabCoordinator />} />
        </Route>

        {/* Report page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="Report" showBackButton={true} currentState="reportee" />}
        >
          <Route path="/report" element={<Report />} />
        </Route>

        {/* Outing Employee page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="Employee Outing" currentState="employee-outing" />}
        >
          <Route path="/outing-employee" element={<OutingEmployee />} />
        </Route>

        {/* GA Approval page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="GA Approval" currentState="ga-approval" />}
        >
          <Route path="/ga-approval" element={<GA_Approval />} />
        </Route>

        {/* ✅ Outing Reportee page */}
        <Route
          element={<Layouts title="Transport Request" subtitle="Outing Reportee" currentState="outing-reportee" />}
        >
          <Route path="/outing-reportee" element={<Reportee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
