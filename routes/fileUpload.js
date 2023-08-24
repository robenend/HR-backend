const uploadController = require('../controllers/uploadController');
const express = require("express")
const router = express.Router();

router.post("/upload", uploadController, (req, res) => {
    res.json({ message: "Image uploaded successfully" });
});

// Route: request file
// router.get('/upload', uploadController);
module.exports = router;