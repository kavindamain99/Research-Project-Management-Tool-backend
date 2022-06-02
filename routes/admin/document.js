const express = require("express");
const router = express.Router();
const authenticate = require("../../helpers/registerMiddlware/auth");
const { upload } = require("../../helpers/admin/multer");
//const { upload } = require("../../helpers/admin/cloudinary");
const {
  insertDocument,
  updateDocument,
  deleteDocument,
  getDocumentsST,
  getDocument,
  insertMarkingSchema,
  insertPresentation,
  getDocumentAll,
} = require("../../controllers/admin/document");

const { insertSubmission } = require("../../controllers/student/submission");

router.post("/insert", upload.single("document"), insertDocument);
router.post(
  "/student/insert/submission",
  upload.single("document"),
  insertSubmission
);

router.post("/insert/schema", upload.single("document"), insertMarkingSchema);
router.post(
  "/insert/presentation",
  upload.single("document"),
  insertPresentation
);
router.get("/get", getDocumentsST);
router.get("/get/all", getDocumentAll);
router.put("/update/:id", updateDocument);

router.get("/get/:id", getDocument);
router.delete("/delete/:id", deleteDocument);
module.exports = router;
