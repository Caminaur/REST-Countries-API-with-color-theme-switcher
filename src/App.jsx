import { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import Main from "./components/Main/Main";
import Flag from "./components/Flag/Flag";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

export const FlagContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  function handleThemeChange() {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  const [allFlags, setAllFlags] = useState([]);

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
        setAllFlags(countriesParsed);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="main" data-theme={theme}>
      <Navbar theme={theme} handleThemeChange={handleThemeChange} />
      <FlagContext.Provider value={allFlags}>
        <Outlet />
      </FlagContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
