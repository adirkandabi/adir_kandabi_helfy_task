import React, { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import TasksList from "./components/TasksList";

import "./styles/App.css";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

function App() {
  const { tasks, loading, error, addTask, updateTask, toggleTask, deleteTask } =
    useTasks();
  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    // Filter By Status
    const matchesStatus =
      filter === "all"
        ? true
        : filter === "completed"
          ? task.completed
          : !task.completed;

    // Search By Title or Description
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>

        <div className="form-section">
          <TaskForm onAdd={addTask} />
        </div>
      </header>
      {error && <div className="error-banner">{error}</div>}
      <main>
        <TaskFilter currentFilter={filter} setFilter={setFilter} />
        <div className="search-section">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Fetching your tasks...</p>
          </div>
        ) : (
          <TasksList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
