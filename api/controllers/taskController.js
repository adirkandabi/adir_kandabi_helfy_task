const taskService = require("../services/taskService.js");

//GET all items
const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskService.getAll();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

//GET a single item by ID
const getTaskById = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskService.getById(parseInt(id));
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

//POST a new item
const createTask = (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
// Update an existing item
const updateTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskService.updateTask(parseInt(id), req.body);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
// Toggle task completion
const toggleTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskService.toggleTask(parseInt(id));
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
//DELETE an item
const deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const task = taskService.deleteTask(parseInt(id));
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
};
