import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";

function UploadImageForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sequence, setSequence] = useState(0);
  const [file, setFile] = useState(null);

  // Handle image resizing
  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      // Define the desired width as a percentage of the available screen width (e.g., 100% of container width)
      const width = window.innerWidth * 0.9; // 90% of the screen width
      const height = Math.round(width / 3);  // 1:3 aspect ratio

      // Resize the image
      Resizer.imageFileResizer(
        imageFile,
        width,  // Set responsive width
        height, // Set calculated height for 1:3 aspect ratio
        "JPEG", // Output format
        90,     // Quality (0-100)
        0,      // Rotation (in degrees)
        (uri) => {
          setFile(uri); // Resized image
        },
        "blob"  // Output format as blob
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sequence", sequence);
    formData.append("image", file);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/images";

    axios
      .post(API_URL, formData)
      .then((response) => {
        if (response.status === 201) {
          alert("Image uploaded successfully");
          setTitle("");
          setDescription("");
          setSequence(0);
          setFile(null);
          onSuccess(); // Trigger success callback
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error uploading image. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Sequence</label>
        <input
          type="number"
          className="form-control"
          value={sequence}
          onChange={(e) => setSequence(Number(e.target.value))}
          required
        />
      </div>
      <div className="form-group">
        <label>Image File</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <button type="submit" className="btn btn-success mt-3">
        Upload
      </button>
    </form>
  );
}

export default UploadImageForm;
