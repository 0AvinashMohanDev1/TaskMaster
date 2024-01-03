const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {redisClient}=require("../config/redis")
/**
 * @desc Register a new user
 * @route POST /auth/register
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    // Extract username and password from request body
    let {email, username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    password=bcrypt.hashSync(password,10);
    // Create a new user
    const user = new User({ email,username, password });

    // Save the user to the database
    await user.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

/**
 * @desc Login user and generate JWT token
 * @route POST /auth/login
 * @access Public
 */
const login = async (req, res, next) => {
  try {
    // Extract username and password from request body
    const { email, password } = req.body;

    // console.log(email,password);
    // Check if the user exists
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store the token in Redis with a short expiration time (60 seconds)
    await redisClient.set('normalToken', token, { expiresIn: '60' });
    // Return the token
    res.json({ token });

  } catch (error) {
    // Handle errors
    next(error);
  }
};

const getUsers=async (req,res,next)=>{
  try {
    const data=await User.find({});
    res.send(data)
  } catch (error) {
    next(error)
  }
}

const deleteUser=async(req,res,next)=>{
  try {
    const id=req.params._id
    console.log(id);
    const result=await User.findByIdAndDelete(id);
    if(result)res.send('User account deleted');
  } catch (error) {
    next(error);
  }
}

// Export the controller functions
module.exports = { register, login, getUsers, deleteUser};
