import React, { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";

const FilterCompaniesForm = ({ addFilterCriteria }) => {
  const initialState = { name: "", minEmployees: "", maxEmployees: "" };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFilterCriteria(formData);
    setFormData(initialState);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-10  mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="company name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-accent-400 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="minEmployees"
                className="leading-7 text-sm text-gray-600"
              >
                Minimum Employees Number
              </label>
              <input
                type="text"
                id="minEmployees"
                name="minEmployees"
                placeholder="minimum employees"
                value={formData.minEmployees}
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-accent-400 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
            <div className="relative flex-grow w-full">
              <label
                htmlFor="maxEmployees"
                className="leading-7 text-sm text-gray-600"
              >
                Maximum Employees Number
              </label>
              <input
                type="text"
                id="maxEmployees"
                name="maxEmployees"
                placeholder="maximum employees"
                value={formData.maxEmployees}
                onChange={handleChange}
                className=" w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-accent-400 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <button className="z-40 mx-auto h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
              Filter{" "}
              <MagnifyingGlass
                size={30}
                className="inline-flex items-baseline"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FilterCompaniesForm;
