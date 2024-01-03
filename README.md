## Project Name: TaskMaster

### Table of Contents
1. [Auth Routes](#auth-routes)
2. [Task Routes](#task-routes)
3. [Dependencies](#dependencies)
4. [Database Connection](#database-connection)
5. [Redis Configuration](#redis-configuration)

### Auth Routes
In the `authRoutes.js` file, the Express Router is used to define routes related to user authentication. These routes include:

- **POST /register:** Allows users to register by providing registration details.
- **POST /login:** Handles user login by validating credentials.
- **GET /users:** Retrieves a list of all users.
- **DELETE /users/:_id:** Deletes a user by their unique ID.

```javascript
// Example authRoutes.js
const express = require("express");
const { login, register, getUsers, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post('/login', login);
router.get("/users", getUsers);
router.delete("/users/:_id", deleteUser);

module.exports = router;
```

### Task Routes
In the `taskRoutes.js` file, routes related to task management are defined using Express Router. These routes include:

- **POST /tasks:** Creates a new task (requires authentication).
- **GET /tasks:** Retrieves all tasks for the authenticated user (requires authentication).
- **PUT /tasks/:taskId:** Updates a specific task (requires authentication).
- **DELETE /tasks/:taskId:** Deletes a specific task (requires authentication).

```javascript
// Example taskRoutes.js
const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require("../middleware/authMiddleware"); // Import the authentication middleware

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:taskId', authMiddleware, updateTask);
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
```

### Dependencies
The project relies on the following npm packages for its functionality:

- **bcrypt:** Used for password hashing.
- **dotenv:** Enables loading environment variables from a `.env` file.
- **express:** A web application framework for handling HTTP requests.
- **jsonwebtoken:** Used for generating and verifying JSON Web Tokens (JWT).
- **mongoose:** An ODM (Object-Document Mapper) for MongoDB.
- **redis:** A Node.js Redis client library for working with the Redis server.

```json
// Example package.json
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "redis": "^4.6.12"
  }
}
```

### Database Connection
In the `db.js` file, a connection to MongoDB is established using Mongoose. The connection details are retrieved from the environment variables.

```javascript
// Example db.js
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const connection = mongoose.connect(process.env.MONGODB_URI);

module.exports = connection;
```

### Redis Configuration
In the `redis.js` file, a Redis client is configured and connected using the `redis` library. Redis credentials are retrieved from environment variables.

```javascript
// Example redis.js
const { createClient } = require("redis");
require("dotenv").config();

const userName = process.env.redisName;
const password = process.env.password;

const redisClient = createClient({
    url: `redis://${userName}:${password}@redis-12652.c264.ap-south-1-1.ec2.cloud.redislabs.com:12652`
});

redisClient.on("error", (err) => {
    console.log(err);
});

(async () => await redisClient.connect())();

redisClient.on("ready", () => {
    console.log("Redis connected");
});

module.exports = {
    redisClient
};
```