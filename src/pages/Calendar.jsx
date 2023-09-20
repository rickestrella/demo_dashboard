import React from "react";
import { Header } from ".././components";

import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const Calendar = () => {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
    es: require("date-fns/locale/es"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [
    {
      title: "First meeting",
      allDay: true,
      start: new Date(2023, 8, 10),
      end: new Date(2023, 8, 10),
    },
    {
      title: "Second meeting",
      allDay: true,
      start: new Date(2023, 8, 11),
      end: new Date(2023, 8, 12),
    },
    {
      title: "Third meeting",
      allDay: true,
      start: new Date(2023, 8, 12),
      end: new Date(2023, 8, 16),
    },
  ];

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });

  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = () => {
    setAllEvents(...allEvents, newEvent);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={"App"} title={"Calendar"} />

      <Cal
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default Calendar;
