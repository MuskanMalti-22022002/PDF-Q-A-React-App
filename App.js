import React, { useState } from 'react';
import UploadComponent from './components/UploadComponent';
import QnAComponent from './components/QnAComponent';
import './App.css';

function App() {
  const [documentId, setDocumentId] = useState(null);

  const handleUploadSuccess = (data) => {
    setDocumentId(data.documentId); // Assuming the server response includes a documentId
  };

  return (
    <div className="app-container">
      <div className="upload-section">
        <UploadComponent onUploadSuccess={handleUploadSuccess} />
      </div>
      <div className="qna-section">
        {documentId ? (
          <QnAComponent documentId={documentId} />
        ) : (
          <p>Please upload a PDF to start.</p>
        )}
      </div>
    </div>
  );
}

export default App;
