import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({
  isModelOpen,
  setisModelOpen,
  date,
  events,
  setevents,
  currentEvent,
}) {
  const handleOpen = () => setisModelOpen(true);
  const handleClose = () => {
    setisModelOpen(false);
  };
  //   var today = new Date();
  //   var currenttime =
  //     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  //   const timevar = date + "T" + currenttime;
  //   const timevar2 = "2014-08-18T21:11:54";

  //   var nowDateTime = today.toISOString();
  //   var nowDate = nowDateTime.split("T")[0];

  //   var target = new Date("2022-10-03" + "T" + currenttime);
  const [eventName, seteventName] = React.useState(currentEvent.title);
  const [startTime, setstartTime] = React.useState(dayjs(currentEvent.start));
  const [endTime, setendTime] = React.useState(dayjs(currentEvent.end));
  useEffect(() => {
    seteventName(currentEvent.title);
    setstartTime(currentEvent.start);
    setendTime(currentEvent.end);
  }, [currentEvent]);

  const handleStartChange = (newValue) => {
    console.log("Start time : ", newValue);
    setstartTime(newValue);
  };
  const handleEndChange = (newValue) => {
    console.log(newValue);
    setendTime(newValue);
  };
  const editEvent = () => {
    const eveid = currentEvent.id;
    // console.log(eventid);
    console.log(typeof startTime);
    if (typeof startTime !== "string") {
      var sttime = startTime.format("HH:mm:ss");
    } else var sttime = currentEvent.start.split("T")[1];

    if (typeof endTime !== "string") {
      var edtime = endTime.format("HH:mm:ss");
    } else var edtime = currentEvent.end.split("T")[1];
    var curdate = currentEvent.start.split("T")[0];
    // console.log("Start time : ", sttime);
    // console.log("End time : ", edtime);
    console.log(currentEvent.start);

    const updatedevent = {
      id: eveid,
      title: eventName,
      start: `${curdate}T${sttime}`,
      end: `${curdate}T${edtime}`,
    };

    axios.put(`http://localhost:8080/events/${eveid}`, updatedevent);
    var updatedEvents = events.map((event_i) => {
      if (event_i.id != eveid) return event_i;
      else return updatedevent;
    });
    setevents(updatedEvents);
    // setstartTime(target);
    // setendTime(target);
    // seteventName();
    handleClose();
  };

  const deleteEvent=()=>{
    const eveid = currentEvent.id;
    axios.delete(`http://localhost:8080/events/${eveid}`);
    var updatedEvents = events.map((event_i) => {
      if (event_i.id != eveid) return event_i;
    });
    setevents(updatedEvents);
    handleClose();
  }
  return (
    <div>
      <Modal
        open={isModelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {iseditEvent == false ? ( */}
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit event
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography>
              Event{" "}
              <OutlinedInput
                onChange={(event) => {
                  seteventName(event.target.value);
                }}
                variant="standard"
                placeholder="Add an event"
                label="Event"
                value={eventName}
              />
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography sx={{ mt: 4 }}>
                Start Time
                <TimePicker
                  label="Time"
                  value={startTime}
                  onChange={handleStartChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <br></br>
              </Typography>
              <Typography sx={{ mt: 4 }}>
                End Time
                <TimePicker
                  label="Time"
                  value={endTime}
                  onChange={handleEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Typography>
              <br></br>
            </LocalizationProvider>
          </Typography>
          <Typography sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={editEvent}
              sx={{
                width: "180px",
                color: "#f20a7e",
                "&:hover": {
                  backgroundColor: "#f20a7e",
                  color: "white",
                },
              }}
            >
              Edit event
            </Button>
            <Button variant="outlined" 
            variant="outlined"
            onClick={deleteEvent}
            sx={{
                ml:"14px",
              width: "180px",
              color: "#f20a7e",
              "&:hover": {
                backgroundColor: "#f20a7e",
                color: "white",
              },
            }}
            startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Typography>
        </Box>
        {/* ) 
        : (
          <Box sx={style}>hlo</Box>
        )} */}
      </Modal>
    </div>
  );
}
