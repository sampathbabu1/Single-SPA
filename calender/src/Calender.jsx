import { React, useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TransitionsModal from "./components/TransitionsModal";
// const events1 = [
//   {
//     id: 1,
//     title: "Buy mac",
//     start: "2022-10-02T18:00:00",
//     end: "2021-10-02T19:00:00",
//   },
//   {
//     id: 2,
//     title: "event 2",
//     start: "2022-10-16T13:45:00",
//     end: "2022-10-16T18:00:00",
//   },
// ];

const Calender = () => {
  const [events, setevents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((res) => {
        setevents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isModelOpen, setisModelOpen] = useState(false);
  const [date, setdate] = useState("date");

  const dateClick = (e) => {
    console.log("Date is  , ", e.dateStr.split("T")[0]);
    setdate(e.dateStr.split("T")[0]);
    setisModelOpen(true);
  };
  return (
    <div className="App">
      <TransitionsModal
        isModelOpen={isModelOpen}
        setisModelOpen={setisModelOpen}
        date={date}
        events={events}
        setevents={setevents}
      />
      <Box sx={{ marginTop: "70px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay new",
          }}
          customButtons={{
            new: {
              text: "-",
              click: () => console.log("new event"),
            },
          }}
          events={events}
          eventColor="#f20a7e"
          nowIndicator
          dateClick={dateClick}
          eventClick={(e) => console.log(e.event.id)}
        />
      </Box>
    </div>
  );
};

export default Calender;
