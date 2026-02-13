const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// API endpoints
router.get("/tasks", taskController.getAllTasks); // GET /api/tasks
router.get("/tasks/:id", taskController.getTaskById); // GET /api/tasks/123
router.post("/tasks", taskController.createTask); // POST /api/tasks
router.put("/tasks/:id", taskController.updateTask); // PUT /api/tasks/123
router.patch("/tasks/:id/toggle", taskController.toggleTask); // PATCH /api/tasks/123/toggle
router.delete("/tasks/:id", taskController.deleteTask); // DELETE /api/tasks/123

module.exports = router;
