import { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../Layout/Layout";
import { useSearchParams } from "react-router-dom";
import useViewportWidth from "../../hooks/useViewportWidth";
import Modal from "./Modal";
import filterIconLight from "../../assets/icon-filter-light.svg";
import filterIconDark from "../../assets/icon-filter-dark.svg";
import "./Filter.css";

export default function Filter() {
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const width = useViewportWidth();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isModalOpen) {
    document.body.style.position = "fixed";
  } else {
    document.body.style.position = "static";
  }

  // keep filter form values in sync with params
  useEffect(() => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
      const key = input.name;
      const value = input.value;
      if (input.type === "checkbox") {
        if (!!searchParams.get(key) !== input.checked) {
          input.checked = !!searchParams.get(key);
        }
      } else {
        if (searchParams.get(key) !== value)
          input.value = searchParams.get(key);
      }
    });
  }, [searchParams, isModalOpen]);

  // change url params to match filter form values
  function commitFilterChange(e) {
    const value = e.target.value;
    const key = e.target.name;
    const checked = e.target.checked;
    setSearchParams((prevParams) => {
      if (key === "fullTimeOnly") {
        if (checked) {
          prevParams.set(key, checked);
        } else {
          prevParams.delete(key);
        }
      } else {
        if (value) {
          prevParams.set(key, value);
        } else {
          prevParams.delete(key);
        }
      }

      return prevParams;
    });
  }

  // trigger blur event (and thus commitFilterChange function) when
  // pressing enter inside search field
  function handleKeyUp(e) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`filter-bar filter-bar--${theme}`}
      id="filter-form"
    >
      <div className="filter-bar__input-container">
        <input
          className="filter-bar__search-input filter-bar__search-input--title"
          type="search"
          placeholder="Filter by title..."
          name="position"
          onBlur={commitFilterChange}
          onKeyUp={handleKeyUp}
        />
      </div>

      {width < 700 ? (
        <button
          type="button"
          className="filter-bar__modal-open-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            alt="filter results"
            src={theme === "light" ? filterIconLight : filterIconDark}
          />
        </button>
      ) : (
        <>
          <div className="filter-bar__input-container">
            <input
              className="filter-bar__search-input filter-bar__search-input--location"
              type="search"
              name="location"
              placeholder="Filter by location..."
              onBlur={commitFilterChange}
              onKeyUp={handleKeyUp}
            />
          </div>

          <div>
            <div className="filter-bar__checkbox-container">
              <input
                id="full-time"
                type="checkbox"
                className="filter-bar__checkbox"
                onChange={commitFilterChange}
                name="fullTimeOnly"
              />
              <label htmlFor="full-time" className="filter-bar__checkbox-label">
                Full Time Only
              </label>
            </div>
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
              onBlur={commitFilterChange}
              onKeyUp={handleKeyUp}
            />

            <div className="modal__bottom">
              <div className="filter-bar__checkbox-container">
                <input
                  id="full-time"
                  type="checkbox"
                  className="filter-bar__checkbox"
                  onChange={commitFilterChange}
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
                type="button"
                form="filter-form"
                className="filter-bar__search-btn"
                onClick={() => setIsModalOpen(false)}
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
