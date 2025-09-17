import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// SVGs

import infoIcon from "../../assets/info.svg";
import noteIcon from "../../assets/note.svg";
import closeIcon from "../../assets/closeIcon.svg";
import calendarIcon from "../../assets/calendar.svg";
import clockIcon from "../../assets/clock.svg";
import attachIcon from "../../assets/upload-cloud.svg";
import pdfIcon from "../../assets/pdf-icon.svg";
import downloadIcon from "../../assets/download.svg";
import distanceIcon from "../../assets/speed.svg";
import "../../styles/outing/Employee.css";
import locationIcon from "../../assets/location.svg";
import { useNavigate } from "react-router-dom";
const projectList = [
  "IoT_Advanced_Features_(SRI_B)_Y2025",
  "Project X",
  "Project Y",
];

const reportingBuildings = [
  "Phoenix",
  "Orion",
  "Galaxy",
];

const vehicleTypes = [
  "AC",
  "Non-AC",
];

const seatingCapacity = [
  "10", "15", "20", "25", "30"
];

const numberOfVehicles = ["1", "2", "3", "4", "5"];
const cabTypes = ["Team Outing", "Team Lunch"];

export default function Employee() {
  const [showNote, setShowNote] = useState(true);
  const [showQuoteNote, setShowQuoteNote] = useState(true);
  const [cabType, setCabType] = useState("Team Outing");
  const [project, setProject] = useState(projectList[0]);
  const [reportingBuilding, setReportingBuilding] = useState(reportingBuildings[0]);
  const [requiredDate, setRequiredDate] = useState(new Date(2025, 9, 15));
  const [numberOfVehicle, setNumberOfVehicle] = useState("2");
  const [seating, setSeating] = useState("25");
  const [vehicleType, setVehicleType] = useState(vehicleTypes[0]);
  const [distance, setDistance] = useState("");
  const [endTimeAtOffice, setEndTimeAtOffice] = useState(new Date(2025, 9, 15, 12, 0));
  const [startTimeFromOffice, setStartTimeFromOffice] = useState(new Date(2025, 9, 15, 12, 0));
  const [extensionNo, setExtensionNo] = useState("2-03-719");
  const [mobileNo, setMobileNo] = useState("+91 7550142047");
  const [comment, setComment] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 3 * 1024 * 1024) {
      setAttachedFile(file);
    } else {
      alert("Only PDF files up to 3MB are allowed.");
    }
  };

  // Download handler
  function handleDownload() {
    if (attachedFile) {
      const url = URL.createObjectURL(attachedFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  // Calculate and Send Quote Handlers
  function handleCalculate() {
    setSnackbarMsg("Quote calculation logic goes here!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    // Implement your real calculation logic here
  }

  function handleSendQuote() {
    setSnackbarMsg("Quote sent!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    // Implement your real send quote logic here
  }

  function handleSubmit() {
    setSnackbarMsg("Form submitted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    // Implement actual submit logic if needed
  }

  function handleCancel() {
    setSnackbarMsg("Form cancelled.");
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
    // Implement actual cancel logic if needed
  }
  const navigate = useNavigate(); // <-- Create navigate function

  // ...handlers...
  function handleSubmit() {
    // Show snackbar/message if you want, then navigate
    // setSnackbarMsg("Form submitted successfully!");
    // setSnackbarSeverity("success");
    // setSnackbarOpen(true);
    // After message, navigate:
    navigate('/ga-approval');
  }

  const noteContent =
    cabType === "Team Lunch"
      ? (
        <ul className="note-list">
          <p>1) Details shall be shared via email/SMS 1 hour prior to booking time.</p>
          <p>2) Employee who has raised the request shall also be the SPOC for any co-ordination.</p>
          <p>3) Any parking charges to be borne by employee only.</p>
          <p>4) In case of less than 10 members, kindly raise cab requests as required.</p>
          <p>5) Do reach out to 9740639191 / 7406999191 for any support during commute.</p>
          <p>6) Any food or Beverage shall not be permitted in the bus.</p>
          <p>7) Employee can raise a request up to a working day prior to request, before 5 pm.</p>
        </ul>
      )
      : (
        <ul className="note-list">
          <li>To confirm the bookings, raise a My Single approval with above quote as per below path. (Approval can be a combined My Single for overall cost).</li>
          <li>Approval Path - Initiator ---- Reporting Manager --- Part Lead --- Part Head --- Budget Team (Sathish Kumar B) --- CFO.</li>
          <li>Post approval online request with My Single should be submitted 3days in advance from the required date.</li>
          <li>Bus seating is subject to availability, if not alternate seating will be provided and billed accordingly.</li>
          <li></li>
          <li>User should make a note of Opening KM & Closing KM and at the end user should sign on the Trip Sheet.</li>
          <li>On receipt of invoice user should raise the bills for payment on GERP.</li>
          <li>GST extra as applicable.</li>
        </ul>
      );

  // Quote note content
  const quoteNoteContent = (
    <div className="quote-note">
      <span className="quote-note-title">Note:</span>
      <ul>
        <li style={{ color: "#2596FF" }}>
          No show cost of 8/80 kms- as min billing will be applied, Toll, Parking and GST will be added based on the actual usage
        </li>
      </ul>
      <IconButton className="close-svg-btn" style={{ position: "absolute", top: 8, right: 14, padding: 0 }} onClick={() => setShowQuoteNote(false)}>
        <img src={closeIcon} alt="Close" className="close-svg-icon" />
      </IconButton>
    </div>
  );

  return (
    <Box className="employee-outer-container">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <Box className="employee-main-row">
        <Box className="employee-left">
          {/* Cab Type */}
          <Box className="form-section mb-36">
            <div className="section-label">Cab Type</div>
            <Box className="custom-radio-row">
              {cabTypes.map(type => (
                <label
                  key={type}
                  className={
                    "custom-radio-label" +
                    (cabType === type ? " custom-radio-label-selected" : "")
                  }
                >
                  <input
                    type="radio"
                    name="cabType"
                    checked={cabType === type}
                    onChange={() => setCabType(type)}
                    className="custom-radio-input"
                  />
                  <span
                    className={
                      "custom-radio-circle" +
                      (cabType === type ? " custom-radio-circle-selected" : "")
                    }
                  ></span>
                  <span className="custom-radio-text">{type}</span>
                </label>
              ))}
            </Box>
          </Box>
          {/* Conditional Form Sections */}
          {cabType === "Team Outing" ? (
            <>
              {/* Project Details */}
              <Box className="form-section mb-36">
                <div className="section-label">Project Details</div>
                <div className="input-label">Project</div>
                <Select
                  fullWidth
                  value={project}
                  onChange={e => setProject(e.target.value)}
                  className="project-input"
                >
                  {projectList.map(p => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </Box>
              {/* Location Details */}
              <Box className="form-section mb-36">
                <div className="section-label">Location Details</div>
                <div className="booking-details-row-two-cols">
                  <div className="booking-col">
                    <div className="input-label">Reporting Building</div>
                    <Select
                      fullWidth
                      value={reportingBuilding}
                      onChange={e => setReportingBuilding(e.target.value)}
                      className="input-select"
                    >
                      {reportingBuildings.map(b => (
                        <MenuItem key={b} value={b}>{b}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">Required Date</div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={requiredDate}
                        onChange={setRequiredDate}
                        format="dd-MMM-yyyy"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "date-input",
                            InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-svg-icon" /> }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </Box>
              {/* Booking Details */}
              <Box className="form-section mb-36">
                <div className="section-label">Booking Details</div>
                <div className="booking-details-row-two-cols">
                  <div className="booking-col">
                    <div className="input-label">Number of Vehicle</div>
                    <Select
                      fullWidth
                      value={numberOfVehicle}
                      onChange={e => setNumberOfVehicle(e.target.value)}
                      className="input-select"
                    >
                      {numberOfVehicles.map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">Seating Capacity</div>
                    <Select
                      fullWidth
                      value={seating}
                      onChange={e => setSeating(e.target.value)}
                      className="input-select"
                    >
                      {seatingCapacity.map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="booking-details-row-two-cols">
                  <div className="booking-col">
                    <div className="input-label">Vehicle Type</div>
                    <Select
                      fullWidth
                      value={vehicleType}
                      onChange={e => setVehicleType(e.target.value)}
                      className="input-select"
                    >
                      {vehicleTypes.map(t => (
                        <MenuItem key={t} value={t}>{t}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">One way Distance from Office to Venue</div>
                    <Box className="distance-input-group">
                      <InputBase
                        className="input-base"
                        value={distance}
                        onChange={e => setDistance(e.target.value)}
                        placeholder="Enter distance in KM"
                        type="number"
                        inputProps={{ min: 0 }}
                        style={{ width: "100%" }}
                      />
                      <img src={distanceIcon} alt="Distance" className="distance-svg-icon" />
                    </Box>
                  </div>
                </div>
                {/* Calculate and Send Quote - aligned right */}
                <div className="booking-details-row btns-row" >
                  <Button className="calculate-btn" variant="outlined" onClick={handleCalculate}>Calculate</Button>
                  <Button className="send-quote-btn" variant="contained" onClick={handleSendQuote}>Send Quote</Button>
                </div>
              </Box>
              {/* Contact Details */}
              <Box className="form-section mb-36">
                <div className="section-label">Contact Details</div>
                <div className="contact-details-row two-cols">
                  <div className="booking-col">
                    <div className="input-label">
                      Extension No <span className="required-star">*</span>
                    </div>
                    <InputBase
                      className="input-base"
                      value={extensionNo}
                      onChange={e => setExtensionNo(e.target.value)}
                      placeholder="Enter your extension no"
                    />
                  </div>
                  <div className="booking-col">
                    <div className="input-label">
                      Mobile No <span className="required-star">*</span>
                    </div>
                    <InputBase
                      className="input-base"
                      value={mobileNo}
                      onChange={e => setMobileNo(e.target.value)}
                      placeholder="Enter your mobile no"
                    />
                  </div>
                </div>
              </Box>
              {/* Attachment */}
              <Box className="form-section mb-36">
                <div className="section-label">Attachment</div>
                <Box className="attachment-row">
                  <Box className="attach-input-group">
                    <label className="attach-label">
                      <img src={attachIcon} alt="Attach" className="attach-svg-icon" />
                      <span>Choose a File</span>
                      <span className="attach-note">PDF format • Max. 3MB</span>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      <Button
                        component="span"
                        className="attach-btn"
                        onClick={() => document.querySelector('input[type=file]').click()}
                      >
                        Attach
                      </Button>
                    </label>
                  </Box>
                  {attachedFile && (
                    <Box className="pdf-preview">
                      <img src={pdfIcon} alt="PDF" className="pdf-svg-icon" />
                      <span className="pdf-label">{attachedFile.name}</span>
                      <span className="pdf-meta">{attachedFile.lastModifiedDate ? attachedFile.lastModifiedDate.toLocaleDateString() : ""}, {(attachedFile.size/1024).toFixed(2)} KB</span>
                      <IconButton className="pdf-download-btn" onClick={handleDownload}>
                        <img src={downloadIcon} alt="Download" className="download-svg-icon" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <div className="approval-checkbox-row">
                  <Checkbox checked={true} color="primary" />
                  <span className="approval-checkbox-label">I Confirm My Single Approval</span>
                </div>
              </Box>
              {/* Comment */}
              <Box className="form-section mb-36">
                <div className="input-label">Comment (Max 500 Chars)</div>
                <InputBase
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="comment-input"
                  placeholder="xxx-xxx-xx-xxx"
                />
              </Box>
              {/* Action Buttons */}
              <Box className="submit-btn-row">
                <Button className="cancel-btn" variant="outlined" onClick={handleCancel}>Cancel</Button>
                <Button className="submit-btn" variant="contained" onClick={handleSubmit}>Submit</Button>
              </Box>
            </>
          ) : (
            <>
              {/* Team Lunch Form */}
              <Box className="form-section mb-36">
                <div className="section-label">Location Details</div>
                <div className="booking-details-row-two-cols">
                  <div className="booking-col">
                    <div className="input-label">Reporting Building</div>
                    <Select
                      fullWidth
                      value={reportingBuilding}
                      onChange={e => setReportingBuilding(e.target.value)}
                      className="input-select"
                    >
                      {reportingBuildings.map(b => (
                        <MenuItem key={b} value={b}>{b}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">Restaurant Address</div>
                    <InputBase
                      startAdornment={<img src={locationIcon} alt="location" className="location-svg-icon" />}
                      className="input-base"
                      value={restaurantAddress}
                      onChange={e => setRestaurantAddress(e.target.value)}
                      placeholder="xxx-xxx-xxx-xxx"
                    />
                  </div>
                </div>
              </Box>
              <Box className="form-section mb-36">
                <div className="section-label">Booking Details</div>
                <div className="booking-details-row-two-cols">
                  <div className="booking-col">
                    <div className="input-label">Number of Peoples (Minimum 10)</div>
                    <Select
                      fullWidth
                      value={seating}
                      onChange={e => setSeating(e.target.value)}
                      className="input-select"
                    >
                      {seatingCapacity.map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">Start Time from Office</div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        value={startTimeFromOffice}
                        onChange={setStartTimeFromOffice}
                        format="hh:mm a"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "time-input",
                            InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="clock-svg-icon" /> }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="booking-col">
                    <div className="input-label">End Time at Office</div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        value={endTimeAtOffice}
                        onChange={setEndTimeAtOffice}
                        format="hh:mm a"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "time-input",
                            InputProps: { endAdornment: <img src={clockIcon} alt="Clock" className="clock-svg-icon" /> }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </Box>
              {/* Contact Details */}
              <Box className="form-section mb-36">
                <div className="section-label">Contact Details</div>
                <div className="contact-details-row two-cols">
                  <div className="booking-col">
                    <div className="input-label">
                      Extension No <span className="required-star">*</span>
                    </div>
                    <InputBase
                      className="input-base"
                      value={extensionNo}
                      onChange={e => setExtensionNo(e.target.value)}
                      placeholder="Enter your extension no"
                    />
                  </div>
                  <div className="booking-col">
                    <div className="input-label">
                      Mobile No <span className="required-star">*</span>
                    </div>
                    <InputBase
                      className="input-base"
                      value={mobileNo}
                      onChange={e => setMobileNo(e.target.value)}
                      placeholder="Enter your mobile no"
                    />
                  </div>
                </div>
              </Box>
              {/* Action Button */}
              <Box className="submit-btn-row">
                <Button className="submit-btn" variant="contained" onClick={handleSubmit}>Submit</Button>
              </Box>
            </>
          )}
        </Box>
        {/* Right Side Notes */}
        <Box className="employee-right">
          {/* Always show pin */}
          <Box className="note-pin-container">
            <IconButton
              onClick={() => setShowNote(true)}
              className="note-pin-btn"
              aria-label="Show Note"
              
            >
              <img src={noteIcon} alt="Note" className="note-pin-svg-icon" />
            </IconButton>
          </Box>
          {/* Show note if open */}
          {showNote && (
            <Box className="note-section">
              <IconButton className="close-svg-btn" onClick={() => setShowNote(false)}>
                <img src={closeIcon} alt="Close" className="close-svg-icon" />
              </IconButton>
              <div className="note-header">
                <span className="note-title">Note Before Booking:</span>
              </div>
              {noteContent}
            </Box>
          )}
          {/* Quote section only for Team Outing */}
          {cabType === "Team Outing" && (
            <Box className="quote-section">
              <div className="quote-header">
                <Tooltip title="Show note">
                  <IconButton
                    onClick={() => setShowQuoteNote(true)}
                    className="quote-info-btn"
                    style={{ verticalAlign: "middle", right: "-350px", color: "#29ABE2" }}
                  >
                    <img src={infoIcon} alt="Info" className="info-svg-icon" />
                  </IconButton>
                </Tooltip>
                <span className="quote-title">Quote Details</span>
              </div>
              {showQuoteNote && quoteNoteContent}
              <table className="quote-table">
                <thead>
                  <tr>
                    <th>Extra Kms (As per actual)</th>
                    <th>50.00</th>
                    <th>380*2</th>
                    <th>38000</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Driver Night Bata (After 10PM)</td>
                    <td>800</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Rate for 120 kms + 380*2 Extra Kms + Driver Night Bata</td>
                    <td colSpan={3}>70400</td>
                  </tr>
                  <tr>
                    <td>Toll, Parking, Tax Extra (As per actual)</td>
                    <td colSpan={3}>0</td>
                  </tr>
                  <tr className="quote-total-row">
                    <td>Total</td>
                    <td colSpan={3} className="quote-total-cell">70400</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}