const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/")); 
    },

    filename: function (req, file, cb) {
        cb(null, "uploaded-image" + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB file size limit
    },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only PNG, JPG, and JPEG images are allowed"));
        }
        callback(null, true);
    },
});

const fileUpload = (req, res, next) => {
    upload.single("image")(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: error.message });
        } else if (error) {
            console.log(error);
            return res.status(500).json({ error: "An error occurred" });
        } else if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        next();
    });
};

module.exports = fileUpload;
