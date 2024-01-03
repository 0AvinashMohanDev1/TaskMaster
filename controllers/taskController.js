const Task = require('../models/task.model');

/**
 * @desc Create a new task
 * @route POST /tasks
 * @access Private (requires authentication)
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, targetTime } = req.body;

    // Create a new task with the provided target time
    const task = new Task({ title, description, targetTime, user: req.user._id });

    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all tasks of the authenticated user
 * @route GET /tasks
 * @access Private (requires authentication)
 */
const getTasks = async (req, res, next) => {
  try {
    // Fetch all tasks associated with the authenticated user
    const tasks = await Task.find({ user: req.user._id });

    // Return the tasks
    res.json({ tasks });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

/**
 * @desc Update a task
 * @route PUT /tasks/:taskId
 * @access Private (requires authentication)
 */
const updateTask = async (req, res, next) => {
  try {
    // Extract task details from request body
    const { title, description, status } = req.body;

    // Find the task by ID
    const task = await Task.findById(req.params.taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    // Save the updated task to the database
    await task.save();

    // Return success response
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

/**
 * @desc Delete a task
 * @route DELETE /tasks/:taskId
 * @access Private (requires authentication)
 */
const deleteTask = async (req, res, next) => {
  try {
    // Find the task by ID and remove it
    const task = await Task.findByIdAndDelete(req.params.taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Return success response
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Export the controller functions
module.exports = { createTask, getTasks, updateTask, deleteTask };
