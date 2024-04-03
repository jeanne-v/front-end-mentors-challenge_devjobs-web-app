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

  function handleFilterSubmit(e) {
    e.preventDefault();
    const filterData = new FormData(e.target);
    const titleFilter = filterData.get("title");

    if (titleFilter) {
      setSearchParams({ title: titleFilter });
    } else {
      setSearchParams({});
    }

    setMaxNumberOfDisplayedJobs(12);
  }

  function loadMoreJobs() {
    setMaxNumberOfDisplayedJobs((prevValue) => prevValue + 12);
  }

  const titleFilter = searchParams.get("title");

  let relevantJobs;

  if (titleFilter) {
    relevantJobs = allJobs.filter((job) => {
      return job.position.toLowerCase().includes(titleFilter.toLowerCase());
    });
  } else {
    relevantJobs = allJobs;
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
