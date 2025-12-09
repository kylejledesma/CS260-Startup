import React, { useState, useEffect } from 'react';
import '../app.css';
import './home.css';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.jsx';

export default function Home() {

    // State for quote of the day
    const [quote, setQuote] = useState({ text: 'Loading inspiration...', author: '' });

    // Fetch the quote from backend (which calls the third-party API)
    useEffect(() => {
        fetch('/api/quote')
            .then((response) => response.json())
            .then((data) => {
                setQuote({ text: data.quote, author: data.author });
            })
            .catch(() => {
                setQuote({ 
                    text: "Act as if what you do makes a difference. It does.", 
                    author: "William James" 
                });
            });
    }, []);

    // Helper to determine destination
    function getDestination(targetPage) {
        const username = localStorage.getItem('localUsername');
        return username ? targetPage : '/login';     
    }

    return (
        <div className="page-wrapper">

            <Navbar />

            <div className="main-content">

            <section className="hero">
                <h1>Find the Perfect Time to Meet. <span className="text-indigo-600">Effortlessly.</span></h1>
                <p>Stop the back-and-forth scheduling. WhenWorks lets your group visually share their schedules to instantly find common free time.</p>
                
                {/* 2. Updated Buttons with Smart Routing */}
                <div className="hero-buttons">
                    <NavLink className='nav-link' to={getDestination('/createpage')}>
                        <button className="btn btn-primary">Create New Group</button>
                    </NavLink>
                    
                    <NavLink className='nav-link' to={getDestination('/joinpage')}>
                        <button className="btn btn-secondary">Join Existing Group</button>
                    </NavLink>
                    
                    {/* The Demo button also checks login now */}
                    <NavLink className='nav-link' to={getDestination('/calendar')}>
                        <button className="btn btn-secondary">Try Demo</button>
                    </NavLink>
                </div>
            </section>

            {/* --- Third party endpoint section. Quote of the day --- */}
            <section className="bg-gray-50 py-12 border-y border-gray-200">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                        Daily Inspiration
                    </h3>
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-900 italic font-serif">
                        "{quote.text}"
                    </blockquote>
                    <div className="mt-4 text-gray-500 font-medium">
                        — {quote.author}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
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