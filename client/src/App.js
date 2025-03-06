import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
    
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            setCurrentUser(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        window.location.reload();
    };

    return (
        <Router>
            <Navbar currentUser={currentUser} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage currentUser={currentUser} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
