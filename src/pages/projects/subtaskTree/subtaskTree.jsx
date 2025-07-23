import React, { useState } from "react";
import "./subtaskTree.css";

export default function SubtaskTree({ tasks = [] }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul className="tree-root">
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="tree-item" onClick={() => toggle(task.id)}>
            {task.children?.length > 0 && (
              <span className="caret">{expanded[task.id] ? "▼" : "▶"}</span>
            )}
            {task.title}
          </div>
          {expanded[task.id] && task.children && (
            <SubtaskTree tasks={task.children} />
          )}
        </li>
      ))}
    </ul>
  );
}
