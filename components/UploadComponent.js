import React, { useState } from 'react';
import axios from 'axios';

function UploadComponent({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('YOUR_BACKEND_UPLOAD_URL', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setProgress(percentCompleted);
        },
      });
      onUploadSuccess(response.data); // Pass response data to parent
    } catch (error) {
      setError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="upload-component">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {progress > 0 && <progress value={progress} max="100">{progress}%</progress>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default UploadComponent;
