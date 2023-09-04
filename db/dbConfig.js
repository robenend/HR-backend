const mongoose = require("mongoose");
require('dotenv').config()

const url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start your application or perform further operations
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });