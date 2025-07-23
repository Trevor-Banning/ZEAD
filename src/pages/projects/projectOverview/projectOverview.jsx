import React from "react";
import "./projectOverview.css";

export default function ProjectOverview({ project }) {
  if (!project) {
    return (
      <div className="project-overview empty">
        <p>⬅ Select a project to see more details.</p>
      </div>
    );
  }

  return (
    <div className="project-overview">
      <h2 className="project-title">{project.title}</h2>

      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} visual`}
          className="project-image"
        />
      )}

      <p className="project-description">{project.description}</p>

      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span className="tag" key={idx}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {project.ideas && project.ideas.length > 0 && (
        <div className="project-ideas">
          <h3>💡 Ideas</h3>
          <ul>
            {project.ideas.map((idea, idx) => (
              <li key={idx}>{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
