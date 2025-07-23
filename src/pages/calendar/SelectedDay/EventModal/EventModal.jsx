import React, { useState, useEffect } from "react";
import "./EventModal.css";

const PILLARS = ["Body", "Mind", "Work", "Tribe", "Legacy"];

export default function EventModal({
  onClose,
  onSave,
  initialEvent,
  selectedPillar,
}) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("Business");
  const [isComplete, setIsComplete] = useState(false);
  const [pillar, setPillar] = useState(selectedPillar || "Work");

  // 🧠 Load event data for editing
  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || "");
      setTime(initialEvent.time || "");
      setLocation(initialEvent.location || "");
      setNotes(initialEvent.notes || "");
      setCategory(initialEvent.category || "Business");
      setIsComplete(initialEvent.isComplete || false);
    }
  }, [initialEvent]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const updatedEvent = {
      title,
      time,
      location,
      isComplete,
      notes,
      category,
    };

    onSave(updatedEvent, pillar); // pass selected pillar up
  };

  return (
    <div className="modal-overlay">
      <div className="event-modal">
        <h2>{initialEvent ? "Edit Event" : "Add New Event"}</h2>

        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label>
          Location:
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Leisure">Leisure</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </label>

        <label>
          Pillar:
          <select value={pillar} onChange={(e) => setPillar(e.target.value)}>
            {PILLARS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          Mark as complete
        </label>

        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
