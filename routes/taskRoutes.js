const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require("../middlerware/authMiddleware"); 

const router = express.Router();

/**
 * @route POST /tasks
 * @desc Create a new task
 * @access Private (requires authentication)
 */
router.post('/', authMiddleware, createTask);

/**
 * @route GET /tasks
 * @desc Get all tasks for the authenticated user
 * @access Private (requires authentication)
 */
router.get('/', authMiddleware, getTasks);

/**
 * @route PUT /tasks/:taskId
 * @desc Update a specific task
 * @access Private (requires authentication)
 */
router.put('/:taskId', authMiddleware, updateTask);

/**
 * @route DELETE /tasks/:taskId
 * @desc Delete a specific task
 * @access Private (requires authentication)
 */
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
