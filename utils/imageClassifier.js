// utils/classifyImage.js

const { NeuralNetwork } = require("brain.js");
const fs = require("fs");
const sharp = require("sharp");
const preprocessImage = require("./preprocessImage");

const trainModel = (trainingData) => {
  // Train the neural network with training data (features and labels)
  net.train(trainingData, {
    iterations: 20000, // Increase if needed
    errorThresh: 0.005,
    log: true,
    logPeriod: 100,
  });
};

const classifyImage = async (filePath) => {
  try {
    console.log(`Classifying image: ${filePath}`); // Log the file path to check if it's correct

    // Read the image using Sharp
    const imageBuffer = await sharp(filePath)
      .resize(100, 100) // Resize image (depends on your model's input size)
      .toBuffer();

    console.log("Image processed successfully"); // Log if the image was processed

    // Convert image buffer to normalized pixel values (0-1)
    const normalizedPixels = Array.from(imageBuffer).map(
      (pixel) => pixel / 255
    );

    console.log("Image pixels normalized:", normalizedPixels.slice(0, 20)); // Log first 20 normalized values

    // Dummy Brain.js Neural Network (This needs to be replaced with actual trained model)
    const net = new NeuralNetwork();

    // Load a trained model or train a new one (this is a placeholder model)
    net.train([{ input: normalizedPixels, output: { cat: 1 } }]);

    // Use the model to classify
    const result = net.run(normalizedPixels);
    console.log("Classification result:", result); // Log the classification result

    return result;
  } catch (error) {
    console.error("Error in classifyImage:", error.message); // Log the error
    throw error; // Rethrow the error to be handled by the calling function
  }
};

module.exports = { classifyImage };
