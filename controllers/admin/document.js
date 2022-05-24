const Document = require("../../models/admin/document");
const cloudinary = require("../../helpers/admin/cloudinary");

const insertMarkingSchema = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "marking",
    });
    let document = new Document({
      name: req.body.name,
      desc: req.body.desc,
      studentAllowed: req.body.studentAllowed,
      staffAllowed: req.body.staffAllowed,
      document: result.secure_url,
      cloudinary_id: result.public_id,
    });

    documentSaved = await document.save();
    res.json(documentSaved);
  } catch (error) {
    res.json(error);
  }
};

const insertPresentation = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "presentation",
    });
    let document = new Document({
      name: req.body.name,
      desc: req.body.desc,
      studentAllowed: req.body.studentAllowed,
      staffAllowed: req.body.staffAllowed,
      document: result.secure_url,
      cloudinary_id: result.public_id,
    });

    documentSaved = await document.save();
    res.json(documentSaved);
  } catch (error) {
    res.json(error);
  }
};

const insertDocument = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "document",
    });
    let document = new Document({
      name: req.body.name,
      desc: req.body.desc,
      studentAllowed: req.body.studentAllowed,
      staffAllowed: req.body.staffAllowed,
      document: result.secure_url,
      cloudinary_id: result.public_id,
    });

    documentSaved = await document.save();
    res.json(documentSaved);
  } catch (error) {
    res.json(error);
  }
};

const updateDocument = async (req, res) => {};

const deleteDocument = async (req, res) => {
  try {
    let document = await Document.findById(req.params.id);
    await cloudinary.uploader.destroy(document.cloudinary_id);
    await document.remove();
    res.json(document);
  } catch (error) {
    res.json(error);
  }
};

const getDocument = async (req, res) => {
  const documentId = req.params.id;
  try {
    const document = await Document.findById({ _id: documentId });
    if (document) {
      res.json(document);
    } else {
      res.json("document not found");
    }
  } catch (error) {
    res.json(error);
  }
};

const getDocuments = async (req, res) => {
  try {
    const document = await Document.find();
    res.json(document);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  insertDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  getDocument,
  insertMarkingSchema,
  insertPresentation,
};
