import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5555/api/auth/register', { name, email, password });
            navigate('/login');
            alert("Registered successfully!");
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Error while registering!');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.marginTop + ' ' + styles.cardForm}>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className={styles.buttonCenter}>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
