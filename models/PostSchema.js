// Imported necessary modules and libraries

require('dotenv').config();              // Loaded environment variables from .env file
const mongoose = require('mongoose');    // Import Mongoose for database connection

// Getting the MongoDB connection URI from environment variables
const DB = process.env.MONGO_URI;

// Connected to MongoDB using Mongoose
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


// Defined the schema for the 'Post' structure
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  tags: [String], // Define 'tags' as an array of strings
});


// Created a Mongoose model based on the schema for 'Post' data
const dbData = mongoose.model('Books', postSchema);

// Exported the Mongoose model for external use
module.exports = { dbData };
