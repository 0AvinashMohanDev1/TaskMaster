// Import necessary modules and configurations
const express = require("express");
const connection = require("./config/db");  // Assuming this module connects to your database
const { redisClient } = require("./config/redis");  // Assuming this module configures Redis
const app = express();

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Enable JSON parsing middleware for incoming requests
app.use(express.json());

// Define a simple route for the root endpoint
app.get("/", (req, res) => {
    res.send("Task Master");
});

// Use the imported route handlers
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3100;
app.listen(PORT, async () => {
    try {
        // Connect to the database and log success
        await connection;
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        // Log any errors that occur during startup
        console.error("Error during server startup:", error);
    }
});
