const express = require("express");
const server = express();
const taskRoutes = require("./routes/taskRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");
const notFound = require("./middleware/notFound.js");
const cors = require("cors");
const port = 4000;

//cors middleware
server.use(cors());

// Middleware to parse JSON bodies
server.use(express.json());

// Routes
server.use("/api", taskRoutes);

// Error handling middleware
server.use(notFound);
server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
