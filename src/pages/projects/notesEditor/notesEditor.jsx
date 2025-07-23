import React, { useState, useEffect } from "react";
import "./notesEditor.css";

export default function NotesEditor({ defaultText = "", onSave }) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSave?.(text);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <textarea
      className="notes-editor"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Write notes here..."
    />
  );
}
