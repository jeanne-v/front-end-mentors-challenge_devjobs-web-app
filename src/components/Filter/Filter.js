import { useContext } from "react";
import { ThemeContext } from "../Layout/Layout";
import filterIconLight from "../../assets/icon-filter-light.svg";
import filterIconDark from "../../assets/icon-filter-dark.svg";
import searchIconWhite from "../../assets/icon-search-white.svg";
import "./Filter.css";

export default function Filter({ handleSubmit }) {
  const { theme } = useContext(ThemeContext);

  return (
    <form
      className={`filter-bar filter-bar--${theme}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="filter-bar__search-input filter-bar__search-input--title"
        type="search"
        placeholder="Filter by title..."
        name="title"
      />

      <div className="filter-bar__mobile-btn">
        <button type="button" className="filter-bar__modal-open-btn">
          <img src={theme === "light" ? filterIconLight : filterIconDark} />
        </button>

        <button
          className="filter-bar__search-btn filter-bar__search-btn--icon"
          type="submit"
        >
          <img src={searchIconWhite} />
        </button>
      </div>
    </form>
  );
}
