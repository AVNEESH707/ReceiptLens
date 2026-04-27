const Tesseract = require("tesseract.js");

const extractText = async (imagePath) => {
  try {
    const { data } = await Tesseract.recognize(imagePath, "eng");

    let formattedText = "";

    // ✅ If lines exist (best case)
    if (data.lines && data.lines.length > 0) {
      formattedText = data.lines.map(line => line.text).join("\n");
    } else {
      // 🔥 Fallback: manually create line breaks
      formattedText = data.text
        .replace(/(\d{2,})\s+/g, "$1\n")   // numbers → new line
        .replace(/([A-Z][a-z]+)/g, "\n$1") // words → new line
    }

    console.log("=== OCR TEXT ===");
    console.log(formattedText);

    return {
      text: formattedText,
      confidence: data.confidence,
    };

  } catch (error) {
    console.error("OCR Error:", error);
    return {
      text: "",
      confidence: 0,
    };
  }
};

module.exports = { extractText };