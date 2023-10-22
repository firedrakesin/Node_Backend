// Importing necessary modules
const express = require('express'); // Importing Express to create a router.
const router = express.Router(); // Creating a router instance.
const path = require('path'); // Importing the 'path' module for working with file paths.
const fs = require('fs'); // Importing the 'fs' module for file system operations.
const { dbData } = require('../models/PostSchema'); // Importing the database model from './models/PostSchema'.
const apiKey = process.env.INSERT_API_KEY; // Stored API key for authentication.

require('dotenv').config(); // Loading environment variables from a .env file using dotenv.
router.use(express.json()); // Enabling JSON parsing for incoming requests.

// Defining an API key authentication middleware to secure specific routes.
const apiKeyAuthMiddleware = (req, res, next) => {
  const providedApiKey = req.headers['x-api-key']; // Checking for a valid API key in the request headers.
  if (providedApiKey === apiKey) {
    // If valid, continue to the next middleware.
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' }); // Otherwise, return a 401 Unauthorized response.
  }
};

// Creating a POST route to insert data from a JSON file
router.post('/samples', apiKeyAuthMiddleware, async (req, res) => {
    try {
      // Read and parse data from 'sampleData.json'
      const datas = JSON.parse(fs.readFileSync(path.join(__dirname, '../sampleData.json')));
      
      // Insert the data into the database
      for (let data of datas) {
        const { title, description, image, price, tags } = data;
      
        // Create a new instance of the dbData model
        const newPost = new dbData({
          title,
          description,
          image,
          price,
          tags,
        });
      
        // Save the newPost instance to the database
        const savedPost = await newPost.save();
      }
      
      res.status(201).json({message: 'All Data inserted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `Some Error occur during insert data : ${error}` });
    }
  });
  


module.exports = router; // Export the router