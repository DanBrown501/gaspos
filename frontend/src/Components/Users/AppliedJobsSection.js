import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../Auth/authContext";
import JobCard from "../Jobs/JobCard";
import JoblyApi from "../../api";
import { v4 as uuid } from "uuid";
import JobsContext from "../Jobs/jobsContext";

const AppliedJobsSection = () => {
  const { currUser } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const { applications } = useContext(JobsContext);

  //when applications changes (state in app, shared via context)
  //below effect uses applications array to retrieve all jobs

  useEffect(() => {
    const getJobs = async () => {
      const pArr = applications.map((id) => JoblyApi.getJob(id));
      const jobs = await Promise.all(pArr);
      setJobs(jobs);
    };

    getJobs();
  }, [applications]);

  return (
    <>
      <div>
        <h2 className="text-center font-mono text-4xl my-20">
          My Evaluation
        </h2>
      </div>
      <div className="relative px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-0 lg:pb-20">
        <div className="relative grid gap-5 lg:grid-cols-1">
          {jobs.map((app) => (
            <JobCard key={uuid()} job={app} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppliedJobsSection;
