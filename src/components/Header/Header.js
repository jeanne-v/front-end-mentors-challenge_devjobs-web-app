import { useContext } from "react";
import { ThemeContext } from "../../App";
import logo from "../../assets/logo.svg";
import sunIcon from "../../assets/icon-sun.svg";
import moonIcon from "../../assets/icon-moon.svg";
import "./Header.css";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header__content">
        <a href="#">
          <img src={logo} className="header__logo" />
        </a>

        <div className="header__mode-toggle">
          <button
            className="header__mode-btn"
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              }
            }}
          >
            <img src={sunIcon} />
          </button>

          <button
            className={`header__toggle header__toggle--${theme}`}
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            <div className="header__toggle-circle"></div>
          </button>

          <button
            className="header__mode-btn"
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
              }
            }}
          >
            <img src={moonIcon} />
          </button>
        </div>
      </div>
    </header>
  );
}
