// src/components/ImageUpload.js
import React, { useState } from "react";
import { uploadImage } from "../api";
import { getToken } from "../utils";

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const token = getToken();
    await uploadImage(formData, token);
    onUpload(); // Trigger a refresh or callback to update images
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageUpload;
