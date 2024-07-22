import React, { Component } from "react";
import styles from "./Footer.module.css";

export class Footer extends Component {
  render() {
    return (
      <div className={styles.attribution}>
        {`Challenge by `}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        <br />
        Coded by <a href="https://github.com/Caminaur">Julian Caminaur</a>
      </div>
    );
  }
}

export default Footer;
