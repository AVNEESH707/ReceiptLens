const express = require("express");
const cors = require("cors");
const ocrRoutes = require("./routes/ocrRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ocr", ocrRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});