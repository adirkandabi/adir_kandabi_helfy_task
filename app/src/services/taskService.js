import axios from "axios";
const api = axios.create({
  baseURL: "/api/tasks",
});

// Get all tasks
export const getAllTasks = async () => {
  const response = await api.get("/");
  return response.data.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await api.post("/", taskData);
  return response.data.data;
};

// Update Task
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/${id}`, taskData);
  return response.data.data;
};

// Toggle Task Status
export const toggleTaskStatus = async (id) => {
  const response = await api.patch(`/${id}/toggle`);
  return response.data.data;
};

// DELETE Task
export const deleteTask = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data.data;
};
