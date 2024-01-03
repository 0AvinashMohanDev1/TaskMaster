const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {redisClient} = require('../config/redis');
require("dotenv").config();
/**
 * @desc Middleware to verify JWT token and authenticate the user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the request header
    const token=await redisClient.get("normalToken")

    // console.log(token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the decoded token
    const user = await User.findOne({ _id: decoded.userId });

    // Check if the user exists
    if (!user) {
      throw new Error();
    }

    // Attach the user object to the request for further use in controllers
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle authentication failure
    console.log({error:error.message});
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Export the middleware function
module.exports = authMiddleware;
