import React, { useState } from "react";
import { Box, Button, InputBase, Select, MenuItem, Snackbar, Alert, Radio, RadioGroup, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import calendarIcon from "../../assets/Calendar2.svg";
import clockIcon from "../../assets/clock.svg";
import noteIcon from "../../assets/note.svg";
import closeIcon from "../../assets/closeIcon.svg";
import attachIcon from "../../assets/upload-cloud.svg";
import pdfIcon from "../../assets/pdf-icon.svg";
import "../../styles/airport/Employee.css";

// Basic lists reused from cab page to keep parity
const mainAreaList = [
  { value: "A Narayanapura", label: "A Narayanapura" },
  { value: "Banaswadi", label: "Banaswadi" },
  { value: "KR Puram", label: "KR Puram" },
];

const transportTypes = [
  { value: "to", label: "To Bengaluru Airport" },
  { value: "from", label: "From Bengaluru Airport" },
  { value: "both", label: "Both" },
];

export default function Employee() {
  const [transportType, setTransportType] = useState("to");
  const [depDate, setDepDate] = useState(new Date());
  const [depTime, setDepTime] = useState(new Date());
  const [arrDate, setArrDate] = useState(new Date());
  const [arrTime, setArrTime] = useState(new Date());
  const [flightNo, setFlightNo] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [mainArea, setMainArea] = useState(mainAreaList[0].value);
  const [landmark, setLandmark] = useState("");
  const [extensionNo, setExtensionNo] = useState("2-03-719");
  const [mobileNo, setMobileNo] = useState("+91 7550142047");
  const [emergencyNo, setEmergencyNo] = useState("");
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showNote, setShowNote] = useState(true);
  const [depTicketFile, setDepTicketFile] = useState(null);
  const [arrTicketFile, setArrTicketFile] = useState(null);

  const isTo = transportType === "to";
  const isFrom = transportType === "from";
  const isBoth = transportType === "both";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
  };

  function handleTicketChange(e, type) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf" && file.size <= 3 * 1024 * 1024) {
      if (type === "dep") setDepTicketFile(file);
      if (type === "arr") setArrTicketFile(file);
    } else {
      alert("Only PDF files up to 3MB are allowed.");
    }
  }

  function removeTicket(type) {
    if (type === "dep") setDepTicketFile(null);
    if (type === "arr") setArrTicketFile(null);
  }

  const TicketUpload = ({ label, file, onChange, onRemove }) => (
    <Box className="attachment-row">
      <label className="attach-label">
        <img src={attachIcon} alt="Attach" />
        <div>
          <div className="attach-title">{label}</div>
          <div className="attach-sub">PDF format • Max. 3MB</div>
        </div>
        <input type="file" accept=".pdf" onChange={onChange} style={{ display: "none" }} />
        <Button component="span" variant="outlined" size="small">Attach</Button>
      </label>
      {file && (
        <Box className="ticket-chip">
          <img src={pdfIcon} alt="PDF" />
          <div className="ticket-chip-col">
            <span className="ticket-chip-name">{file.name}</span>
            <span className="ticket-chip-meta">{new Date(file.lastModified).toLocaleDateString()} • {Math.round(file.size/1024)}KB</span>
          </div>
          <IconButton size="small" onClick={onRemove}>
            <img src={closeIcon} alt="Remove" />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  // Generic placeholder uploader: decides which slot to fill based on transport type and availability
  function handleGenericTicketChange(e) {
    const file = e.target.files[0];
    if (!(file && file.type === "application/pdf" && file.size <= 3 * 1024 * 1024)) {
      alert("Only PDF files up to 3MB are allowed.");
      return;
    }
    if (isTo && !depTicketFile) { setDepTicketFile(file); return; }
    if (isFrom && !arrTicketFile) { setArrTicketFile(file); return; }
    if (isBoth) {
      if (!depTicketFile) { setDepTicketFile(file); return; }
      if (!arrTicketFile) { setArrTicketFile(file); return; }
      // If both present, replace the last modified (arbitrary: replace arrival)
      setArrTicketFile(file);
    }
  }

  const PlaceholderUpload = () => (
    <label className="attach-label">
      <img src={attachIcon} alt="Attach" />
      <div>
        <div className="attach-title">Choose a File</div>
        <div className="attach-sub">PDF format • Max. 3MB</div>
      </div>
      <input type="file" accept=".pdf" onChange={handleGenericTicketChange} style={{ display: "none" }} />
      <Button component="span" variant="outlined" size="small">Attach</Button>
    </label>
  );

  const FlightDepartureFields = (
    <>
      <div className="booking-col">
        <div className="input-label">Departure Time</div>
        <div style={{ display: "flex", gap: 8 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={depDate}
              onChange={setDepDate}
              format="dd-MMMM-yyyy"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" /> } } }}
            />
            <TimePicker
              value={depTime}
              onChange={setDepTime}
              format="hh:mm a"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={clockIcon} alt="Clock" /> } } }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="booking-col">
        <div className="input-label">Flight Number</div>
        <InputBase className="input-base" value={flightNo} onChange={(e) => setFlightNo(e.target.value)} />
      </div>
      <div className="booking-col">
        <div className="input-label">Cab Required Time From Pick up Address</div>
        <div style={{ display: "flex", gap: 8 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={depDate}
              onChange={setDepDate}
              format="dd-MMMM-yyyy"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" /> } } }}
            />
            <TimePicker
              value={depTime}
              onChange={setDepTime}
              format="hh:mm a"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={clockIcon} alt="Clock" /> } } }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );

  const FlightArrivalFields = (
    <>
      <div className="booking-col">
        <div className="input-label">Flight Arrival Time</div>
        <div style={{ display: "flex", gap: 8 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={arrDate}
              onChange={setArrDate}
              format="dd-MMMM-yyyy"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={calendarIcon} alt="Calendar" /> } } }}
            />
            <TimePicker
              value={arrTime}
              onChange={setArrTime}
              format="hh:mm a"
              slotProps={{ textField: { variant: "outlined", className: "input-base", InputProps: { endAdornment: <img src={clockIcon} alt="Clock" /> } } }}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="booking-col">
        <div className="input-label">Flight Number</div>
        <InputBase className="input-base" value={flightNo} onChange={(e) => setFlightNo(e.target.value)} />
      </div>
    </>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="employee-container">
        <Box className="employee-main">
          <Box className="employee-left">
            <Box className="form-section">
              <div className="section-label">Cab Type (for Official Biz Trip only)</div>
              <div className="input-label">Transport Type</div>
              <RadioGroup row value={transportType} onChange={(e)=> setTransportType(e.target.value)}>
                {transportTypes.map(t => (
                  <FormControlLabel key={t.value} value={t.value} control={<Radio />} label={t.label} />
                ))}
              </RadioGroup>
            </Box>

            <Box className="form-section">
              <div className="section-label">Flight Details</div>
              {/* Upload Ticket(s) */}
              <Box className="form-section" style={{ paddingTop: 0 }}>
                <div className="input-label">Upload Ticket</div>
                <Box className="upload-row">
                  <PlaceholderUpload />
                  {(isTo || isBoth) && (
                    <TicketUpload
                      label="Departure flight ticket.pdf"
                      file={depTicketFile}
                      onChange={(e) => handleTicketChange(e, "dep")}
                      onRemove={() => removeTicket("dep")}
                    />
                  )}
                  {(isFrom || isBoth) && (
                    <TicketUpload
                      label="Arrival flight ticket.pdf"
                      file={arrTicketFile}
                      onChange={(e) => handleTicketChange(e, "arr")}
                      onRemove={() => removeTicket("arr")}
                    />
                  )}
                </Box>
              </Box>
              {(isTo || isBoth) && <div style={{ fontWeight: 600, marginTop: 8, marginBottom: 6 }}>Departure Details</div>}
              <div className="booking-details-row">
                {(isTo || isBoth) && FlightDepartureFields}
              </div>
              {(isFrom || isBoth) && <div style={{ fontWeight: 600, marginTop: 12, marginBottom: 6 }}>Arrival Details</div>}
              <div className="booking-details-row">
                {(isFrom || isBoth) && FlightArrivalFields}
              </div>
            </Box>

            <Box className="form-section">
              <div className="section-label">Cab Booking Details</div>
              <div className="booking-details-row">
                {(isTo || isBoth) && (
                  <div className="booking-col">
                    <div className="input-label">Pickup Address <span className="required-star">*</span></div>
                    <InputBase className="input-base" value={pickupAddress} onChange={(e)=> setPickupAddress(e.target.value)} />
                  </div>
                )}
                {(isFrom || isBoth) && (
                  <div className="booking-col">
                    <div className="input-label">Drop Address <span className="required-star">*</span></div>
                    <InputBase className="input-base" value={dropAddress} onChange={(e)=> setDropAddress(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className="input-label">Main/ Closest Area <span className="required-star">*</span></div>
                  <Select fullWidth value={mainArea} onChange={(e)=> setMainArea(e.target.value)} className="input-select">
                    {mainAreaList.map(a => <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>)}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">Landmark/ Locality <span className="required-star">*</span></div>
                  <InputBase className="input-base" value={landmark} onChange={(e)=> setLandmark(e.target.value)} placeholder="Type your Landmark here..." />
                </div>
              </div>
            </Box>

            <Box className="form-section">
              <div className="section-label">Contact Details</div>
              <div className="contact-details-row">
                <div className="booking-col">
                  <div className="input-label">Extension No <span className="required-star">*</span></div>
                  <InputBase className="input-base" value={extensionNo} onChange={(e)=> setExtensionNo(e.target.value)} />
                </div>
                <div className="booking-col">
                  <div className="input-label">Mobile No <span className="required-star">*</span></div>
                  <InputBase className="input-base" value={mobileNo} onChange={(e)=> setMobileNo(e.target.value)} />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 6 }}>
                    <Checkbox checked={true} size="small" />
                    <span style={{ fontSize: 12, color: "#2563eb" }}>We found this Mobile Number is different from Discover. Do you want to Update in Discover?</span>
                  </div>
                </div>
                <div className="booking-col">
                  <div className="input-label">Emergency Contact No <span className="required-star">*</span></div>
                  <InputBase className="input-base" value={emergencyNo} onChange={(e)=> setEmergencyNo(e.target.value)} />
                </div>
              </div>
            </Box>

            <Box className="form-section">
              <div className="input-label">Comment (Max 500 Chars)</div>
              <InputBase fullWidth multiline minRows={2} maxRows={4} value={comment} onChange={(e)=> setComment(e.target.value)} className="comment-input" placeholder="xxx-xxx-xx-xxx" />
            </Box>

            <Box className="submit-btn-row">
              <Button variant="contained" className="submit-btn" onClick={handleSubmit}>Submit</Button>
            </Box>
            <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>View Policies</div>

            <Snackbar open={snackbarOpen} autoHideDuration={1200} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <Alert severity="success" sx={{ width: "100%" }}>Request submitted successfully!</Alert>
            </Snackbar>
          </Box>
          {/* Right column Note - keep pin always visible */}
          <Box className="employee-right">
            <Box className="note-pin-container" style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setShowNote(true)} size="small">
                <img src={noteIcon} alt="Note" />
              </IconButton>
            </Box>
            {showNote && (
              <Box className="note-section" style={{ position: "relative", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12 }}>
                <IconButton size="small" onClick={() => setShowNote(false)} style={{ position: "absolute", top: 6, right: 6 }}>
                  <img src={closeIcon} alt="Close" />
                </IconButton>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Note:</div>
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5 }}>
                  <li>Security Escort is deployed for single lady travelers between 8pm - 7am.</li>
                  <li>Family members / fellow colleagues shall not be allowed to accompany.</li>
                  <li>In case of change in schedule update transport team 12 hours prior.</li>
                  <li>Toll/parking charges shall be paid by the driver.</li>
                  <li>Refrain from using the cab for any errands en-route.</li>
                  <li>Details shall be shared via email/SMS 1 hour prior to booking time.</li>
                  <li>Do reach out to Transport Team on 9740639191 / 7406999191 for any support.</li>
                </ul>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

