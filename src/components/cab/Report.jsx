import React, { useState } from "react";
import {
  Box,
  InputBase,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import calendarIcon from "../../assets/Calendar2.svg";
import clockIcon from "../../assets/clock.svg";
import speedIcon from "../../assets/speed.svg";
import warningIcon from "../../assets/warning.svg";
import noteIcon from "../../assets/note.svg";
import '../../styles/cab/Report.css'; 
import closeIcon from "../../assets/closeIcon.svg"; 
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

export default function Report() {
  const [requestType, setRequestType] = useState("Late Night");
  const [project, setProject] = useState(projectList[0]);
  const [reportingBuilding, setReportingBuilding] = useState(reportingBuildings[0]);
  const [mainArea, setMainArea] = useState(mainAreaList[0].value);
  const [landmark, setLandmark] = useState("");
  const [extensionNo, setExtensionNo] = useState("Phoenix");
  const [mobileNo, setMobileNo] = useState("+91 7550142047");
  const [tripType, setTripType] = useState("Trip Details");
  const [vendorName, setVendorName] = useState("Alliance");
  const [tripSheetNo, setTripSheetNo] = useState("114283/13");
  const [tripDate, setTripDate] = useState(new Date(2025, 5, 20));
  const [tripTime, setTripTime] = useState(new Date(2025, 5, 20, 12, 0));
  const [vehicleModel, setVehicleModel] = useState("Tata Indica");
  const [vehicleNo, setVehicleNo] = useState("KA-03-MH-2880");
  const [driverName, setDriverName] = useState("Madhu");
  const [driverMobile, setDriverMobile] = useState("8505165770");
  const [opKm, setOpKm] = useState("20km");
  const [opWarnings, setOpWarnings] = useState(0);
  const [opDate, setOpDate] = useState(new Date(2025, 5, 20));
  const [opTime, setOpTime] = useState(new Date(2025, 5, 20, 12, 0));
  const [dropAddress, setDropAddress] = useState("Phoenix");
  const [numPeople, setNumPeople] = useState(12);
  const [reason, setReason] = useState("I have an important personal matter to attend at my Home town.");
 const [showNoteCard, setShowNoteCard] = useState(false);
  // Bold label helper
  const boldLabels = [
    "Cab Type",
    "Project Details",
    "Project",
    "Booking Details",
    "Cab Timing",
    "Cab Required By",
    "Reporting Building",
    "Drop Address",
    "Number of People",
    "Main/ Closest Area",
    "Landmark/ Locality",
    "Contact Details",
    "Extension No",
    "Mobile No",
    "Transport Details",
    "Trip Details",
    "Driver Details",
    "Vendor Name",
    "Trip Sheet No",
    "Trip Schedule for",
    "Vehicle Model",
    "Vehicle No",
    "Driver Name",
    "Driver Mobile Number",
    "OP Date Time",
    "Open KM",
    "No of warnings",
    "Reason for Using Cab",
    "Comment (Max 500 Chars)"
  ];
  const getBoldClass = (label) =>
    boldLabels.includes(label) ? "input-label bold-label" : "input-label";

  return (
    <Box className="report-container">
      <Box className="report-main">
        {/* Cab Type */}
        <Box className="form-section">
          <div className={getBoldClass("Cab Type")}>Cab Type</div>
          <RadioGroup
            row
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className="custom-radio-row"
          >
            {requestTypes.map((type) => (
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
            className="input-base"
            disabled
            displayEmpty
            inputProps={{ "aria-label": "Project" }}
          >
            {projectList.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Note for Late Night */}
       {/* Note for Late Night */}


{/* Note Section with Toggle */}
{["Weekend/Holiday", "Late Night", "Adhoc"].includes(requestType) && (
  <Box className="note-container">
    {/* Always show pin icon */}
    <img
      src={noteIcon}
      alt="Note Icon"
      className="note-icon-topright"
      onClick={() => setShowNoteCard(true)}
    />

    {/* Conditionally show note card */}
    {showNoteCard && (
      <Box className="note-card">
        {/* Close icon inside card */}
        <img
          src={closeIcon}
          alt="Close"
          className="note-close-icon"
          onClick={() => setShowNoteCard(false)}
        />

        <div className="note-card-content">
          <div className="note-title"><b>Note:</b></div>
          <ul className="note-list">
            <li>
              Security Escort is deployed for single lady travelers between <b>8pm - 7am.</b>
            </li>
          </ul>
        </div>
      </Box>
    )}
  </Box>
)}

        {/* Booking Details */}
        <Box className="form-section">
          <div className={getBoldClass("Booking Details")}>Booking Details</div>
          {requestType === "Late Night" && (
            <>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Timing")}>Cab Timing</div>
                  <div className="cab-timing-row">
                    <InputBase
                      fullWidth
                      value="9:00 PM"
                      className="input-base"
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
                  <div className={getBoldClass("Main/ Closest Area")}>Main/ Closest Area</div>
                  <InputBase
                    fullWidth
                    value={mainArea}
                    className="input-base"
                    disabled
                  />
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
          {requestType === "Weekend/Holiday" && (
            <>
              <div className="booking-details-row three-cols">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Required By")}>Cab Required By <span className="required-star">*</span></div>
                  <div className="trip-schedule-row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        format="dd-MMMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "input-base",
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
                            className: "input-base",
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
                  <div className={getBoldClass("Drop Address")}>Drop Address <span className="required-star">*</span></div>
                  <InputBase
                    fullWidth
                    value={dropAddress}
                    className="input-base"
                    disabled
                  />
                </div>
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Main/ Closest Area")}>Main/ Closest Area <span className="required-star">*</span></div>
                  <InputBase
                    fullWidth
                    value={mainArea}
                    className="input-base"
                    disabled
                  />
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
          {requestType === "Adhoc" && (
            <>
              <div className="booking-details-row three-cols">
                <div className="booking-col">
                  <div className={getBoldClass("Cab Required By")}>Cab Required By <span className="required-star">*</span></div>
                  <div className="trip-schedule-row">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={tripDate}
                        onChange={setTripDate}
                        format="dd-MMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "input-base",
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
                            className: "input-base",
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
                    className="input-base"
                    disabled
                  >
                    {reportingBuildings.map((b) => (
                      <MenuItem key={b} value={b}>
                        {b}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className={getBoldClass("Number of People")}>Number of People</div>
                  <Select
                    fullWidth
                    value={numPeople}
                    className="input-base"
                    disabled
                  >
                    {peopleCounts.map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className={getBoldClass("Main/ Closest Area")}>Main/ Closest Area <span className="required-star">*</span></div>
                  <Select
                    fullWidth
                    value={mainArea}
                    className="input-base"
                    disabled
                  >
                    {mainAreaList.map((a) => (
                      <MenuItem key={a.value} value={a.value}>
                        {a.label}
                      </MenuItem>
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
                fullWidth
                value={extensionNo}
                className="input-base"
                disabled
              />
            </div>
            <div className="booking-col">
              <label className={getBoldClass("Mobile No")}>Mobile No <span className="required-star">*</span></label>
              <InputBase
                fullWidth
                value={mobileNo}
                className="input-base"
                disabled
              />
            </div>
          </div>
        </Box>

        {/* Reason for Using Cab for Weekend/Holiday only */}
        {requestType === "Weekend/Holiday" && (
          <Box className="form-section">
            <div className={getBoldClass("Reason for Using Cab")}>Reason for Using Cab <span className="required-star">*</span></div>
            <InputBase
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              value={reason}
              className="input-base"
              disabled
              placeholder="xxx-xx-xxx-xx-xxx"
            />
          </Box>
        )}

        {/* Transport Details */}
        {(requestType === "Late Night" || requestType === "Adhoc") && (
          <Box className="form-section">
            <div className={getBoldClass("Transport Details")}>Transport Details</div>
            <RadioGroup
              row
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="custom-radio-row"
            >
              <FormControlLabel
                value="Trip Details"
                control={<Radio />}
                label={<span className={getBoldClass("Trip Details")}>Trip Details</span>}
              />
              <FormControlLabel
                value="Driver Details"
                control={<Radio />}
                label={<span className={getBoldClass("Driver Details")}>Driver Details</span>}
              />
            </RadioGroup>
            <div className="transport-details-row">
              <div className="transport-col">
                <div className={getBoldClass("Vendor Name")}>Vendor Name</div>
                <InputBase
                  fullWidth
                  value={vendorName}
                  className="input-base"
                  disabled
                />
              </div>
              <div className="transport-col">
                <div className={getBoldClass("Trip Sheet No")}>Trip Sheet No</div>
                <InputBase
                  fullWidth
                  value={tripSheetNo}
                  className="input-base"
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
                          className: "input-base",
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
                          className: "input-base",
                          InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="calendar-icon" /> },
                        },
                      }}
                      disabled
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="transport-details-row">
              <div className="transport-col">
                <div className={getBoldClass("Vehicle Model")}>Vehicle Model</div>
                <InputBase
                  fullWidth
                  value={vehicleModel}
                  className="input-base"
                  disabled
                />
              </div>
              <div className="transport-col">
                <div className={getBoldClass("Vehicle No")}>Vehicle No</div>
                <InputBase
                  fullWidth
                  value={vehicleNo}
                  className="input-base"
                  disabled
                />
              </div>
            </div>
          </Box>
        )}

        {/* Driver Details for Late Night/Adhoc */}
        {(requestType === "Late Night" || requestType === "Adhoc") && (
          <Box className="form-section">
            <div className={getBoldClass("Driver Details")}>Driver Details</div>
            <div className="booking-details-row">
              <div className="booking-col">
                <div className={getBoldClass("Driver Name")}>Driver Name</div>
                <InputBase
                  fullWidth
                  value={driverName}
                  className="input-base"
                  disabled
                />
              </div>
              <div className="booking-col">
                <div className={getBoldClass("Driver Mobile Number")}>Driver Mobile Number</div>
                <InputBase
                  fullWidth
                  value={driverMobile}
                  className="input-base"
                  disabled
                />
              </div>
              <div className="booking-col">
                <div className={getBoldClass("OP Date Time")}>OP Date Time <span className="required-star">*</span></div>
                <div className="trip-schedule-row">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={opDate}
                      onChange={setOpDate}
                      format="dd-MMMM-yyyy"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          className: "input-base",
                          InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-icon" /> },
                        },
                      }}
                      disabled
                    />
                    <TimePicker
                      value={opTime}
                      onChange={setOpTime}
                      format="hh:mm a"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          className: "input-base",
                          InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="calendar-icon" /> },
                        },
                      }}
                      disabled
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            {/* Open KM and No of warnings custom box with icons */}
            <div className="booking-details-row">
              <div className="booking-col">
                <div className={getBoldClass("Open KM")}>Open KM</div>
                <Box className="input-base custom-valuebox">
                  <span>{opKm}</span>
                  <img src={speedIcon} alt="Speed" className="valuebox-icon" />
                </Box>
              </div>
              <div className="booking-col">
                <div className={getBoldClass("No of warnings")}>No of warnings</div>
                <Box className="input-base custom-valuebox">
                  <span>{opWarnings}</span>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img src={warningIcon} alt="Warning" className="valuebox-icon" />
                    <span className="note-text">Note</span>
                  </div>
                </Box>
              </div>
            </div>
          </Box>
        )}

        {/* Comment for Late Night and Adhoc */}
        
      </Box>
    </Box>
  );
}