import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import './css/Dashboard.css';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);
      // Clean up URL by removing the token parameter
      navigate('/dashboard', { replace: true });
      window.location.reload();
    }

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data', error);
        setMessage('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleQuizStart = () => {
    navigate('/quiz');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-message">{message}</p>
      <button className="start-quiz-button" onClick={handleQuizStart}>
        Start Quiz
      </button>
    </div>
  );
};

export default Dashboard;
