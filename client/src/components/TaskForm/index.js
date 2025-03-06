import React, { useState } from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [checklist, setChecklist] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [dueDate, setDueDate] = useState(''); 
    const [status, setStatus] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, notes, checklist: checklist.split(','), difficulty, dueDate, status };
        try {
            await axios.post('http://localhost:5555/api/tasks', newTask, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            alert('Task added successfully!');
            window.location.reload();
        } catch (error) {
            console.log("Error adding task:", error.response ? error.response.data : error.message);
            alert('Error while adding task!');
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className={styles.card}>
            <h2 onClick={toggleFormVisibility} style={{ cursor: 'pointer' }}>
                {isFormVisible ? (<FontAwesomeIcon icon={faMinus}/>) : (<FontAwesomeIcon icon={faPlus}/>) } Add new task
            </h2>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} required></textarea>
                    <label htmlFor="checklist">Checklist:</label>
                    <textarea id="checklist" placeholder="Checklist (coma-separated)" value={checklist} onChange={e => setChecklist(e.target.value)} required></textarea>
                    <div>
                        <label htmlFor="difficulty">Difficulty:</label><br></br>
                        <input type="radio" id="trivial" name="difficulty" value="Trivial" checked={difficulty === "Trivial"} onChange={e => setDifficulty(e.target.value)} required/>
                        <label htmlFor="trivial"> Trivial </label>
                        <input type="radio" id="easy" name="difficulty" value="Easy" checked={difficulty === "Easy"} onChange={e => setDifficulty(e.target.value)} required/>
                        <label htmlFor="easy"> Easy </label>
                        <input type="radio" id="medium" name="difficulty" value="Medium" checked={difficulty === "Medium"} onChange={e => setDifficulty(e.target.value)} required/>
                        <label htmlFor="medium"> Medium </label>
                        <input type="radio" id="hard" name="difficulty" value="Hard" checked={difficulty === "Hard"} onChange={e => setDifficulty(e.target.value)} required/>
                        <label htmlFor="hard"> Hard </label>
                    </div>
                    <label htmlFor="dueDate">Due date:</label>
                    <input type="date" id="dueDate" name="dueDate" min={new Date().toISOString().split('T')[0]} value={dueDate} onChange={e => setDueDate(e.target.value)} required/>
                    <div>
                        <label htmlFor="status">Status:</label><br></br>
                        <input type="radio" id="notStartedYet" name="status" value="Not started yet" checked={status === "Not started yet"} onChange={e => setStatus(e.target.value)} required/>
                        <label htmlFor="notStartedYet"> Not started yet </label>
                        <input type="radio" id="inProgress" name="status" value="In progress" checked={status === "In progress"} onChange={e => setStatus(e.target.value)} required/>
                        <label htmlFor="inProgress"> In Progress </label>
                        <input type="radio" id="finished" name="status" value="Finished" checked={status === "Finished"} onChange={e => setStatus(e.target.value)} required/>
                        <label htmlFor="finished"> Finished </label>
                        <input type="radio" id="throwed" name="status" value="Throwed" checked={status === "Throwed"} onChange={e => setStatus(e.target.value)} required/>
                        <label htmlFor="throwed"> Throwed </label>
                    </div>
                    <div className={styles.buttonCenter}>
                        <button type="submit" className={styles.buttonSubmit}>Add task</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TaskForm;
