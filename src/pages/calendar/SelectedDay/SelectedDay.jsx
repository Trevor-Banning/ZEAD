import React, { useState } from "react";
import EventItem from "../EventItem/EventItem";
import EventModal from "./EventModal/EventModal";
import "./SelectedDay.css";

const PILLARS = ["Body", "Mind", "Work", "Tribe", "Legacy"];

export default function SelectedDay({ selectedDate, dayData, handleSaveDay }) {
  const [showModal, setShowModal] = useState(false);
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [editPillar, setEditPillar] = useState("Work");
  const [editEventData, setEditEventData] = useState(null);

  const openAddModal = () => {
    setEditEventIndex(null);
    setEditEventData(null);
    setEditPillar("Work");
    setShowModal(true);
  };

  const openEditModal = (pillar, index, eventData) => {
    setEditEventIndex(index);
    setEditEventData(eventData);
    setEditPillar(pillar);
    setShowModal(true);
  };

  const handleSave = (eventData, pillar = "Work") => {
    const currentDay = dayData || { pillars: {} };
    const currentPillarEvents = currentDay.pillars?.[pillar] || [];

    let updatedEvents;
    if (editEventIndex !== null) {
      updatedEvents = [...currentPillarEvents];
      updatedEvents[editEventIndex] = eventData;
    } else {
      updatedEvents = [...currentPillarEvents, eventData];
    }

    const updatedDay = {
      ...currentDay,
      date: selectedDate,
      pillars: {
        ...currentDay.pillars,
        [pillar]: updatedEvents,
      },
    };

    handleSaveDay(updatedDay);
    setShowModal(false);
    setEditEventIndex(null);
    setEditEventData(null);
  };

  const getPillarEvents = (pillar) => {
    return dayData?.pillars?.[pillar] || [];
  };

  return (
    <div className="selected-day-panel">
      <h2 className="selected-day-title">📆 {selectedDate}</h2>

      <div className="event-input-row">
        <button onClick={openAddModal} className="event-add-button">
          ➕ Add Event
        </button>
      </div>

      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={(event) => handleSave(event, editPillar)}
          initialEvent={editEventData}
          selectedPillar={editPillar}
        />
      )}

      {PILLARS.map((pillar) => {
        const events = getPillarEvents(pillar);
        return (
          <div key={pillar} className="pillar-section">
            <h3 className="pillar-header">{pillar}</h3>
            {events.length > 0 ? (
              <ul className="event-list">
                {events.map((e, idx) => (
                  <EventItem
                    key={idx}
                    event={e}
                    index={idx}
                    onDelete={() => {
                      const updated = events.filter((_, i) => i !== idx);
                      const updatedDay = {
                        ...dayData,
                        date: selectedDate,
                        pillars: {
                          ...dayData.pillars,
                          [pillar]: updated,
                        },
                      };
                      handleSaveDay(updatedDay);
                    }}
                    onView={() => openEditModal(pillar, idx, e)}
                  />
                ))}
              </ul>
            ) : (
              <p className="no-events-message">No {pillar} events yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
