import React from "react";
import styles from "./SearchBar.module.css";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

function SearchBar() {
  const submit = useSubmit();
  const { q, region } = useLoaderData();
  return (
    <div className={styles.searchBar}>
      <div>
        <Form role="search">
          <div className={styles.searchInputDiv}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              id="search"
              onChange={(e) => {
                document.getElementById("regionId").value = "";
                submit(e.currentTarget.form);
              }}
              name="q"
              type="text"
              defaultValue={q}
              placeholder="Search for a Country"
            />
          </div>
        </Form>
        <Form>
          <div className={styles.dropdownFilter}>
            <select
              id="regionId"
              onChange={(e) => {
                document.getElementById("search").value = "";
                submit(e.currentTarget.form);
              }}
              name="region"
              defaultValue={region}
            >
              <option value="">Filter by region</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Africa">Africa</option>
            </select>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SearchBar;
