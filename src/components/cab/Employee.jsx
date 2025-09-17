import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import '../../styles/cab/Employee.css';
import closeIcon from "../../assets/closeIcon.svg";
import notePinIcon from "../../assets/note.svg";
import calendarIcon from "../../assets/Calendar2.svg";
import clockIcon from "../../assets/clock.svg";

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
const numberOfPeopleOptions = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

// Weekend/Holiday Note Section Component
const WeekendNoteSection = ({ showNote, toggleNote }) => (
  <div className="weekend-note-section">
    <div className="weekend-note-icons">
      <img
        src={notePinIcon}
        alt="Pin"
        className="weekend-note-icon-img"
        onClick={toggleNote}
        style={{ cursor: "pointer" }}
      />
    </div>
    {showNote && (
      <div className="weekend-note-content">
        <div className="weekend-note-header">
          <div className="weekend-note-title">Note:</div>
          <IconButton className="weekend-close-btn" onClick={toggleNote} size="small">
            <img src={closeIcon} alt="Close" className="weekend-close-icon-img" />
          </IconButton>
        </div>
        <ul className="weekend-note-list">
          <li>
            Security Escort is deployed for single lady travelers between <b>8pm - 7am.</b>
          </li>
        </ul>
      </div>
    )}
  </div>
);

const LateNightNoteSection = ({ showNote, toggleNote }) => (
  <div className="late-night-note-section">
    <div className="late-night-note-icons">
      <img
        src={notePinIcon}
        alt="Pin"
        className="late-night-note-icon-img"
        onClick={toggleNote}
        style={{ cursor: "pointer" }}
      />
    </div>
    {showNote && (
      <div className="late-night-note-content">
        <div className="late-night-note-header">
          <div className="late-night-note-title">Note:</div>
          <IconButton className="late-night-close-btn" onClick={toggleNote} size="small">
            <img src={closeIcon} alt="Close" className="late-night-close-icon-img" />
          </IconButton>
        </div>
        <ul className="late-night-note-list">
          <li>
            Security Escort is deployed for single lady travelers between <b>8pm - 7am</b>.
          </li>
          <li>
            Be present at logout area near Phoenix ground floor reception 5 minutes prior to the scheduled departure time.
          </li>
          <li>
            In case cab details are not received &amp; to reschedule the drop time, kindly reach out to transport desk.
          </li>
          <li>
            Only two postpones or changes in timing shall be accommodated in a day.
          </li>
          <li>
            To cancel the request, withdraw workflow 30 minutes prior to the booked time.
          </li>
          <li>
            No intimations or reminder call will be done by transport team in case you are not present at logout time.
          </li>
          <li>
            In case of no show, the trip cost will be charged to respective cost center, even if the employee has not travelled.
          </li>
          <li>
            Expect delay in cab departure during monsoon seasons or heavy traffic in the vicinity.
          </li>
          <li>
            Ensure to sign the trip sheets with your name &amp; Gen ID without fail.
          </li>
          <li>
            You are not required to carry the copy of this mail, for boarding.
          </li>
          <li>
            Kindly avoid conversations with the driver, reach out to transport team for support.
          </li>
          <li>
            In case of cab tool error send email to srib.transport@samsung.com hour prior to the required time, workflow/email is mandatory to arrange cab.
          </li>
        </ul>
      </div>
    )}
  </div>
);

const AdhocNoteSection = ({ showNote, toggleNote }) => (
  <div className="adhoc-note-section">
    <div className="adhoc-note-icons">
      <img
        src={notePinIcon}
        alt="Pin"
        className="adhoc-note-icon-img"
        onClick={toggleNote}
        style={{ cursor: "pointer" }}
      />
    </div>
    {showNote && (
      <div className="adhoc-note-content">
        <div className="adhoc-note-header">
          <div className="adhoc-note-title">Note:</div>
          <IconButton className="adhoc-close-btn" onClick={toggleNote} size="small">
            <img src={closeIcon} alt="Close" className="adhoc-close-icon-img" />
          </IconButton>
        </div>
        <ul className="adhoc-note-list">
          <li>Security Escort is deployed for single lady travelers between 8pm - 7am.</li>
          <li>Adhoc cab can be booked 1 hour prior to request time.</li>
          <li>For external visitors/guests commute, kindly write to srib.transport@samsung.com.</li>
          <li>All requests shall start &amp; end at SRIB only.</li>
          <li>Details shall be shared via SMS 30 minutes prior to requested time.</li>
          <li>To reschedule, kindly reach out to transport team @ +91 9740639191 / +91 7406991911.</li>
          <li>In case of no show beyond 1 hour from requested time, the cost will still be charged to respective cost center.</li>
          <li>Workflow is mandatory to arrange cab, in case of cab tool error write to srib.transport@samsung.com hour prior to the required time.</li>
          <li>Driver shall pay toll/parking charges for respective trip.</li>
        </ul>
      </div>
    )}
  </div>
);

const Employee = () => {
  const [requestType, setRequestType] = useState("Late Night");
  const [project, setProject] = useState(projectList[0]);
  const [cabDate, setCabDate] = useState(new Date());
  const [cabTime, setCabTime] = useState(new Date());
  // Use Date for TimePicker value for cabTiming so MUI works properly
  const [cabTiming, setCabTiming] = useState(new Date());
  const [mainArea, setMainArea] = useState(mainAreaList[0].value);
  const [reportingBuilding, setReportingBuilding] = useState(reportingBuildings[0]);
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [landmark, setLandmark] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [extensionNo, setExtensionNo] = useState("Phoenix");
  const [mobileNo, setMobileNo] = useState("+91 7550142047");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [isMobileDifferent, setIsMobileDifferent] = useState(true);
  const handleMobileCheckbox = (e) => setIsMobileDifferent(e.target.checked);
  const [showNote, setShowNote] = useState(true);
  const toggleNote = () => setShowNote((prev) => !prev);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Show Cab Required By only for Weekend/Holiday and Adhoc
  const showCabRequired = requestType === "Weekend/Holiday" || requestType === "Adhoc";
  // Show Cab Timing only for Late Night
  const showCabTiming = requestType === "Late Night";
  // Booking Details row for Adhoc
  const showNumberOfPeople = requestType === "Adhoc";

  // Reason for Using Cab class
  let reasonForCabClass = "reason-input";
  if (requestType === "Adhoc") reasonForCabClass = "reason-input-adhoc";
  if (requestType === "Weekend/Holiday") reasonForCabClass = "reason-input-weekend";

  // Note section logic
  let NoteSectionComponent;
  if (requestType === "Weekend/Holiday") {
    NoteSectionComponent = <WeekendNoteSection showNote={showNote} toggleNote={toggleNote} />;
  } else if (requestType === "Late Night") {
    NoteSectionComponent = <LateNightNoteSection showNote={showNote} toggleNote={toggleNote} />;
  } else if (requestType === "Adhoc") {
    NoteSectionComponent = <AdhocNoteSection showNote={showNote} toggleNote={toggleNote} />;
  }

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/rm-pm-approval');
    }, 1200);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="employee-container">
        <Box className="employee-main">
          <Box className="employee-left">
            {/* Request Type */}
            <Box className="form-section">
              <div className="section-label">Cab Type</div>
              <div className="custom-radio-row">
                {requestTypes.map((type) => (
                  <label
                    key={type.value}
                    className={
                      "custom-radio-label" +
                      (requestType === type.value ? " custom-radio-label-selected" : "")
                    }
                  >
                    <input
                      type="radio"
                      name="requestType"
                      checked={requestType === type.value}
                      onChange={() => {
                        setRequestType(type.value);
                        setShowNote(true);
                      }}
                      className="custom-radio-input"
                    />
                    <span
                      className={
                        "custom-radio-circle" +
                        (requestType === type.value ? " custom-radio-circle-selected" : "")
                      }
                    ></span>
                    <span className="custom-radio-text">{type.label}</span>
                  </label>
                ))}
              </div>
            </Box>
            {/* Project Details */}
            <Box className="form-section">
              <div className="section-label">Project Details</div>
              <Select
                fullWidth
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="project-input"
              >
                {projectList.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* Booking Details */}
            <Box className="form-section">
              <div className="section-label">Booking Details</div>
              <div className="booking-details-row">
                {/* Cab Required By for Weekend/Holiday and Adhoc */}
                {showCabRequired && (
                  <>
                    <div className="booking-col">
                      <div className="input-label">
                        Cab Required By <span className="required-star">*</span>
                      </div>
                      <div className="cab-required-row">
  <DatePicker
    value={cabDate}
    onChange={setCabDate}
    format="dd-MMMM-yyyy"
    slotProps={{
      textField: {
        variant: "outlined",
        fullWidth: true,
        className: "cab-date-input",
        InputProps: { endAdornment: (
          <img src={calendarIcon} alt="Calendar" className="cab-date-icon" />
        ) },
      },
    }}
  />
  <TimePicker
    value={cabTime}
    onChange={setCabTime}
    format="hh:mm a"
    slotProps={{
      textField: {
        variant: "outlined",
        fullWidth: true,
        className: "cab-time-input",
        InputProps: { endAdornment: (
          <img src={clockIcon} alt="Clock" className="cab-time-icon" />
        ) },
      },
    }}
  />
</div>
                    </div>
                    <div className="booking-col">
                      <div className="input-label">Reporting Building</div>
                      <Select
                        fullWidth
                        value={reportingBuilding}
                        onChange={(e) => setReportingBuilding(e.target.value)}
                        className="input-select"
                      >
                        {reportingBuildings.map((b) => (
                          <MenuItem key={b} value={b}>
                            {b}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    {/* Adhoc: Number of People */}
                    {showNumberOfPeople && (
                      <div className="booking-col">
                        <div className="input-label">Number of People</div>
                        <Select
                          fullWidth
                          value={numberOfPeople}
                          onChange={(e) => setNumberOfPeople(e.target.value)}
                          className="input-select"
                        >
                          {numberOfPeopleOptions.map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    )}
                  </>
                )}
                {/* Cab Timing for Late Night only */}
                {showCabTiming && (
                  <>
                    <div className="booking-col">
                      <div className="input-label">Cab Timing</div>
                      <TimePicker
                        value={cabTiming}
                        onChange={setCabTiming}
                        format="hh:mm a"
                        slots={{
                          openPickerIcon: () => (
                            <img src={clockIcon} alt="Clock" className="cab-time-icon" />
                          ),
                        }}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            className: "cab-timing-input",
                            InputProps: { endAdornment: null },
                          },
                        }}
                      />
                    </div>
                    {/* Reporting Building for Late Night */}
                    <div className="booking-col">
                      <div className="input-label">Reporting Building</div>
                      <Select
                        fullWidth
                        value={reportingBuilding}
                        onChange={(e) => setReportingBuilding(e.target.value)}
                        className="input-select"
                      >
                        {reportingBuildings.map((b) => (
                          <MenuItem key={b} value={b}>
                            {b}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </>
                )}
                {/* Weekend/Holiday: Drop Address */}
                {requestType === "Weekend/Holiday" && (
                  <div className="booking-col">
                    <div className="input-label">
                      Drop Address <span className="required-star">*</span>
                    </div>
                    <InputBase
                      fullWidth
                      value={dropAddress}
                      onChange={(e) => setDropAddress(e.target.value)}
                      className="input-base"
                      placeholder="Enter Drop Address"
                    />
                  </div>
                )}
              </div>
              {/* Rest of Booking Details row (main area, landmark) */}
              <div className="booking-details-row">
                <div className="booking-col">
                  <div className="input-label">
                    Main/ Closest Area <span className="required-star">*</span>
                  </div>
                  <Select
                    fullWidth
                    value={mainArea}
                    onChange={(e) => setMainArea(e.target.value)}
                    className="input-select"
                  >
                    {mainAreaList.map((a) => (
                      <MenuItem key={a.value} value={a.value}>
                        {a.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="booking-col">
                  <div className="input-label">Landmark/ Locality</div>
                  <InputBase
                    fullWidth
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="input-base"
                    placeholder="Type your Landmark here..."
                  />
                </div>
              </div>
            </Box>
            {/* Contact Details */}
            <Box className="form-section">
              <div className="section-label">Contact Details</div>
              <div className="contact-details-row">
                <div className="booking-col">
                  <label className="input-label">Extension No <span className="required-star">*</span></label>
                  <InputBase
                    className="input-base"
                    value={extensionNo}
                    onChange={(e) => setExtensionNo(e.target.value)}
                  />
                </div>
                <div className="booking-col">
                  <label className="input-label">Mobile No <span className="required-star">*</span></label>
                  <InputBase
                    className="input-base"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                  <div className="discover-checkbox-row">
                    <Checkbox
                      checked={isMobileDifferent}
                      onChange={handleMobileCheckbox}
                      className="discover-checkbox"
                      color="primary"
                      size="small"
                    />
                    <span className="discover-checkbox-label">
                      We found this Mobile Number is different from Discover. Do you want to Update in Discover?
                    </span>
                  </div>
                </div>
              </div>
            </Box>
            {/* Reason for Using Cab */}
            <Box className="form-section">
              <div className="input-label">
                Reason for Using Cab <span className="required-star">*</span>
              </div>
              <InputBase
                fullWidth
                multiline
                minRows={1}
                maxRows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={reasonForCabClass}
                placeholder={
                  requestType === "Weekend/Holiday"
                    ? "I have an important personal matter to attend at my Home town."
                    : requestType === "Adhoc"
                    ? "Working on Deadline projects"
                    : "xxx-xxx-xx-xxx"
                }
              />
            </Box>
            {/* Comment */}
            <Box className="form-section">
              <div className="input-label">Comment (Max 500 Chars)</div>
              <InputBase
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
                placeholder="xxx-xxx-xx-xxx"
              />
            </Box>
            {/* Submit Button */}
            <Box className="submit-btn-row">
              <Button
                variant="contained"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Request submitted successfully!
              </Alert>
            </Snackbar>
          </Box>
          {/* Always render the Note Section. Pin icon stays visible! */}
          <Box className="employee-right">
            {NoteSectionComponent}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Employee;