import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from '../TaskItem';

const TaskList = ({ currentUser }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5555/api/tasks');
            const sortedTasks = response.data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setTasks(sortedTasks);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/api/tasks/${id}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error while adding task:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = async (id, updatedTask) => {
        try {
            await axios.put(`http://localhost:5555/api/tasks/${id}`, updatedTask, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
        } catch (error) {
            console.error("Error while updating task:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
};

export default TaskList;
