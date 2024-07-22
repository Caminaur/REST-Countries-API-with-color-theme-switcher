
import React from 'react'
import styles from './Navbar.module.css';
import { useState } from 'react';

function Navbar(props) {

    const {theme,handleThemeChange} = props;

  return (
    <header>
        <ul>
            <li><p className={styles.mainTitle}>Where in the World?</p></li>
            <li>
                <button className={styles.themeButton} onClick={handleThemeChange}>
                    <i className="fa-regular fa-moon"></i>
                    {(theme=="light") ? "Dark Mode" : "Light Mode"}
                </button>
            </li>
        </ul>
    </header>
  )
}

export default Navbar