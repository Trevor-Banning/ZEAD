import React from "react";
import "./projectSelector.css";

export default function ProjectSelector({
  projects = [],
  selectedId,
  onSelect,
}) {
  return (
    <div className="project-selector">
      <label htmlFor="project-dropdown" className="project-label">
        🧠 Choose a Project
      </label>
      <select
        id="project-dropdown"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="project-dropdown"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))
        ) : (
          <option disabled>Loading projects...</option>
        )}
      </select>
    </div>
  );
}
