const multer = require("multer");
const path = require("path");

const tempPath = path.resolve(__dirname, "../../temp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

const uploader = multer({ storage: storage });
module.exports = uploader;
