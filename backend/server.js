const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server working");
});

app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ image: imageUrl });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});