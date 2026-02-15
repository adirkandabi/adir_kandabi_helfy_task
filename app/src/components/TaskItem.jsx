import React, { useState } from "react";
import "../styles/taskItem.css";

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onUpdate,
  onEditStart,
  onEditEnd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
    onEditStart(); // Stop sliding timer when editing starts
  };
  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }
    onUpdate(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
    onEditEnd(); // Restart sliding timer when editing ends
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
    onEditEnd(); // Restart sliding timer when editing ends
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="badges-wrapper">
            <span
              className={`priority-badge ${getPriorityClass(task.priority)}`}
            >
              {task.priority}
            </span>
            {task.completed && (
              <span className="status-badge completed-badge">Completed</span>
            )}
          </div>

          {/* הצגה מותנית: אינפוט בעריכה, כותרת בתצוגה */}
          {isEditing ? (
            <input
              className="edit-title-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <h3>{task.title}</h3>
          )}
        </div>

        {isEditing ? (
          <textarea
            className="edit-desc-input"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        ) : (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          <p>
            Created:{" "}
            {new Date(task.createdAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={() => handleEditClick()}>
              Edit
            </button>
            <button
              className={`btn-toggle ${task.completed ? "completed" : ""}`}
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="btn-delete" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
