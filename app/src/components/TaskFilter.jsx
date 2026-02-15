import React from "react";
import "../styles/taskFilter.css";

const TaskFilter = ({ currentFilter, setFilter }) => {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="filter-container">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-btn ${currentFilter === f ? "active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
