import React from "react";
import "./EventItem.css";

export default function EventItem({ event, index, onDelete, onView }) {
  return (
    <li className={`event-item ${event.isComplete ? "complete" : ""}`}>
      <div className="event-main">
        <span className="event-title">
          {event.title}
          {!!event.time && <span className="event-time"> @ {event.time}</span>}
        </span>

        {event.location && (
          <div className="event-location">📍 {event.location}</div>
        )}

        <div className="event-meta">
          <span className="event-category">#{event.category}</span>
          {event.pillar && (
            <span
              className={`event-pill-tag pillar-${event.pillar.toLowerCase()}`}
            >
              {event.pillar}
            </span>
          )}
        </div>

        {event.isComplete && <div className="event-status">✅ Completed</div>}
      </div>

      <div className="event-actions">
        <button className="details-button" onClick={() => onView(event, index)}>
          View
        </button>
        <button className="delete-button" onClick={() => onDelete(index)}>
          ✕
        </button>
      </div>
    </li>
  );
}
