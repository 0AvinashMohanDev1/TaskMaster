// Import necessary modules and functions from the authController
const express = require("express");
const { login, register, getUsers, deleteUser } = require("../controllers/authController");

// Create an Express Router instance
const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post('/login', login);

// Route to get a list of all users
router.get("/users", getUsers);

// Route to delete a user by their ID
router.delete("/users/:_id", deleteUser);

// Export the router for use in other parts of the application
module.exports = router;
