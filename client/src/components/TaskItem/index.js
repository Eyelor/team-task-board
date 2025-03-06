import React, { useState } from 'react';
import styles from "./styles.module.css";

const TaskItem = ({ task, onDelete, onEdit, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...task });

    const handleDelete = () => {
        onDelete(task._id);
        alert("Task deleted successfully!");
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = () => {
        if (typeof editedData.checklist === 'string') {
            editedData.checklist = editedData.checklist.split(',');
        }
        onEdit(task._id, editedData);
        window.location.reload();
        setIsEditing(false);
        alert("Task edited successfully!");
    };

    const getBorderColor = (status) => {
        switch (status) {
            case 'Not started yet':
                return 'blue';
            case 'In progress':
                return 'yellow';
            case 'Finished':
                return 'green';
            case 'Throwed':
                return 'red';
            default:
                return '#9754cb';
        }
    };

    let isAuthor = false;

    if (currentUser) {
        try {
            isAuthor = task.authorId === currentUser.id;
        } catch (error) {
            console.error("Error while checking task author:", error);
        }
    }
    
    const checklistArray = task.checklist;

    return (
        <div className={styles.card} style={{ borderLeft: `10px solid ${getBorderColor(task.status)}` }}>
            {isEditing ? (
                <div className={styles.form}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={editedData.title} onChange={handleChange} required/>
                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" name="notes" value={editedData.notes} onChange={handleChange} required/>
                    <label htmlFor="checklist">Checklist:</label>
                    <textarea id="checklist" name="checklist" value={editedData.checklist} onChange={handleChange} required/>
                    <div>
                        <label htmlFor="difficulty">Difficulty:</label><br></br>
                        <input type="radio" id="trivial" name="difficulty" value="Trivial" checked={editedData.difficulty === "Trivial"} onChange={handleChange} required/>
                        <label htmlFor="trivial"> Trivial </label>
                        <input type="radio" id="easy" name="difficulty" value="Easy" checked={editedData.difficulty === "Easy"} onChange={handleChange} required/>
                        <label htmlFor="easy"> Easy </label>
                        <input type="radio" id="medium" name="difficulty" value="Medium" checked={editedData.difficulty === "Medium"} onChange={handleChange} required/>
                        <label htmlFor="medium"> Medium </label>
                        <input type="radio" id="hard" name="difficulty" value="Hard" checked={editedData.difficulty === "Hard"} onChange={handleChange} required/>
                        <label htmlFor="hard"> Hard </label>
                    </div>
                    <label htmlFor="dueDate">Due date:</label>
                    <input type="date" id="dueDate" name="dueDate" min={new Date().toISOString().split('T')[0]} value={new Date(editedData.dueDate).toISOString().split('T')[0]} onChange={handleChange} required/>
                    <div>
                        <label htmlFor="status">Status:</label><br></br>
                        <input type="radio" id="notStartedYet" name="status" value="Not started yet" checked={editedData.status === "Not started yet"} onChange={handleChange} required/>
                        <label htmlFor="notStartedYet"> Not started yet </label>
                        <input type="radio" id="inProgress" name="status" value="In progress" checked={editedData.status === "In progress"} onChange={handleChange} required/>
                        <label htmlFor="inProgress"> In Progress </label>
                        <input type="radio" id="finished" name="status" value="Finished" checked={editedData.status === "Finished"} onChange={handleChange} required/>
                        <label htmlFor="finished"> Finished </label>
                        <input type="radio" id="throwed" name="status" value="Throwed" checked={editedData.status === "Throwed"} onChange={handleChange} required/>
                        <label htmlFor="throwed"> Throwed </label>
                    </div>
                    <div className={styles.buttonCenter}>
                        <button onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>{task.title}</h2>
                    <p className={styles.italic}>{task.notes}</p>
                    <p>Due date: {new Date(task.dueDate).toLocaleString().split(',')[0]}</p>
                    <p>Checklist:</p>
                    <ul>
                        {checklistArray.map((item, index) => (
                            <li className={styles.listItem} key={index}>{item}</li>
                        ))}
                    </ul>
                    <p>Difficulty: {task.difficulty}</p>
                    <p>Status: {task.status}</p>
                    <p>Author: {task.author}</p>
                    <p>Added: {new Date(task.createdAt).toLocaleString()}</p>
                    {isAuthor && (
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;
