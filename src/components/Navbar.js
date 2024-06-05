// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css//Navbar.css'; // Import the CSS file for styling

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token'); 
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          Online Test App
        </Link>
        <div className="navbar-links">
        {!isLoggedIn && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/" className="navbar-link" onClick={() => {
                localStorage.removeItem('token'); // Log out the user
                window.location.href = '/login';
              }}>Logout</Link>
            </>
          )}
          {/* <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/quiz" className="navbar-link">Quiz</Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
