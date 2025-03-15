import logo from "./images/logo_text.png";
import { Link ,useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef  } from 'react';
import './App.css';
import { Menu, X } from "lucide-react";

const Navbar = () => {
     // State to track if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close navbar when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
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
         localStorage.removeItem('token'); // Remove token from local storage
         setTimeout(() => {
          setIsAuthenticated(false);

          navigate('/'); // Adjust the route to correct path
        }, 600); // Remove user data from local storage
         // Update authentication state
     };
  return (
    <div className="navbar-container">
    <div className="navbar">
      {/* Logo */}
      <div className="cont1">
        <img src={logo} alt="Logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Navbar Links (Slide-in from top) */}
      <div ref={menuRef} className={`cont2 ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/recommended" onClick={() => setIsOpen(false)}>Recommended</Link>
        <Link to="/bookshelf" onClick={() => setIsOpen(false)}>Bookshelf</Link>
        <Link to="/upload" onClick={() => setIsOpen(false)}>UploadBooks</Link>

        {/* Authentication Links */}
        {!isAuthenticated ? (
          <div className="cont3">
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
          </div>
        ) : (
          <div className="cont3" onClick={handleLogout}>
            <Link onClick={() => setIsOpen(false)}>Logout</Link>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Navbar;