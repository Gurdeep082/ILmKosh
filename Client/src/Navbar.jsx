import logo from "./images/logo_text.png";
import { Link ,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';


const Navbar = () => {
     // State to track if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Check the authentication status on component mount
    useEffect(() => {
      // Check if user data exists in local storage
      const user = localStorage.getItem('user');
      console.log(user);
      if (user) {
        setIsAuthenticated(true); // User is authenticated; // Refresh the page once
      }
    }, []);
  


    // Removed the useEffect that reloads the page when authentication status changes
     const handleLogout = () => {
         // Logic for logging out the user
         localStorage.removeItem('user');
         setTimeout(() => {
          setIsAuthenticated(false);

          navigate('/'); // Adjust the route to correct path
        }, 600); // Remove user data from local storage
         // Update authentication state
     };
  return (
      <div className="navbar-container">
          <div className="navbar">
              <div className="cont1">
                  <img src={logo} alt="Logo" />
              </div>
              <div className="cont2">
                  <Link to="/">Home</Link>
                  <Link to="/recommended">Recommended</Link>
                  <div className="bookshelf">
                      <Link to="/bookshelf">Bookshelf</Link>
                  </div>
                  <Link to="/upload">UploadBooks</Link>
              </div>
              {!isAuthenticated ? (
                  <>
                  <div className="cont3">   
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign Up</Link>
                  </div>   
                  </>
              ) : (
                  
                <div className="cont3" onClick={handleLogout}>
                     <Link>Logout</Link>
                </div>
                  
              )}
          </div>
      </div>
  );
};

export default Navbar;