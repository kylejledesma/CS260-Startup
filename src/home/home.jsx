import React from 'react';
import '../app.css';
import './home.css';
import { NavLink } from 'react-router-dom';

export default function Home() {

    const [navigateTo, setNavigateTo] = React.useState(null);

    // Set groups in localStorage if not already present
    if (!localStorage.getItem('groupNames')) {
        localStorage.setItem('groupNames', JSON.stringify([]));
    }

    function validateLogin(target) {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (username && password){
            return target;
        }
        else {
            return 'login';
        }        
    }

    return (
        <div className="page-wrapper">
            <nav className="navbar">
                <div className="logo">Whenworks</div>
                <div className="nav-buttons">
                    <NavLink className='nav-link' to='login'><button className="btn btn-text">Sign In</button></NavLink>
                    <NavLink className='nav-link' to='login'><button className="btn btn-primary">Get Started</button></NavLink>
                </div>
            </nav>
            <div className="main-content">

            <section className="hero">
                <h1>Find the Perfect Time to Meet. <span className="text-indigo-600">Effortlessly.</span></h1>
                <p>Stop the back-and-forth scheduling. WhenWorks lets your group visually share their schedules to instantly find common free time.</p>
                <div className="hero-buttons">
                    <NavLink className='nav-link' to={validateLogin('createpage')}><button className="btn btn-primary">Create New Group</button></NavLink>
                    <NavLink className='nav-link' to={validateLogin('joinpage')}><button className="btn btn-secondary">Join Existing Group</button></NavLink>
                    <NavLink className='nav-link' to={validateLogin('calendar')}><button className="btn btn-secondary">Try Demo</button></NavLink>
                </div>
            </section>
                        
            {/* <section class="features">
                <div class="features-grid">
                    <div class="feature-card">
                        <h3>Easy Group Creation</h3>
                        <p>Create and manage groups in seconds with our intuitive interface.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Visual Schedule Blocking</h3>
                        <p>Block out your availability with simple drag-and-drop controls.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Smart Overlap Detection</h3>
                        <p>Automatically find the best meeting times for your entire group.</p>
                    </div>
                </div>
            </section> */}

            <section className="how-it-works">
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Create Group</h3>
                        <p>Set up your team and invite members</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Share Schedule</h3>
                        <p>Input your availability</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Find Match</h3>
                        <p>View optimal meeting times</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Schedule Meeting</h3>
                        <p>Confirm and send invites</p>
                    </div>
                </div>
            </section>

            </div>
            <footer className="footer">
                <p>&copy; 2024 Whenworks. All rights reserved. <a href="https://github.com/kylejledesma/CS260-Startup" className="text-primary">View on GitHub</a></p>
            </footer>
        </div>
    )
}