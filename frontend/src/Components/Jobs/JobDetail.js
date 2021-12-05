import React from "react";
import "./JobDetail.css";
import AuthContext from "../Auth/authContext";
import { Buildings, CreditCard, ChartPieSlice } from "phosphor-react";

const JobDetail = ({ title, companyName, salary, equity }) => {
  return (
    <div className="JobDetail mb-10 md:leading-loose p-10  md:rounded">
      <h2 className="mx-auto px-2 w-3/6 md:w-4/12 lg:w-2/12 py-2 bg-white rounded bg-opacity-50 text-black mb-5 text-center font-mono font-bold text-2xl">
        Job Details
      </h2>
      <div className="grid grid-cols-1 gap-10">
        <div className="text-sm md:w-8/12 lg:w-4/12 mx-auto flex flex-col justify-center bg-white rounded bg-opacity-50 p-5 rounded shadow-xl">
          {" "}
          <h3 className="opacity-100 mb-3">
            <span className="text-lg font-mono font-bold">{title}</span>{" "}
          </h3>
          <p>
            <CreditCard className="inline-block" size={25} /> Salary: £
            {salary.toLocaleString()}
          </p>
          <p>
            {" "}
            <ChartPieSlice className="inline-block" size={25} />
             Equity: {equity ? equity : "N/A"}
          </p>
          <p>
            <Buildings className="inline-block " size={25} />
             Company Name: {companyName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
