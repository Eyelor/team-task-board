import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ currentUser, onLogout }) => {
    return (
        <div className={styles.divNav}>
            <nav>
                <Link to="/"><FontAwesomeIcon icon={faClipboardCheck} className={styles.icon} /> <b className={styles.title}>TEAM TASK BOARD</b> </Link>
                {currentUser ? (
                    <div className={styles.navRight}>
                        <span>Hi, {currentUser.name}. Your team counts on you!</span>
                        <button onClick={onLogout}>Log out</button>
                    </div>
                ) : (
                    <div className={styles.navRight}>
                        <Link to="/login"><button>Log in</button></Link>
                        <Link to="/register"><button>Sign in</button></Link>
                    </div>
                )}
            </nav>
        </div>
        
    );
};

export default Navbar;
