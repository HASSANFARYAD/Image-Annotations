// models/Annotation.js
const mongoose = require("mongoose");

const AnnotationSchema = new mongoose.Schema({
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  annotations: [
    {
      shape: { type: String, required: true },
      coordinates: { type: [Number], required: true },
      text: { type: String },
    },
  ],
});

module.exports = mongoose.model("Annotation", AnnotationSchema);
