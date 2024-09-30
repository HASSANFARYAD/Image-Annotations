// utils/imageClassifier.js
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const { getLabel } = require("./classLabels");

// Load the pre-trained model (e.g., MobileNet)
let model;
const loadModel = async () => {
  model = await tf.loadGraphModel(
    "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2/feature_vector/4/default/1"
  );
};

loadModel();

// Function to classify an image
const classifyImage = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const decodedImage = tf.node.decodeImage(imageBuffer);

  // Resize and normalize the image
  const resizedImage = tf.image.resizeBilinear(decodedImage, [224, 224]); // Adjust size as needed
  const normalizedImage = resizedImage.div(255.0).expandDims(0); // Normalize and add batch dimension

  // Classify the image
  const predictions = await model.predict(normalizedImage).data();

  // Get the top class prediction
  const topClassIndex = predictions.indexOf(Math.max(...predictions));
  const className = getLabel(topClassIndex);
  return className; // You might want to map this to actual labels
};

module.exports = { classifyImage };
