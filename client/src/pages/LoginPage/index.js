import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5555/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
            alert("Logged in successfully!");
            window.location.reload();
        } catch (error) {
            alert('Error while logging in - wrong email or password');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.marginTop + ' ' + styles.cardForm}>
                <h2>Logging in</h2>
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
