import React, { useState } from 'react';
import axios from 'axios';

function QnAComponent({ documentId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;

    try {
      const response = await axios.post('YOUR_BACKEND_QUESTION_URL', {
        documentId,
        question,
      });
      setAnswer(response.data.answer);
      setError('');
    } catch (error) {
      setError('Failed to get an answer. Please try again.');
    }
  };

  return (
    <div className="qna-component">
      <div className="document-info">
        <h3>Document: {documentId}</h3>
      </div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question here..."
      ></textarea>
      <button onClick={handleQuestionSubmit}>Get Answer</button>
      {answer && (
        <div className="answer-box">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default QnAComponent;
