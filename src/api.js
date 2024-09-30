// src/api.js
import axios from "axios";

// Set the base URL for the API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create an instance of Axios with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed");
  }
};

// User Login
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data; // This should include the token
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

// Upload Image
export const uploadImage = async (formData, token) => {
  try {
    const response = await api.post("/images/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // This should include image info
  } catch (error) {
    throw new Error(error.response.data.message || "Image upload failed");
  }
};

// Save Annotation
export const saveAnnotation = async (annotationData, token) => {
  try {
    const response = await api.post("/images/annotations", annotationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should include saved annotation info
  } catch (error) {
    throw new Error(error.response.data.message || "Annotation save failed");
  }
};

// Get User Images
export const getUserImages = async (token) => {
  try {
    const response = await api.get("/images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should be an array of user images
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch images");
  }
};

// Get Annotations for a Specific Image
export const getAnnotations = async (imageId, token) => {
  try {
    const response = await api.get(`/images/annotations/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should be an array of annotations for the image
  } catch (error) {
    throw new Error(
      error.response.data.message || "Failed to fetch annotations"
    );
  }
};
