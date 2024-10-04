// routes/images.js
const express = require("express");
const multer = require("multer");
const path = require("path"); // Import path module
const Image = require("../models/Image");
const Annotation = require("../models/Annotation");
const authenticateToken = require("../config/authMiddleware");
const { classifyImage } = require("../utils/imageClassifier"); // Import the classifier
const router = express.Router();

// Set up storage for multer with file extension handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Directory to save the images
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname); // Get the original file extension
    cb(null, `${uniqueName}${ext}`); // Save with unique name + extension
  },
});

const upload = multer({ storage });

// Upload Image
router.post(
  "/upload",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const ext = path.extname(req.file.originalname); // Get the original file extension
      const classificationResult = await classifyImage(req.file.path); // Classify the image
      console.log(
        "classificationResult outside: ",
        classificationResult.cat.toString()
      );
      const image = new Image({
        userId: req.user.id,
        filePath: req.file.path,
        classificationResult: classificationResult.cat.toString(),
      });
      console.log("image0", image.classificationResult);
      await image.save();

      res.status(201).json(image);
    } catch (error) {
      res.status(400).json({ message: "Error uploading or classifying image" });
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
  });

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
    });
    res.json(annotations);
  } catch (error) {
    res.status(400).json({ message: "Error fetching annotations" });
  }
});

// Get Images by User ID
router.get("/", authenticateToken, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id });
    res.json(images);
  } catch (error) {
    res.status(400).json({ message: "Error fetching images" });
  }
});

module.exports = router;
