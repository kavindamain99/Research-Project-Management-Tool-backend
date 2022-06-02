const express = require("express");
const router = express.Router();
const { graphData } = require("../../controllers/admin/graph");

router.get("/graph", graphData);
module.exports = router;
