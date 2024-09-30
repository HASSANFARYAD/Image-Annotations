// src/components/ImageGallery.js
import React, { useEffect, useState } from "react";
import { getImages } from "../api";

const ImageGallery = ({ token }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages(token);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, [token]);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img
              src={image.filePath}
              alt="Uploaded"
              style={{ width: "200px", margin: "10px" }}
            />
            <div>
              <h4>Annotations:</h4>
              {/* Add functionality to fetch and display annotations for the image here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
