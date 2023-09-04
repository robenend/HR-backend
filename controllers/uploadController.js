const express = require('express');
const multer = require('multer');

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

// Set up multer middleware
const upload = multer({ storage });

// Define the file upload route
router.post('/upload', upload.single('file'), (req, res) => {

  res.status(200).json({ message: 'File uploaded successfully' });
});

module.exports = router;
