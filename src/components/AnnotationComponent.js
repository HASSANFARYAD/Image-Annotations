// src/components/ImageList.js
import React, { useEffect, useState } from "react";
import { getUserImages, getAnnotations } from "../api";
import { getToken } from "../utils";
import AnnotationForm from "./AnnotationForm";
import "./ImageList.css"; // Import CSS for the grid styling

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [model, setModel] = useState(null);
  const [classification, setClassification] = useState([]);
  const token = getToken();
  const [loader, setLoader] = useState(false);
  const loaderGif = "https://i.sstatic.net/kOnzy.gif";

  useEffect(() => {
    const fetchImages = async () => {
      const response = await getUserImages(token);
      setImages(response);
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

  const handleImageClick = async (imageId, imageSrc) => {
    setLoader(true);
    setSelectedImageId(imageId);
    const response = await getAnnotations(imageId, token);
    setAnnotations(response);

    classifyImage(imageSrc);
  };

  const classifyImage = (imageSrc) => {
    if (model) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Allow cross-origin requests
      img.src = imageSrc;
      //img.src =
      //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MtYjTgAXclCyWMd7bJG7MRdPFNQC8rwvwA&s";
      img.onload = () => {
        // Double-check if the image is properly loaded
        console.log("Image Loaded: ", img.src);

        model.classify(img, (err, results) => {
          if (err) {
            console.error("Error during classification:", err); // Log the error if any
            console.log("Classification Results:", err);
            setClassification(err);
          }

          // Check results before processing
          if (results && results.length > 0) {
          } else {
            console.warn("No classification results returned.");
          }
          setLoader(false);
        });
      };

      img.onerror = (e) => {
        console.error("Failed to load image for classification:", e);
      };
    } else {
      console.error("Model is not loaded yet.");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const badgeClasses = [
    "badge-1",
    "badge-2",
    "badge-3",
    "badge-4",
    "badge-5",
    "badge-6",
    "badge-7",
    "badge-8",
    "badge-9",
    "badge-10",
    "badge-11",
    "badge-12",
    "badge-13",
    "badge-14",
    "badge-15",
    "badge-16",
    "badge-17",
    "badge-18",
    "badge-19",
    "badge-20",
    "badge-21",
    "badge-22",
    "badge-23",
    "badge-24",
    "badge-25",
    "badge-26",
    "badge-27",
    "badge-28",
    "badge-29",
    "badge-30",
    "badge-31",
    "badge-32",
    "badge-33",
    "badge-34",
    "badge-35",
    "badge-36",
    "badge-37",
    "badge-38",
    "badge-39",
    "badge-40",
    "badge-41",
    "badge-42",
    "badge-43",
    "badge-44",
    "badge-45",
    "badge-46",
    "badge-47",
    "badge-48",
    "badge-49",
    "badge-50",
  ];

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div
          className="image-box"
          key={image._id}
          onClick={() =>
            handleImageClick(
              image._id,
              `http://localhost:5000/${image.filePath}`
            )
          }
        >
          <img
            src={`http://localhost:5000/${image.filePath}`}
            alt="Uploaded"
            className="gallery-image"
          />

          {!loader ? (
            selectedImageId === image._id &&
            classification.length > 0 && (
              <div className="image-details">
                <h3>Annotations</h3>
                <ul>
                  {classification.map((annotation, index) => (
                    <li key={index}>
                      <span key={index}>
                        Label:
                        <div key={index}>
                          {annotation.label.includes(",") ? (
                            annotation.label
                              .split(",")
                              .map((label, labelIndex) => (
                                <span
                                  key={labelIndex}
                                  className={`badge ${
                                    badgeClasses[
                                      Math.floor(
                                        Math.random() * badgeClasses.length
                                      )
                                    ]
                                  }
                                  }`}
                                >
                                  {capitalizeFirstLetter(label.trim())}
                                  {/* Trim spaces around the label */}
                                </span>
                              ))
                          ) : (
                            <span
                              className={`badge ${
                                badgeClasses[
                                  Math.floor(
                                    Math.random() * badgeClasses.length
                                  )
                                ]
                              }`}
                            >
                              {capitalizeFirstLetter(annotation.label.trim())}
                            </span>
                          )}
                        </div>
                      </span>
                      <span>
                        Confidence:
                        {annotation.confidence.toFixed(2)}%
                      </span>
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${annotation.confidence * 100}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ) : (
            <>
              <span>{loaderGif}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
