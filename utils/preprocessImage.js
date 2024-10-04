// utils/preprocessImage.js

const sharp = require("sharp");

const preprocessImage = async (filePath) => {
  try {
    // Convert image to raw pixel data and resize it to 32x32 for simplicity
    const { data, info } = await sharp(filePath)
      .resize(32, 32)
      .raw()
      .toBuffer({ resolveWithObject: true });

    return data;
  } catch (error) {
    throw new Error("Error processing image");
  }
};

module.exports = preprocessImage;
