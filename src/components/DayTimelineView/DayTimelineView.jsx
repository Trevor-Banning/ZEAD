import React from "react";
import "./DayTimelineView.css";

export default function DayTimelineView({ dayData }) {
  const allEvents = Object.values(dayData.pillars || {}).flat();

  const eventsByHour = Array.from({ length: 24 }, (_, hour) => {
    const hourString = hour.toString().padStart(2, "0");
    const hourEvents = allEvents.filter((event) =>
      event.time?.startsWith(hourString)
    );
    return { hour, events: hourEvents };
  });

  return (
    <div className="day-timeline-view">
      {eventsByHour.map(({ hour, events }) => (
        <div key={hour} className="timeline-hour-block">
          <div className="hour-label">
            {hour === 0
              ? "12:00 AM"
              : hour < 12
              ? `${hour}:00 AM`
              : hour === 12
              ? "12:00 PM"
              : `${hour - 12}:00 PM`}
          </div>
          <div className="hour-events">
            {events.length > 0 ? (
              events.map((event, idx) => (
                <div key={idx} className="timeline-event">
                  {event.title}{" "}
                  <span className="timeline-pillar">{event.category}</span>
                </div>
              ))
            ) : (
              <div className="no-event-placeholder">—</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
