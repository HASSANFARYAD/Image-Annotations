// models/Image.js
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("Image", ImageSchema);
