import { useState } from "react";
import { createContext } from "react";
import Header from "./components/Header/Header";
import Job from "./components/Job/Job";
import data from "./data.json";
import "./App.css";

export const ThemeContext = createContext();

export default function App() {
  const [jobs, setJobs] = useState(data);

  const [theme, setTheme] = useState("light");

  return (
    <div className={`container container--${theme}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <main>
          <div className="jobs-container">
            {jobs.map((job) => {
              return <Job key={job.id} data={job} />;
            })}
          </div>
        </main>
      </ThemeContext.Provider>
    </div>
  );
}
