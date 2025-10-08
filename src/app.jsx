import React from 'react';
import './app.css';

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from './login/login';
import Home from './home/home';
import Createpage from './createpage/createpage';
import Joinpage from './joinpage/joinpage';
import Calendar from './calendar/calendar';

export default function App() {
  return (
    <BrowserRouter>
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/joinpage' element={<Joinpage />} />
                <Route path='/createpage' element={<Createpage />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}