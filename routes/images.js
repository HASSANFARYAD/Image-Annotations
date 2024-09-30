// routes/images.js
const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const Annotation = require("../models/Annotation");
const authenticateToken = require("../config/authMiddleware"); // Import the auth middleware
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload Image
router.post(
  "/upload",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const image = new Image({ userId: req.user.id, filePath: req.file.path }); // Associate image with the user
    try {
      await image.save();
      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ message: "Error uploading image" });
    }
  }
);

// Save Annotations
router.post("/annotations", authenticateToken, async (req, res) => {
  const { imageId, annotations } = req.body;
  const annotation = new Annotation({
    imageId,
    userId: req.user.id,
    annotations,
  }); // Associate annotation with the user

  try {
    await annotation.save();
    res.status(201).json(annotation);
  } catch (error) {
    res.status(400).json({ message: "Error saving annotations" });
  }
});

// Get Annotations by Image ID
router.get("/annotations/:imageId", authenticateToken, async (req, res) => {
  try {
    const annotations = await Annotation.find({
      imageId: req.params.imageId,
      userId: req.user.id,
    }); // Fetch annotations for the authenticated user
    res.json(annotations);
  } catch (error) {
    res.status(400).json({ message: "Error fetching annotations" });
  }
});

// Get Images by User ID
router.get("/", authenticateToken, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id }); // Fetch images for the authenticated user
    res.json(images);
  } catch (error) {
    res.status(400).json({ message: "Error fetching images" });
  }
});

module.exports = router;
