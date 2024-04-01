import { useState } from "react";
import { createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import "./Layout.css";

export const ThemeContext = createContext();

export default function Layout() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`container container--${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
}
