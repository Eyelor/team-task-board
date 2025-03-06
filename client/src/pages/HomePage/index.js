import React from 'react';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import styles from "./styles.module.css";

const HomePage = ({ currentUser }) => {
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.column+' '+styles.left}>
                    <h1>Add task to your team board</h1>
                    {currentUser ? (
                        <div>
                            <TaskForm />
                        </div>
                    ) : (
                        <p>Log in to add task to your team board</p>
                    )}
                </div>
                <div className={styles.column+' '+styles.right}>
                    <h1>Team Board</h1>
                    <TaskList currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
