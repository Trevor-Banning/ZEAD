import React, { useEffect, useState } from "react";
import "./calendar.css";
import SelectedDay from "./SelectedDay/SelectedDay";
import {
  getAllEvents,
  saveEventsForDate,
} from "../../services/CalendarService";
import DayTimelineView from "../../components/DayTimelineView/DayTimelineView";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const [eventsByDate, setEventsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    `${year}-${month + 1}-${today.getDate()}`
  );

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllEvents(); // This should return { [dateKey]: { date, pillars: { ... } } }
        setEventsByDate(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };
    loadEvents();
  }, []);

  const handleDateClick = (day) => {
    const key = `${year}-${month + 1}-${day}`;
    setSelectedDate(key);
  };

  const handleSaveDay = (updatedDay) => {
    const dateKey = updatedDay.date;
    setEventsByDate((prev) => ({
      ...prev,
      [dateKey]: updatedDay,
    }));

    saveEventsForDate(dateKey, updatedDay).catch((err) =>
      console.error("Error saving day:", err)
    );
  };

  const generateCalendarGrid = () => {
    const grid = [];

    for (let i = 0; i < startDay; i++) {
      grid.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month + 1}-${day}`;
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === today.toDateString();
      const isPast = currentDate < today && !isToday;
      const hasEvent =
        !!eventsByDate[dateKey]?.pillars &&
        Object.values(eventsByDate[dateKey].pillars).some(
          (pillar) => pillar.length > 0
        );

      grid.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isPast ? "past" : ""
          } ${hasEvent ? "has-event" : ""}`}
        >
          <span>{day}</span>
        </div>
      );
    }

    return grid;
  };

  const selectedDayData = eventsByDate[selectedDate] || {
    date: selectedDate,
    pillars: {},
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">
        📅 {today.toLocaleString("default", { month: "long" })} {year}
      </h1>

      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {generateCalendarGrid()}
      </div>

      <div className="day-view-wrapper">
        <SelectedDay
          selectedDate={selectedDate}
          dayData={selectedDayData}
          handleSaveDay={handleSaveDay}
        />
        <DayTimelineView dayData={selectedDayData} />
      </div>
    </div>
  );
}
