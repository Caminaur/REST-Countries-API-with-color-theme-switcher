import React from 'react'
import styles from './SearchBar.module.css'

function SearchBar(props) {
  const {filterByRegion,filterByName} = props;
  return (
    <div className={styles.searchBar}>
      <div>
        <div className={styles.searchInputDiv}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input onChange={(e)=>filterByName(e.target.value)} type="text" placeholder='Search for a Country'/>
        </div>
        <div className={styles.dropdownFilter}>
            <select onChange={(e)=>filterByRegion(e.target.value)} name="" id="">
                <option value="">Filter by region</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;