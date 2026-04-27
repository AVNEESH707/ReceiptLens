const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { extractText } = require("../utils/ocr");
const { parseReceipt } = require("../utils/parser");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("file");

// Controller
const processOCR = async (req, res) => {
  try {
    // ❌ No file uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const filePath = req.file.path;

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      fs.unlink(filePath, () => {}); // delete the invalid file
      return res.status(400).json({
        error: "Unsupported file type. Please upload a valid image file (JPEG, PNG, GIF, BMP, TIFF).",
      });
    }

    // 🧠 OCR extraction
    const { text, confidence } = await extractText(filePath);

    // 🧾 Parse structured data
    const data = parseReceipt(text);

    // 🧹 Optional: delete file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("File delete error:", err);
    });

    // ✅ Response
    res.json({
      success: true,
      data,
      confidence,
      raw_text: text,
    });

  } catch (error) {
    console.error("OCR Error:", error);

    // Clean up file if exists
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({
      success: false,
      error: "OCR processing failed",
    });
  }
};

module.exports = { upload, processOCR };