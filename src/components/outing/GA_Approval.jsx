import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import infoIcon from "../../assets/info.svg";
import noteIcon from "../../assets/note.svg";
import calendarIcon from "../../assets/calendar.svg";
import clockIcon from "../../assets/clock.svg";
import pdfIcon from "../../assets/pdf-icon.svg";
import downloadIcon from "../../assets/download.svg";
import distanceIcon from "../../assets/speed.svg";
import locationIcon from "../../assets/location.svg";
import "../../styles/outing/GA_Approval.css";

const projectList = [
  "IoT_Advanced_Features_(SRI_B)_Y2025",
  "Project X",
  "Project Y",
];

const reportingBuildings = ["Phoenix", "Orion", "Galaxy"];
const vehicleTypes = ["AC", "Non-AC"];
const seatingCapacity = ["10", "15", "20", "25", "30"];
const numberOfVehicles = ["1", "2", "3", "4", "5"];
const cabTypes = ["Team Outing", "Team Lunch"];

export default function GA_Approval() {
  // States for fields
  const [cabType, setCabType] = useState("Team Outing");
  const [project] = useState(projectList[0]);
  const [reportingBuilding] = useState(reportingBuildings[0]);
  const [requiredDate] = useState(new Date(2025, 9, 15));
  const [venueDetails] = useState("XXX-XXX-XXX-XXX-XX");
  const [numberOfVehicle] = useState("2");
  const [seating] = useState("25");
  const [vehicleType] = useState(vehicleTypes[0]);
  const [distance] = useState("25 KM");
  const [endTimeAtOffice] = useState(new Date(2025, 9, 15, 12, 0));
  const [startTimeFromOffice] = useState(new Date(2025, 9, 15, 12, 0));
  const [extensionNo] = useState("2-03-719");
  const [mobileNo] = useState("+91 7550142047");
  const [comment, setComment] = useState("xxx xx xxx xx xxx");
  const [attachedFile] = useState({
    name: "Quote details.pdf",
    date: "11 Sep, 2023",
    time: "12:24pm",
    size: "13MB",
  });

  // Transfer workflow
  const [transferTo] = useState("Krishna@Samsung.com");
  const [transferComment, setTransferComment] = useState(
    "I have an important personal matter to attend at my Home town."
  );

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCabTypeChange = (e) => setCabType(e.target.value);

  function handleDownload() {
    const link = document.createElement("a");
    link.href = "/assets/Quote_details.pdf";
    link.download = attachedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSnackbarMsg("File downloaded!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  }

  function handleSubmit() {
    setSnackbarMsg("Form submitted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }

  function handleReject() {
    setSnackbarMsg("Request rejected.");
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
  }

  function handleTransfer() {
    setSnackbarMsg("Request transferred successfully!");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  }

  const quoteTableRows = [
    { label: "Kms", rate: "16200.00", usage: "2", total: "32400" },
    { label: "Extra Kms (As per actual)", rate: "50.00", usage: "380*2", total: "38000" },
    { label: "Driver Night Bata (After 10PM)", rate: "800", usage: "0", total: "0" },
    { label: "Rate for 120 kms + 380*2 Extra Kms + Driver Night Bata", rate: "70400", usage: "", total: "" },
    { label: "Toll, Parking, Tax Extra (As per actual)", rate: "0", usage: "", total: "" },
    { label: "Total", rate: "", usage: "", total: "70400", isTotal: true },
  ];

  return (
    <Box className="ga-approval-outer-container">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>

      {/* Main Form */}
      <Box className="ga-approval-main-row">
        <Box className="ga-approval-left">

          {/* Cab Type */}
          <div className="section-label">Cab Type</div>
          <RadioGroup row value={cabType} onChange={handleCabTypeChange}>
            {cabTypes.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={type}
                className={cabType === type ? "custom-radio-label-selected" : ""}
              />
            ))}
          </RadioGroup>

          {/* Project Details */}
          <div className="section-label">Project Details</div>
          <Select fullWidth value={project} className="input-select disabled-input" disabled>
            <MenuItem value={project}>{project}</MenuItem>
          </Select>

          {/* Location + Booking + Contact */}
          <div className="ga-top-grid">
            {/* Location Details */}
            <div>
              <div className="section-label" style={{ marginTop: 30, marginBottom: 8 }}>Location Details</div>
              <div className="ga-location-row">
                <div className="booking-col">
                  <div className="input-label">Reporting Building</div>
                  <Select fullWidth value={reportingBuilding} className="input-select disabled-input" disabled>
                    <MenuItem value={reportingBuilding}>{reportingBuilding}</MenuItem>
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">Required Date</div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={requiredDate}
                      readOnly
                      format="dd-MMM-yyyy"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          className: "date-input disabled-input",
                          InputProps: {
                            endAdornment: <img src={calendarIcon} alt="Calendar" className="calendar-svg-icon" />,
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="booking-col">
                  <div className="input-label">Venue / Resort Details</div>
                  <InputBase
                    className="input-base disabled-input"
                    value={venueDetails}
                    disabled
                  />
                </div>
              </div>

              {/* Booking Details */}
              <div className="section-label" style={{ marginTop: 24, marginBottom: 8 }}>Booking Details</div>
              <div className="ga-booking-row">
                <div className="booking-col">
                  <div className="input-label">Number of Vehicle</div>
                  <Select fullWidth value={numberOfVehicle} className="input-select disabled-input" disabled>
                    <MenuItem value={numberOfVehicle}>{numberOfVehicle}</MenuItem>
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">Seating Capacity</div>
                  <Select fullWidth value={seating} className="input-select disabled-input" disabled>
                    <MenuItem value={seating}>{seating}</MenuItem>
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">Vehicle Type</div>
                  <Select fullWidth value={vehicleType} className="input-select disabled-input" disabled>
                    <MenuItem value={vehicleType}>{vehicleType}</MenuItem>
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">One way Distance from Office to Venue</div>
                  <InputBase
                    className="input-base disabled-input"
                    value={distance}
                    disabled
                    endAdornment={<img src={distanceIcon} alt="Distance" className="distance-svg-icon" />}
                  />
                </div>
                <div className="booking-col">
                  <div className="input-label">End Time at Office</div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={endTimeAtOffice}
                      readOnly
                      format="hh:mm a"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          className: "time-input disabled-input",
                          InputProps: {
                            endAdornment: <img src={clockIcon} alt="Clock" className="clock-svg-icon" />,
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="booking-col">
                  <div className="input-label">Start Time from Office</div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={startTimeFromOffice}
                      readOnly
                      format="hh:mm a"
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          className: "time-input disabled-input",
                          InputProps: {
                            endAdornment: <img src={clockIcon} alt="Clock" className="clock-svg-icon" />,
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              {/* Contact Details */}
              <div className="section-label" style={{ marginTop: 24, marginBottom: 8 }}>Contact Details</div>
              <div className="ga-contact-row">
                <div className="booking-col">
                  <div className="input-label">
                    Extension No <span className="required-star">*</span>
                  </div>
                  <InputBase className="input-base disabled-input" value={extensionNo} disabled />
                </div>
                <div className="booking-col">
                  <div className="input-label">
                    Mobile No <span className="required-star">*</span>
                  </div>
                  <InputBase className="input-base disabled-input" value={mobileNo} disabled />
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <Box className="ga-quote-section-updated">
              <div className="quote-header-updated">
                <img src={infoIcon} alt="Info" className="info-svg-icon-updated" />
                <span className="quote-title-updated">Quote Details</span>
              </div>
              <div className="quote-note-updated">
                No show cost of 8/80 kms - min billing will be applied. Toll, Parking and GST will be added based on the actual usage
              </div>
              <table className="quote-table-updated">
                <thead>
                  <tr>
                    <th>Slab Cost</th>
                    <th>Rate</th>
                    <th>Usage</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteTableRows.map((row, i) => (
                    <tr key={i} className={row.isTotal ? "quote-total-row-updated" : ""}>
                      <td>{row.label}</td>
                      <td>{row.rate}</td>
                      <td>{row.usage}</td>
                      <td className={row.isTotal ? "quote-total-cell-updated" : ""}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </div>

          {/* Attachment */}
          <div className="section-label" style={{ marginTop: "24px" }}>Attachment</div>
          <Box className="ga-pdf-preview-updated">
            <img src={pdfIcon} alt="PDF" className="pdf-svg-icon-updated" />
            <span className="pdf-label-updated">{attachedFile.name}</span>
            <span className="pdf-meta-updated">
              {attachedFile.date}, {attachedFile.time} • {attachedFile.size}
            </span>
            <IconButton className="pdf-download-btn-updated" onClick={handleDownload}>
              <img src={downloadIcon} alt="Download" className="download-svg-icon-updated" />
            </IconButton>
          </Box>
          <div className="approval-checkbox-row-updated">
            <Checkbox checked={true} color="primary" />
            <span className="approval-checkbox-label-updated">
              <a href="#" style={{ color: "#2563eb", textDecoration: "underline" }}>I Confirm My Single Approval</a>
            </span>
          </div>

          {/* Comment */}
          <div className="input-label input-label-updated">Comment (Max 500 Chars)</div>
          <InputBase
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            value={comment}
            className="comment-input-updated"
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Buttons */}
          <Box className="ga-submit-btn-row-updated">
            <Button className="ga-reject-btn-updated" variant="outlined" onClick={handleReject}>
              Reject
            </Button>
            <Button className="ga-submit-btn-updated" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>

          {/* Transfer Workflow */}
          <Box className="ga-transfer-section-updated">
            <div className="transfer-header">
              <img src={noteIcon} alt="Transfer" className="transfer-svg-icon" />
              <span className="transfer-title">Transfer Workflow</span>
            </div>
            <div className="input-label input-label-updated">Request Type</div>
            <RadioGroup row value="Transfer Workflow">
              <FormControlLabel
                value="Transfer Workflow"
                control={<Radio checked sx={{ color: "#2563eb" }} />}
                label={<span style={{ color: "#2563eb", fontWeight: 500 }}>Transfer Workflow</span>}
              />
              <FormControlLabel
                value="Review"
                control={<Radio />}
                label="Review and send back to Me (No Data Modification)"
              />
            </RadioGroup>
            <div className="input-label input-label-updated">Transfer To</div>
            <InputBase fullWidth className="input-base-updated" value={transferTo} disabled={false} />
            <div className="input-label input-label-updated">Comment (Max 500 Chars)</div>
            <InputBase
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              value={transferComment}
              onChange={(e) => setTransferComment(e.target.value)}
              className="comment-input-updated"
            />
            <Box className="ga-transfer-btn-row-updated">
              <Button className="ga-transfer-btn-updated" variant="contained" onClick={handleTransfer}>
                <img src={noteIcon} alt="Transfer" className="transfer-btn-svg-icon" />
                Transfer WF
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}