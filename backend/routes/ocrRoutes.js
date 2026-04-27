const express = require("express");
const router = express.Router();
const { upload, processOCR } = require("../controllers/ocrControllers");

router.post("/upload", upload, processOCR);

module.exports = router;