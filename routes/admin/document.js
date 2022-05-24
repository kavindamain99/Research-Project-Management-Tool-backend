const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const { upload } = require("../../helpers/admin/multer");
//const { upload } = require("../../helpers/admin/cloudinary");
const {
  insertDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  getDocument,
  insertMarkingSchema,
  insertPresentation,
} = require("../../controllers/admin/document");

router.post("/insert", authenticate, upload.single("document"), insertDocument);
router.post(
  "/insert/schema",
  authenticate,
  upload.single("document"),
  insertMarkingSchema
);
router.post(
  "/insert/presentation",
  authenticate,
  upload.single("document"),
  insertPresentation
);
router.get("/get", authenticate, getDocuments);
router.get("/get/:id", authenticate, getDocument);
router.delete("/delete/:id", authenticate, deleteDocument);
module.exports = router;
