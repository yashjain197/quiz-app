import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/Result.css'; // Import CSS file for styling

const Result = () => {
  const handleGoToDashboard = () => {
    window.location.href = '/dashboard'; // Navigate to dashboard
  };

  const location = useLocation(); // Initialize useLocation
  const queryParams = new URLSearchParams(location.search);

  // Extract additional data from query parameters
  const result = queryParams.get('result');

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Result</h1>
      <div className="result-content">
        <p>{result}</p>
        <button className="dashboard-button" onClick={handleGoToDashboard}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Result;
