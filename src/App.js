// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ImageUpload from "./components/ImageUpload";
import ImageList from "./components/ImageList";
import Gallery from "./components/AnnotationComponent";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Image Annotation App</h1>
        <Routes>
          <Route path="/" element={<ImageList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <ImageUpload onUpload={() => {}} />
      </div>
    </Router>
  );
};

export default App;
