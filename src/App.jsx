import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const [theme, setTheme] = useState("dark");

  function handleThemeChange() {
    const newTheme = theme == "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }
  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div className="main" data-theme={theme}>
      <Navbar theme={theme} handleThemeChange={handleThemeChange} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
