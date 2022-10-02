import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const events = [
  {
    id: 1,
    title: "event 1",
    start: "2022-10-02T18:00:00",
    end: "2021-10-02T19:00:00",
  },
  {
    id: 2,
    title: "event 2",
    start: "2022-10-16T13:45:00",
    end: "2022-10-16T18:00:00",
  },
];

const Calender = () => {
  return (
    <div className="App">
      <FullCalendar

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
        }}
        customButtons={{
          new: {
            text: "new",
            click: () => console.log("new event"),
          },
        }}
        events={events}
        eventColor="#f20a7e"
        nowIndicator
        dateClick={(e) => console.log(e)}
        eventClick={(e) => console.log(e.event.id)}
      />
    </div>
  );
};

export default Calender;
