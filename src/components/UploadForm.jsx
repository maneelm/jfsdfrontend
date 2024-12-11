// UploadForm.jsx
import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "./UploadForm.css";
import { FaCloudUploadAlt } from 'react-icons/fa'; // Import cloud upload icon

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: response.data, type: 'success' });
    } catch (error) {
      if (error.response) {
        setMessage({ text: error.response.data, type: 'error' });
      } else {
        setMessage({ text: "An error occurred while uploading the file.", type: 'error' });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <AdminNavbar />
      <div className="upload-form-container">
        <h2>Upload CSV File for Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-input-wrapper">
            <input type="file" id="file-upload" onChange={handleFileChange} />
            <label htmlFor="file-upload">
              <FaCloudUploadAlt />
              <span>{file ? file.name : 'Choose a file'}</span>
            </label>
          </div>
          <button type="submit" disabled={!file || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p className={`message ${message.type}`}>{message.text}</p>}
      </div>
    </div>
  );
};

export default UploadForm;