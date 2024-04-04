import { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../Layout/Layout";
import { useSearchParams } from "react-router-dom";
import useViewportWidth from "../../hooks/useViewportWidth";
import Modal from "./Modal";
import filterIconLight from "../../assets/icon-filter-light.svg";
import filterIconDark from "../../assets/icon-filter-dark.svg";
import searchIconWhite from "../../assets/icon-search-white.svg";
import "./Filter.css";

export default function Filter({ handleSubmit }) {
  const firstRender = useRef(true);
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const width = useViewportWidth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState({
    position: "",
    location: "",
    fullTimeOnly: false,
  });

  if (isModalOpen) {
    document.body.style.position = "fixed";
  } else {
    document.body.style.position = "static";
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (searchParams.size === 0) {
        setFilterData({
          position: "",
          location: "",
          fullTimeOnly: false,
        });
      }
    }
  }, [searchParams]);

  function handleChange(e) {
    setFilterData((prevData) => {
      return {
        ...prevData,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  }

  return (
    <form
      className={`filter-bar filter-bar--${theme}`}
      onSubmit={(e) => {
        handleSubmit(e, filterData);
        setIsModalOpen(false);
      }}
      id="filter-form"
    >
      <div className="filter-bar__input-container">
        <input
          className="filter-bar__search-input filter-bar__search-input--title"
          type="search"
          placeholder="Filter by title..."
          name="position"
          value={filterData.position}
          onChange={handleChange}
        />
      </div>

      {width < 700 ? (
        <div className="filter-bar__mobile-btns">
          <button
            type="button"
            className="filter-bar__modal-open-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={theme === "light" ? filterIconLight : filterIconDark} />
          </button>

          <button
            className="filter-bar__search-btn filter-bar__search-btn--icon"
            type="submit"
          >
            <img src={searchIconWhite} />
          </button>
        </div>
      ) : (
        <>
          <div className="filter-bar__input-container">
            <input
              className="filter-bar__search-input filter-bar__search-input--location"
              type="search"
              name="location"
              placeholder="Filter by location..."
              value={filterData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="filter-bar__checkbox-container">
              <input
                id="full-time"
                type="checkbox"
                className="filter-bar__checkbox"
                checked={filterData.fullTimeOnly}
                onChange={handleChange}
                name="fullTimeOnly"
              />
              <label htmlFor="full-time" className="filter-bar__checkbox-label">
                Full Time
              </label>
            </div>

            <button
              type="submit"
              form="filter-form"
              className="filter-bar__search-btn"
            >
              Search
            </button>
          </div>
        </>
      )}

      {isModalOpen &&
        width < 700 &&
        createPortal(
          <Modal closeModal={() => setIsModalOpen(false)}>
            <input
              className="filter-bar__search-input filter-bar__search-input--location"
              type="search"
              name="location"
              placeholder="Filter by location"
              form="filter-form"
              value={filterData.location}
              onChange={handleChange}
            />

            <div className="modal__bottom">
              <div className="filter-bar__checkbox-container">
                <input
                  id="full-time"
                  type="checkbox"
                  className="filter-bar__checkbox"
                  checked={filterData.fullTimeOnly}
                  onChange={handleChange}
                  name="fullTimeOnly"
                />
                <label
                  htmlFor="full-time"
                  className="filter-bar__checkbox-label"
                >
                  Full Time Only
                </label>
              </div>

              <button
                type="submit"
                form="filter-form"
                className="filter-bar__search-btn"
              >
                Search
              </button>
            </div>
          </Modal>,
          document.body
        )}
    </form>
  );
}
