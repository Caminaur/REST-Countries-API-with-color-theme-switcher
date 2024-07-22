import React from "react";
import styles from "./CountryCard.module.css";
import { Link, Route, Router, Routes } from "react-router-dom";

function CountryCard(props) {
  const { flag } = props;
  return (
    <Link to={`flag/${flag.alpha3Code}`}>
      <div className={styles.card}>
        <img src={flag.img} alt="" />
        <div className={styles.info}>
          <p className={styles.title}>{flag.name}</p>
          <p>
            <span>Population: </span>
            {flag.population}
          </p>
          <p>
            <span>Region: </span>
            {flag.region}
          </p>
          <p>
            <span>Capital: </span>
            {flag.capital}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
