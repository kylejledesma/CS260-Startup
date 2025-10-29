import React from 'react';
import './app.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Login from './login/login';
import Home from './home/home';
import Createpage from './createpage/createpage';
import Joinpage from './joinpage/joinpage';
import Calendar from './calendar/calendar';

import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/joinpage' element={<Joinpage />} />
                <Route path='/createpage' element={<Createpage />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/PersonalCalendar' element={<Calendar />} />
                <Route path='/TeamHeatmap' element={<Calendar />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}