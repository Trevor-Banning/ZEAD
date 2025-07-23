import React, { useState } from "react";
import ProjectSelector from "../projectSelector/projectSelector";
import ProjectOverview from "../projectOverview/projectOverview";

// Eventually load this from Firebase
const sampleProjects = [
  {
    id: "zead",
    title: "Zead",
    description: "Personal digital OS — dashboard, calendar, logs, and more.",
    tags: ["frontend", "firebase", "minimal"],
    image: "/images/zead-preview.png",
    ideas: [
      "Make logs render in markdown",
      "Add weekly review auto-summarizer",
      "Link calendar events to Git commits",
    ],
  },
  {
    id: "gang-beasts-clone",
    title: "Gang Beasts Clone",
    description: "Homoerotic chaos meets multiplayer frying pan warfare.",
    tags: ["unity", "game-dev", "physics"],
    image: "/images/gang-beasts-idea.png",
    ideas: [
      "Abs slider in character creation",
      "Add kitchen PvP mechanics",
      "Sync avatars with friends in local co-op",
    ],
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-page">
      <div className="sidebar">
        <ProjectSelector
          projects={sampleProjects}
          selectedId={selectedProject?.id || ""}
          onSelect={(id) => {
            const selected = sampleProjects.find((p) => p.id === id);
            setSelectedProject(selected);
          }}
        />
      </div>
      <div className="main-content">
        <ProjectOverview project={selectedProject} />
      </div>
    </div>
  );
}
