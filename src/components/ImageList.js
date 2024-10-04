// src/components/ImageList.js
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getUserImages, getAnnotations } from "../api";
import { getToken } from "../utils";
import AnnotationForm from "./AnnotationForm";
import "react-image-gallery/styles/css/image-gallery.css"; // Import gallery styles
import "./ImageList.css";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [model, setModel] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getUserImages(token);
      const formattedImages = response.map((image) => ({
        original: `http://localhost:5000/${image.filePath}`,
        thumbnail: `http://localhost:5000/${image.filePath}`,
        originalAlt: image._id,
        imageId: image._id,
      }));
      setImages(formattedImages);
    };

    fetchImages();
    // Load the ml5 model when the component mounts
    const loadModel = () => {
      const loadedModel = window.ml5.imageClassifier("MobileNet", () => {
        console.log("Model Loaded!");
        setModel(loadedModel);
      });
    };

    loadModel();
  }, [token]);

  const handleImageClick = async (event) => {
    const imageId = event.target.alt;
    setSelectedImage(imageId);

    const response = await getAnnotations(imageId, token);
    setAnnotations(response);

    const selectedImgSrc = event.target.src;
    classifyImage(selectedImgSrc);
  };

  const classifyImage = (imageSrc) => {
    if (model) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin requests
      img.src = imageSrc;
      img.onload = () => {
        model.classify(img, (err, results) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Classification Results:", results);
          // You can handle classification results here
        });
      };
    }
  };

  return (
    <>
      <div>
        <h2>Your Images</h2>
        <ImageGallery
          items={images}
          showThumbnails={true}
          onClick={handleImageClick}
        />

        {selectedImage && (
          <div style={{ marginTop: "20px" }}>
            <h3>Annotations for Image {selectedImage}</h3>
            <AnnotationForm
              imageId={selectedImage}
              onSave={() => handleImageClick(selectedImage)}
            />
            <ul>
              {annotations.map((annotation) => (
                <li key={annotation._id}>{annotation.annotations[0].text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageList;
