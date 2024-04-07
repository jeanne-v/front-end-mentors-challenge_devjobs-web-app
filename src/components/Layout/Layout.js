import { useEffect, useState } from "react";
import { createContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";

import "./Layout.css";

export const ThemeContext = createContext();

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`container ${theme}-theme`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
}
