import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import Job from "../../components/Job/Job";
import data from "../../data.json";
import "./HomePage.css";

export default function HomePage() {
  const allJobs = data;
  const [maxNumberOfDisplayedJobs, setMaxNumberOfDisplayedJobs] = useState(12);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilterSubmit(e, filterFormData) {
    e.preventDefault();
    // set the search params to match the values of the filter form
    for (let [key, value] of Object.entries(filterFormData)) {
      setSearchParams((prevParams) => {
        if (value) {
          prevParams.set(key, value);
        } else {
          prevParams.delete(key);
        }
        return prevParams;
      });
    }

    setMaxNumberOfDisplayedJobs(12);
  }

  function loadMoreJobs() {
    setMaxNumberOfDisplayedJobs((prevValue) => prevValue + 12);
  }

  let relevantJobs;

  if (searchParams.size === 0) {
    relevantJobs = allJobs;
  } else {
    relevantJobs = allJobs.filter((job) => {
      let doesJobMatch = true;

      // compare job details with search params
      for (let [key, value] of searchParams.entries()) {
        if (key === "fullTimeOnly") {
          if (job.contract !== "Full Time") {
            doesJobMatch = false;
          }
        } else {
          if (!job[key].toLowerCase().includes(value.toLowerCase())) {
            doesJobMatch = false;
          }
        }
      }
      return doesJobMatch;
    });
  }

  return (
    <main className="jobs-page__main">
      <Filter handleSubmit={handleFilterSubmit} />

      <div className="jobs-container">
        {relevantJobs.slice(0, maxNumberOfDisplayedJobs).map((job) => {
          return <Job key={job.id} data={job} />;
        })}
      </div>

      {maxNumberOfDisplayedJobs < relevantJobs.length ? (
        <button onClick={loadMoreJobs} className="jobs-page__btn">
          Load more
        </button>
      ) : null}
    </main>
  );
}
