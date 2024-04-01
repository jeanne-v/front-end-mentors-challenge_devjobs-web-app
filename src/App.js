import { useState } from "react";
import { createContext } from "react";
import Header from "./components/Header/Header";
import Job from "./components/Job/Job";
import data from "./data.json";
import "./App.css";

export const ThemeContext = createContext();

export default function App() {
  const [jobs, setJobs] = useState(data.slice(0, 12));
  const [hasLoadedAllJobs, setHasLoadedAllJobs] = useState(false);
  const [theme, setTheme] = useState("light");

  function loadMore() {
    const newJobs = data.slice(12);

    setJobs((prevJobs) => {
      return [...prevJobs, ...newJobs];
    });

    setHasLoadedAllJobs(true);
  }

  return (
    <div className={`container container--${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <main className="jobs-page__main">
          <div className="jobs-container">
            {jobs.map((job) => {
              return <Job key={job.id} data={job} />;
            })}
          </div>

          {hasLoadedAllJobs ? null : (
            <button onClick={loadMore} className="jobs-page__btn">
              Load more
            </button>
          )}
        </main>
      </ThemeContext.Provider>
    </div>
  );
}
