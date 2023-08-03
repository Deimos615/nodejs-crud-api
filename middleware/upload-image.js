const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("The media type is incorrect");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    const name = fileName
      .toLowerCase()
      .split(" ")
      .join("_");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "_" + Date.now() + "." + ext);
  }
});

module.exports = multer({ storage: storage }).single("file");
