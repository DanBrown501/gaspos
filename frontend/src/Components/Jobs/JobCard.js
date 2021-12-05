import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import JoblyApi from "../../api";
import AuthContext from "../Auth/authContext";
import RegularBtn from "./RegularBtn";
import AppliedBtn from "./AppliedBtn";
import JobsContext from "./jobsContext";

const JobCard = ({ job }) => {
  //fake logos: generate random num between 1-26 to select from logos served in public
  const [randNum, setRandNum] = useState(0);
  const { currUser, setCurrUser } = useContext(AuthContext);
  const { applications, setApplications } = useContext(JobsContext);
  const history = useHistory();

  useEffect(() => {
    const num = Math.floor(Math.random() * 26) + 1;
    setRandNum(num);
    return () => {};
  }, []);

  //call API and "apply" in DB
  //also trigget applications state change
  //which will rerender jobs section in profile & trigger effect to update local storage
  const handleApply = (e) => {
    if (!applications.includes(job.id)) {
      const sendApplication = async () => {
        const jobId = await JoblyApi.apply(currUser.username, job.id);
        setApplications([...applications, job.id]);
      };
      sendApplication();
    } else {
      console.log("already applied");
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
      <div className="flex items-center justify-between p-5">
        <div>
          <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
            <img src={`../Logos/${randNum}.png`}></img>
          </div>
          <Link to={`/jobs/${job.id}`}>
            <p className="mb-2 font-bold font-mono underline">{job.title}</p>
          </Link>

          {job.companyName && (
            <p className="text-sm leading-5 text-gray-900 italic">
              Company:{" "}
              <Link to={`/companies/${job.companyHandle}`}>
                <span className="font-normal not-italic underline">
                  {job.companyName}
                </span>
              </Link>
            </p>
          )}
          <p className="mb-1 text-sm leading-5 text-gray-900 italic">
            Salary:{" "}
            <span className="font-normal not-italic">
              {job.salary ? `£ ${job.salary.toLocaleString("en-US")}` : " N/A"}
            </span>
          </p>
          <p className="text-sm leading-5 text-gray-900 italic">
            Equity:{" "}
            <span className="font-normal not-italic">
              {job.equity ? job.equity : "N/A"}
            </span>
          </p>
        </div>
        {applications.includes(job.id) ? (
          <AppliedBtn />
        ) : (
          <RegularBtn handleApply={handleApply} />
        )}
      </div>
      <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
    </div>
  );
};

export default JobCard;
