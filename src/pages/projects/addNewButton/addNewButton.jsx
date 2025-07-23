import React from "react";
import "./addNewButton.css";

export default function AddNewButton({ label = "Add New", onClick }) {
  return (
    <button className="add-btn" onClick={onClick}>
      ＋ {label}
    </button>
  );
}
