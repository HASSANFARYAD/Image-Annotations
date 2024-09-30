// src/components/ImageList.js
import React, { useEffect, useState } from "react";
import { getUserImages, getAnnotations } from "../api";
import { getToken } from "../utils";
import AnnotationForm from "./AnnotationForm";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const token = getToken();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getUserImages(token);
      setImages(response);
    };

    fetchImages();
  }, [token]);

  const handleImageClick = async (imageId) => {
    setSelectedImageId(imageId);
    const response = await getAnnotations(imageId, token);
    setAnnotations(response);
  };

  return (
    <div>
      <h2>Your Images</h2>
      <ul>
        {images.map((image) => (
          <li key={image._id} onClick={() => handleImageClick(image._id)}>
            <img
              src={`http://localhost:5000/${image.filePath}`}
              alt="Uploaded"
              width="100"
            />
          </li>
        ))}
      </ul>

      {selectedImageId && (
        <div>
          <h3>Annotations</h3>
          <AnnotationForm
            imageId={selectedImageId}
            onSave={() => handleImageClick(selectedImageId)}
          />
          <ul>
            {annotations.map((annotation) => (
              <li key={annotation._id}>{annotation.annotations[0].text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageList;
