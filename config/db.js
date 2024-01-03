const mongoose =require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const connection=mongoose.connect(process.env.MONGODB_URI)

module.exports=connection;