import { useState } from "react";
import Job from "./components/Job/Job";
import data from "./data.json";
import "./App.css";

export default function App() {
  const [jobs, setJobs] = useState(data);
  return (
    <main>
      <div className="jobs-container">
        {jobs.map((job) => {
          return <Job key={job.id} data={job} />;
        })}
      </div>
    </main>
  );
}
