import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../app.css';

export const Navbar = () => {

  const navigate = useNavigate();

  function loggedIn() {
    const username = localStorage.getItem('localUsername');
    const password = localStorage.getItem('localPassword');
    if (username && password) {
      return true;
    }
    else {
      return false;
    }        
  }

  function logoutUser() {
    // Clear localStorage items related to login
    localStorage.removeItem('localUsername');
    localStorage.removeItem('localPassword');
    // Navigate to home page after logout
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="logo">Whenworks</div>
      <div className="nav-buttons">
        {loggedIn() ? (
          // Show these buttons when user IS logged in
          <>
            <NavLink className='nav-link' to='/joinpage'>
              <button className="btn btn-text">Join New Group</button>
            </NavLink>
            <NavLink className='nav-link' onClick={logoutUser} to='/'>
              <button className="btn btn-primary">Sign Out</button>
            </NavLink>
          </>
        ) : (
          // Show these buttons when user is NOT logged in
          <>
            <NavLink className='nav-link' to='/login'>
              <button className="btn btn-text">Sign In</button>
            </NavLink>
            <NavLink className='nav-link' to='/login'>
              <button className="btn btn-primary">Get Started</button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};