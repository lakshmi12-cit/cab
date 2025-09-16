import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import refreshSyncIcon from "D:/Transport_request/Transport_request/src/assets/refresh_sync_icon.svg";
import calendarIcon from "../../assets/Calendar2.svg";
import clockIcon from "../../assets/clock.svg";
import "../../styles/cab/RM_PM_Approval.css";
import IconButton from '@mui/material/IconButton';  
import { useNavigate } from "react-router-dom";
const requestTypes = [
  { value: "Late Night", label: "Late Night" },
  { value: "Weekend/Holiday", label: "Weekend / Holiday" },
  { value: "Adhoc", label: "Adhoc" },
];

const projectList = [
  "IoT_Advanced_Features_(SRI_B)_Y2025",
  "Project X",
  "Project Y",
];

const mainAreaList = [
  { value: "A Narayanapura", label: "A Narayanapura" },
  { value: "Banaswadi", label: "Banaswadi" },
  { value: "KR Puram", label: "KR Puram" },
];


const reportingBuildings = ["Phoenix", "Orion", "Galaxy"];
const peopleCounts = Array.from({ length: 30 }, (_, i) => i + 1);

const RM_PM_Approval = () => {
  const [requestType, setRequestType] = useState("Late Night");
  const [project, setProject] = useState(projectList[0]);
  const [cabTiming, setCabTiming] = useState("9:00 PM");
  const [reportingBuilding, setReportingBuilding] = useState(reportingBuildings[1]);
  const [mainArea, setMainArea] = useState(mainAreaList[0].value);
  const [landmark, setLandmark] = useState("");
  const [extensionNo, setExtensionNo] = useState("2-03-719");
  const [mobileNo, setMobileNo] = useState("+91 7550142047");
  const [tripType, setTripType] = useState("Trip Details");
  const [vendorName, setVendorName] = useState("Alliance");
  const [tripSheetNo, setTripSheetNo] = useState("114283/13");
  const [tripDate, setTripDate] = useState(new Date(2025, 5, 20));
  const [tripTime, setTripTime] = useState(new Date(2025, 5, 20, 12, 0));
  const [vehicleModel, setVehicleModel] = useState("Tata Indica");
  const [vehicleNo, setVehicleNo] = useState("KA-03-MH-2880");
  const [redirectToPM, setRedirectToPM] = useState(true);
  const [pmProject, setPmProject] = useState(projectList[0]);
  const [reason, setReason] = useState("Working on Deadline projects");
  const [comment, setComment] = useState("I have an important personal matter to attend at my Home town.");
  const [dropAddress, setDropAddress] = useState("Phoenix");
  const [numPeople, setNumPeople] = useState(12);
  const [actionMessage, setActionMessage] = useState("");

  const handleApproval = () => setActionMessage("Request Approved Successfully!");
  const handleReject = () => setActionMessage("Request Rejected Successfully!");

  // Helper to bold label if field should be bold for the current cab type
  const bold = (cabType, keys) => keys.includes(requestType) ? "input-label bold-label" : "input-label";
  const navigate = useNavigate(); 
  // Late Night bold fields
  const LN_FIELDS = [
    "Cab Type", "Project Details", "Booking Details", "Cab Timing", "Reporting Building",
    "Main/ Closest Area", "Landmark/ Locality",
    "Contact Details", "Extension No", "Mobile No",
    "Transport Details", "Vendor Name", "Trip Sheet No", "Trip Schedule for", "Vehicle Model", "Vehicle No",
    "Redirect to PM", "Project",
    "Reason for Using Cab", "Comment (Max 500 Chars)"
  ];
  // Weekend bold fields
  const WK_FIELDS = [
    "Cab Type", "Project Details", "Booking Details", "Cab Required By", "Reporting Building", "Drop Address",
    "Main/ Closest Area", "Landmark/ Locality",
    "Contact Details", "Extension No", "Mobile No",
    "Reason for Using Cab", "Comment (Max 500 Chars)"
  ];
  // Adhoc bold fields
  const AH_FIELDS = [
    "Cab Type", "Project Details", "Booking Details", "Cab Required By", "Reporting Building", "Number of People",
    "Main/ Closest Area", "Landmark/ Locality",
    "Contact Details", "Extension No", "Mobile No",
    "Reason for Using Cab", "Comment (Max 500 Chars)"
  ];

  // Helper for label rendering
  const getBoldClass = (label) => {
    if (requestType === "Late Night" && LN_FIELDS.includes(label)) return "input-label bold-label";
    if (requestType === "Weekend/Holiday" && WK_FIELDS.includes(label)) return "input-label bold-label";
    if (requestType === "Adhoc" && AH_FIELDS.includes(label)) return "input-label bold-label";
    return "input-label";

  };
  const handleTransferWorkflowClick = () => {
    navigate('/cab_coordinator'); // The route you define for cab_coordinator.jsx
  };

  return (
    <Box className="rm-pm-container">
      <Box className="rm-pm-main">
        {actionMessage && (
          <Alert severity={actionMessage.includes("Approved") ? "success" : "error"} sx={{ mb: 2 }}>
            {actionMessage}
          </Alert>
        )}

        {/* Cab Type */}
        <Box className="form-section">
          <div className={getBoldClass("Cab Type")}>Cab Type</div>
          <RadioGroup
            row
            value={requestType}
            onChange={e => setRequestType(e.target.value)}
            className="custom-radio-row"
          >
            {requestTypes.map(type => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                control={<Radio />}
                label={<span className="custom-radio-label">{type.label}</span>}
                className="custom-radio-group-label"
              />
            ))}
          </RadioGroup>
        </Box>
        {/* Project Details */}
        <Box className="form-section">
          <div className={getBoldClass("Project Details")}>Project Details</div>
          <div className={getBoldClass("Project")}>Project</div>
          <Select
            fullWidth
            value={project}
            className="project-input"
            disabled
            displayEmpty
            inputProps={{ 'aria-label': 'Project' }}
          >
            {projectList.map(p => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </Box>

        {/* Booking Details */}
        <Box className="form-section">
          <div className={getBoldClass("Booking Details")}>Booking Details</div>
          {requestType === "Weekend/Holiday" ? (
            <>
              {/* Row 1: Cab Required By | Reporting Building | Drop Address */}
              <div className="booking-details-row three-cols">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Required By")}>
                    Cab Required By <span className="required-star">*</span>
                  </div>
                  <div className="trip-schedule-row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        format="dd-MMMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-date-input",
                            InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                      <TimePicker
                        value={tripTime}
                        onChange={setTripTime}
                        format="hh:mm a"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-time-input",
                            InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Reporting Building")}>Reporting Building</div>
                  <InputBase
                    fullWidth
                    value={reportingBuilding}
                    className="input-base"
                    disabled
                  />
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Drop Address")}>
                    Drop Address <span className="required-star">*</span>
                  </div>
                  <InputBase
                    fullWidth
                    value={dropAddress}
                    className="input-base"
                    disabled
                  />
                </div>
              </div>
              {/* Row 2: Main/Closest Area | Landmark/Locality */}
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Main/ Closest Area")}>
                    Main/ Closest Area <span className="required-star">*</span>
                  </div>
                  <Select
                    fullWidth
                    value={mainArea}
                    className="input-select"
                    disabled
                  >
                    {mainAreaList.map(a => (
                      <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Landmark/ Locality")}>Landmark/ Locality</div>
                  <InputBase
                    fullWidth
                    value={landmark}
                    className="input-base"
                    placeholder="Type your Landmark here..."
                    disabled
                  />
                </div>
              </div>
            </>
          ) : requestType === "Adhoc" ? (
            <>
              {/* Row 1: Cab Required By | Reporting Building | Number of People */}
              <div className="booking-details-row three-cols">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Required By")}>
                    Cab Required By <span className="required-star">*</span>
                  </div>
                  <div className="trip-schedule-row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        format="dd-MMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-date-input",
                            InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                      <TimePicker
                        value={tripTime}
                        onChange={setTripTime}
                        format="HH:mm"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-time-input",
                            InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Reporting Building")}>Reporting Building</div>
                  <Select
                    fullWidth
                    value={reportingBuilding}
                    className="input-select"
                    disabled
                  >
                    {reportingBuildings.map(b => (
                      <MenuItem key={b} value={b}>{b}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Number of People")}>Number of People</div>
                  <Select
                    fullWidth
                    value={numPeople}
                    className="input-select"
                    disabled
                  >
                    {peopleCounts.map(n => (
                      <MenuItem key={n} value={n}>{n}</MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              {/* Row 2: Main/Closest Area | Landmark/Locality */}
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Main/ Closest Area")}>
                    Main/ Closest Area <span className="required-star">*</span>
                  </div>
                  <Select
                    fullWidth
                    value={mainArea}
                    className="input-select"
                    disabled
                  >
                    {mainAreaList.map(a => (
                      <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Landmark/ Locality")}>Landmark/ Locality</div>
                  <InputBase
                    fullWidth
                    value={landmark}
                    className="input-base"
                    placeholder="Type your Landmark here..."
                    disabled
                  />
                </div>
              </div>
            </>
          ) : (
            // Late Night
            <>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Timing")}>Cab Timing</div>
                  <div className="cab-timing-row">
                    <InputBase
                      fullWidth
                      value={cabTiming}
                      className="cab-timing-input"
                      disabled
                    />
                    <img src={clockIcon} alt="Clock" className="clock-icon" />
                  </div>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Reporting Building")}>Reporting Building</div>
                  <InputBase
                    fullWidth
                    value={reportingBuilding}
                    className="input-base"
                    disabled
                  />
                </div>
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Main/ Closest Area")}>
                    Main/ Closest Area <span className="required-star">*</span>
                  </div>
                  <Select
                    fullWidth
                    value={mainArea}
                    className="input-select"
                    disabled
                  >
                    {mainAreaList.map(a => (
                      <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Landmark/ Locality")}>Landmark/ Locality</div>
                  <InputBase
                    fullWidth
                    value={landmark}
                    className="input-base"
                    placeholder="Type your Landmark here..."
                    disabled
                  />
                </div>
              </div>
            </>
          )}
        </Box>

        {/* Contact Details */}
        <Box className="form-section">
          <div className={getBoldClass("Contact Details")}>Contact Details</div>
          <div className="contact-details-row">
            <div className="booking-col">
              <label className={getBoldClass("Extension No")}>Extension No <span className="required-star">*</span></label>
              <InputBase
                className="input-base"
                value={extensionNo}
                disabled
              />
            </div>
            <div className="booking-col">
              <label className={getBoldClass("Mobile No")}>Mobile No <span className="required-star">*</span></label>
              <InputBase
                className="input-base"
                value={mobileNo}
                disabled
              />
              {requestType === "Adhoc" && (
                <Box className="mobile-note-row" sx={{ mt: 1 }}>
                  <Typography variant="body2" className="mobile-note-text" color="#2596FF">
                    <Checkbox checked color="primary" size="small" sx={{ mr: 1 }} />
                    We found this Mobile Number is different from Discover. Do you want to Update in Discover?
                  </Typography>
                </Box>
              )}
            </div>
          </div>
        </Box>

        {/* Transport Details & Redirect to PM: ONLY show if NOT Weekend/Holiday or Adhoc */}
        {requestType === "Late Night" && (
          <>
            {/* Transport Details */}
            <Box className="form-section">
              <div className={getBoldClass("Transport Details")}>Transport Details</div>
              <RadioGroup
                row
                value={tripType}
                onChange={e => setTripType(e.target.value)}
                className="custom-radio-row"
              >
                <FormControlLabel value="Trip Details" control={<Radio />} label="Trip Details" />
                <FormControlLabel value="Driver Details" control={<Radio />} label="Driver Details" />
              </RadioGroup>
              <div className="transport-details-row">
                <div className="transport-col">
                  <div className={getBoldClass("Vendor Name")}>Vendor Name</div>
                  <InputBase
                    className="input-base"
                    value={vendorName}
                    disabled
                  />
                </div>
                <div className="transport-col">
                  <div className={getBoldClass("Trip Sheet No")}>Trip Sheet No</div>
                  <InputBase
                    className="input-base"
                    value={tripSheetNo}
                    disabled
                  />
                </div>
                <div className="transport-col trip-schedule-wrapper">
                  <div className={getBoldClass("Trip Schedule for")}>Trip Schedule for <span className="required-star">*</span></div>
                  <div className="trip-schedule-row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        format="dd-MMMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-date-input",
                            InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                      <TimePicker
                        value={tripTime}
                        onChange={setTripTime}
                        format="hh:mm a"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "trip-time-input",
                            InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="calendar-icon" /> },
                          },
                        }}
                        disabled
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Vehicle Model")}>Vehicle Model</div>
                  <InputBase
                    className="input-base"
                    value={vehicleModel}
                    disabled
                  />
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Vehicle No")}>Vehicle No</div>
                  <InputBase
                    className="input-base"
                    value={vehicleNo}
                    disabled
                  />
                </div>
              </div>
            </Box>
            {/* Redirect to PM */}
            <Box className="form-section">
              <div className={getBoldClass("Redirect to PM")}>Redirect to PM</div>
              <div className="redirect-pm-row">
                <Checkbox
                  checked={redirectToPM}
                  onChange={e => setRedirectToPM(e.target.checked)}
                  className="redirect-checkbox"
                  color="primary"
                  size="small"
                  
                />
                <span className="redirect-checkbox-label">
                  Redirect this workflow to selected project PM
                </span>
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Project")}>Project</div>
                  <Select
                    fullWidth
                    value={pmProject}
                    className="input-select"
                    disabled
                  >
                    {projectList.map(p => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </div>
                <Button
                  variant="outlined"
                  className="transfer-pm-btn"
                  style={{ marginTop: 28, marginLeft: 8 }}
               
                >
                  Transfer to PM
                </Button>
              </div>
            </Box>
          </>
        )}

        {/* Reason for Using Cab */}
        <Box className="form-section">
          <div className={getBoldClass("Reason for Using Cab")}>
            Reason for Using Cab <span className="required-star">*</span>
          </div>
          <InputBase
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            value={reason}
            className="reason-input"
            disabled
            placeholder="xxx-xx-xxx-xx-xxx"
          />
        </Box>
        {/* Comment */}
        <Box className="form-section">
          <div className={getBoldClass("Comment (Max 500 Chars)")}>Comment (Max 500 Chars)</div>
          <InputBase
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            value={comment}
            className="comment-input"
            disabled
            placeholder="xxx-xxx-xx-xxx"
          />
        </Box>
        {/* Action Buttons */}
        <Box className="submit-btn-row">
          <Button variant="outlined" className="reject-btn" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="contained" className="approval-btn" style={{ marginLeft: 12 }} onClick={handleApproval}>
            Approval
          </Button>
        </Box>
        {/* Transfer Workflow Section */}
       <Box className="transfer-workflow-section"
        style={{ cursor: "pointer" }}
          onClick={handleTransferWorkflowClick}>
          <div className="transfer-workflow-title-row">
            <img src={refreshSyncIcon} alt="Transfer" className="transfer-workflow-icon" />
            <span className="transfer-workflow-title">Transfer Workflow</span>
          </div>
          <IconButton className="transfer-arrow-btn">
            <span className="transfer-arrow-icon">{'>'}</span>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RM_PM_Approval;