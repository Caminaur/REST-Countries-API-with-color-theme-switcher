import React, { useContext, useEffect, useState } from "react";
import styles from "./Main.module.css";
import CountryCard from "../CountryCard/CountryCard";
import { FlagContext } from "../../App";
import SearchBar from "../SearchBar/SearchBar";

function Main() {
  const flags = useContext(FlagContext);

  const [filteredFlags, setFilteredFlags] = useState(flags);

  function filterByRegion(region) {
    const filteredByRegionCountries = flags.filter((flag) => {
      return flag.region === region;
    });
    setFilteredFlags(filteredByRegionCountries);
  }

  function filterByName(input) {
    input = input.toLowerCase().trim();

    const filteredByNameCountries = flags.filter((flag) => {
      return (
        flag.name.toLowerCase().includes(input) ||
        flag.nativeName.toLowerCase().includes(input)
      );
    });
    setFilteredFlags(filteredByNameCountries);
  }

  async function parseCountries(countries) {
    let newFlags = [];
    for (const country of countries) {
      let newCountry = {
        alpha3Code: country.alpha3Code,
        name: country.name,
        population: country.population,
        region: country.region,
        capital: country.capital,
        subregion: country.subregion,
        nativeName: country.nativeName,
        topLevelDomain: country.topLevelDomain,
        currencies: country.currencies,
        languages: country.languages,
        borderCountries: country.borders,
        img: country.flag,
      };

      newFlags = [...newFlags, newCountry];
    }
    return newFlags;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("../data.json");
        const data = await resp.json();
        const countriesParsed = await parseCountries(data);
        setFilteredFlags(countriesParsed);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <SearchBar filterByName={filterByName} filterByRegion={filterByRegion} />
      <div className={styles.outerLayer}>
        <div className={styles.content}>
          {filteredFlags.map((flag, index) => {
            return <CountryCard key={index} flag={flag} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Main;
