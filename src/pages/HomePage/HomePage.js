import { useState } from "react";
import Job from "../../components/Job/Job";
import data from "../../data.json";
import "./HomePage.css";

export default function HomePage() {
  const [jobs, setJobs] = useState(data.slice(0, 12));
  const [hasLoadedAllJobs, setHasLoadedAllJobs] = useState(false);

  function loadMore() {
    const newJobs = data.slice(12);

    setJobs((prevJobs) => {
      return [...prevJobs, ...newJobs];
    });

    setHasLoadedAllJobs(true);
  }

  return (
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
  );
}
