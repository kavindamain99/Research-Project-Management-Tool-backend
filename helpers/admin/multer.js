const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/document");
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // if (ext !== ".pdf" || ext !== ".jpg") {
    //   cb(new Error("File type is not supported"), false);
    //   return;
    // }
    cb(null, true);
  },
});

// const storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, "/uploads/");
//   },
//   filename: function (request, file, callback) {
//     callback(
//       null,
//       file.originalname.toLowerCase().split(" ").join("-") + Date.now()
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

module.exports = { upload };
