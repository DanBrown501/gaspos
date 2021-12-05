import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../../api";
import { useParams, Redirect, useHistory } from "react-router-dom";
import Header from "../Header";
import CompanyCard from "../Companies/CompanyCard";
import ProtectedRoute from "../Auth/ProtectedRoute";
import AuthContext from "../Auth/authContext";
import { ArrowSquareDown } from "phosphor-react";
import JobDetail from "./JobDetail";

const Job = () => {
  const history = useHistory();
  const { currUser } = useContext(AuthContext);
  const [job, setJob] = useState({
    title: "",
    salary: "",
    equity: "",
    company: { name: "" },
  });

  const { id } = useParams();

  useEffect(() => {
    const getJob = async (id) => {
      try {
        const res = await JoblyApi.getJob(id);
        setJob(res);
      } catch (e) {
        history.push("/missing");
      }
    };

    getJob(id);
    return () => {};
  }, []);

  return (
    <>
      {currUser.username ? (
        <div className="bg-gray-100">
          {/*           <Header
            title={job.title}
            category="Job"
            description={job.company.name}
          /> */}

          <div className="relative pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:pt-10 lg:pb-20">
            <JobDetail
              title={job.title}
              companyName={job.company.name}
              salary={job.salary}
              equity={job.equity}
            />
            {/*  <div className="mb-4 lg:mb-6 shadow-xl text-white rounded-2xl bg-gradient-to-r from-deep-purple-accent-200 via-deep-purple to-purple-200 px-4 py-2  lg:py-4 font-mono rounded flex flex-col sm:items-center justify-center  w-64 sm:mx-auto">
              <p>
                <CreditCard className="inline-block" size={34} />
                Salary: £{job.salary.toLocaleString()}
              </p>
              <p>
                <ChartPieSlice className="inline-block" size={32} />
                Equity: {job.equity ? job.equity : "N/A"}
              </p>
            </div> */}
            <div className="flex items-center justify-center mb-4 font-medium text-gray-500">
              <span className="inline-block">
                {" "}
                <ArrowSquareDown
                  className="text-deep-purple-accent-400"
                  size={34}
                />
              </span>
              Find out more about employer {" "}
              <span className="font-mono text-black">{job.company.name}</span>{" "}
              <span className="inline-block">
                {" "}
                <ArrowSquareDown
                  className="text-deep-purple-accent-400"
                  size={34}
                />
              </span>
            </div>

            <CompanyCard company={job.company} />
          </div>
        </div>
      ) : (
        <ProtectedRoute />
      )}
    </>
  );
};

export default Job;
