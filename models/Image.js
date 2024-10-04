// models/Image.js
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filePath: { type: String, required: true },
  classificationResult: { type: String }, // Add classification result field
});

module.exports = mongoose.model("Image", ImageSchema);
