import React, { useEffect, useState } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import CircleSVG from "./CircleSVG";
import Header from "../Header";
import FilterCompaniesForm from "./FilterCompaniesForm";
import { v4 as uuid } from "uuid";
import Spinner from "../FormComponents/Spinner";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoMatch, setHasNoMatch] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  //effect to filter companies based on search criteria
  useEffect(() => {
    const getCompanies = async (criteria) => {
      try {
        setErrorMsgs(false);
        setHasNoMatch(false);
        //remove empty strings from criteria, which would otherwise throw server error
        setIsLoading(true);
        const cleanedCriteria = {};
        for (const property in criteria) {
          if (criteria[property] != "") {
            cleanedCriteria[property] = criteria[property];
          }
        }
        const res = await JoblyApi.getCompanies(cleanedCriteria);
        if (res.length === 0) {
          setHasNoMatch(true);
        }
        setCompanies(res);
        setIsLoading(false);
      } catch (e) {
        setErrorMsgs(e);
        setIsLoading(false);
      }
    };

    getCompanies(filterCriteria);
    return () => {};
  }, [filterCriteria]);

  const addFilterCriteria = (formData) => {
    setFilterCriteria(formData);
  };

  return (
    <div className="bg-gray-100">
      <Header
        title="Currently Recruiting"
        category="employers"
        description="All employers listed below are currently advertising open positions. Browse through the selection to find your dream job."
      />
      <div className="relative px-4 pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-0 lg:pb-20">
        {/*         <CircleSVG />
         */}{" "}
        <FilterCompaniesForm addFilterCriteria={addFilterCriteria} />
        <div className="font-xl font-mono text-center">
          {isLoading && <Spinner />}
        </div>
        {hasNoMatch && (
          <div className="text-center font-mono">
            Oops! Your search didn't return any matches.
          </div>
        )}
        {errorMsgs.length > 0 && (
          <div className="text-center font-mono text-red-400 pb-10">
            Ooops! One of your search terms is invalid. Try again.{" "}
          </div>
        )}
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((c) => (
            <CompanyCard company={c} key={uuid()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
