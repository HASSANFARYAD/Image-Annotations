// src/components/AnnotationForm.js
import React, { useState } from "react";
import { saveAnnotation } from "../api";
import { getToken } from "../utils";

const AnnotationForm = ({ imageId, onSave }) => {
  const [text, setText] = useState("");
  const [shape, setShape] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken(); // Retrieve token (make sure it's valid)

    // Prepare the annotation data
    const annotationData = {
      imageId, // Ensure imageId is correctly set
      annotations: [
        {
          shape,
          text, // The annotation text (e.g. user input)
          coordinates: JSON.parse(coordinates), // Convert string to an object
        },
      ],
    };

    try {
      // Call the saveAnnotation function to make the API request
      await saveAnnotation(annotationData, token);

      // Trigger a callback to refresh annotations or update the UI
      onSave();
    } catch (error) {
      console.error("Error saving annotation:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Shape"
        value={shape}
        onChange={(e) => setShape(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Annotation text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Coordinates (e.g., [x1, y1, x2, y2])"
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
        required
      />
      <button type="submit">Save Annotation</button>
    </form>
  );
};

export default AnnotationForm;
