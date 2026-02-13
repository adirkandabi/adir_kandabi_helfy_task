const Task = require("../models/Task");
const tasks = require("../database/task");
const VALID_PRIORITIES = ["low", "medium", "high"];

//Get all items
const getAll = () => {
  return tasks;
};

//Get a single item by ID
const getById = (id) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  return task;
};

// Create a new item
const createTask = (data) => {
  const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  if (!data.title) {
    const error = new Error("Title is required");
    error.statusCode = 400;
    throw error;
  }
  if (data.priority && !VALID_PRIORITIES.includes(data.priority)) {
    const error = new Error(
      `Invalid priority value. Valid values are: ${VALID_PRIORITIES.join(", ")}`,
    );
    error.statusCode = 400;
    throw error;
  }
  const newTask = new Task(newId, data.title, data.description, data.priority);
  tasks.push(newTask);
  return newTask;
};
// Update an existing Task
const updateTask = (id, data) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: data.title || tasks[taskIndex].title,
    description:
      data.description !== undefined && data.description !== null
        ? data.description
        : tasks[taskIndex].description,
    priority: data.priority || tasks[taskIndex].priority,
    completed:
      data.completed !== undefined
        ? data.completed
        : tasks[taskIndex].completed,
  };
  return tasks[taskIndex];
};
// Toggle task
const toggleTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  return tasks[taskIndex];
};
// Delete an item
const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    return deletedTask[0];
  }
  const error = new Error(`Task with ID ${id} not found`);
  error.statusCode = 404;
  throw error;
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
};
