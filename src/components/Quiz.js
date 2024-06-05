import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './css/Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('/quiz/start', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const answerIndex = newAnswers.findIndex((ans) => ans.id === questionId);

      if (answerIndex === -1) {
        newAnswers.push({ id: questionId, answer: value });
      } else {
        newAnswers[answerIndex].answer = value;
      }

      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    let response = await axios.post('/quiz/submit', { answers }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const queryParams = new URLSearchParams();
    
    queryParams.append('result', response.data.message);
    console.log(response.data)
    window.location.href = `/result?${queryParams.toString()}`;
  };


  return (
    <div className="main-content">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz</h1>
        {questions.length > 0 && (
          <div className="question-block">
            <p className="question">{questions[currentQuestionIndex].question}</p>
            {questions[currentQuestionIndex].options.map((option, i) => (
              <div key={i} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={
                    answers.find((ans) => ans.id === questions[currentQuestionIndex]._id)?.answer === option
                  }
                  onChange={(e) => handleAnswerChange(questions[currentQuestionIndex]._id, e.target.value)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        )}
        <div className="navigation-buttons">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="nav-button"
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="nav-button"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
