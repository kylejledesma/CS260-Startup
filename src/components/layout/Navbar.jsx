import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../app.css';

export const Navbar = () => {

  const navigate = useNavigate();

  // Check if user is logged in by looking for only username in localStorage
  function loggedIn() {
    const username = localStorage.getItem('localUsername');
    return Boolean(username);     
  }

  // Updated logout function
  async function logoutUser() {
    // 1. Call the service endpoint to remove the HTTP-only cookie
    await fetch('/api/auth/logout', {
      method: 'DELETE',
    });

    // 2. Clear the local display name
    localStorage.removeItem('localUsername');

    // 3. Navigate back to home
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="logo">Whenworks</div>
      <div className="nav-buttons">
        {loggedIn() ? (
          // Show these buttons when user IS logged in
          <>
            <NavLink className='nav-link' to='/createpage'>
              <button className="btn btn-text">Create Group</button>
            </NavLink>
            <button className="btn btn-primary" onClick={logoutUser}>
              Sign Out
            </button>
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