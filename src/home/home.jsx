import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <nav class="navbar">
                <div class="logo">Whenworks</div>
                <div class="nav-buttons">
                    <NavLink className='nav-link' to='login'><button class="btn btn-text">Sign In</button></NavLink>
                    <NavLink className='nav-link' to='login'><button class="btn btn-primary">Get Started</button></NavLink>
                </div>
            </nav>

            <section class="hero">
                <h1>Find the Perfect Time to Meet</h1>
                <p>Coordinate schedules with your team effortlessly. Share availability, find common free time, and schedule meetings that work for everyone.</p>
                <div class="hero-buttons">
                    <NavLink className='nav-link' to='createpage'><button class="btn btn-primary">Create New Group</button></NavLink>
                    <NavLink className='nav-link' to='joinpage'><button class="btn btn-secondary">Join Existing Group</button></NavLink>
                    <NavLink className='nav-link' to='calendar'><button class="btn btn-secondary">Try Demo</button></NavLink>
                </div>
            </section>
                
            <section class="quote">
                <h2>Quote of the Day</h2>
                <p>Quote generating API: "The best way to predict the future is to create it." - Peter Drucker</p>
            </section>
            
            <section class="features">
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
            </section>

            <section class="how-it-works">
                <div class="steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <h3>Create Group</h3>
                        <p>Set up your team and invite members</p>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <h3>Share Schedule</h3>
                        <p>Input your availability</p>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <h3>Find Match</h3>
                        <p>View optimal meeting times</p>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <h3>Schedule Meeting</h3>
                        <p>Confirm and send invites</p>
                    </div>
                </div>
            </section>

            <footer class="footer">
                <p>&copy; 2024 Whenworks. All rights reserved. https://github.com/kylejledesma/CS260-Startup</p>
            </footer>

        </div>
    )
}