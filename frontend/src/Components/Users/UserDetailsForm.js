import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Auth/authContext";
import JoblyApi from "../../api";
import SuccessAlert from "../FormComponents/SuccessAlert";
import Spinner from "../FormComponents/Spinner";
import FormErrorHandler from "../FormComponents/FormErrorHandler";

const UserDetailsForm = () => {
  const { currUser } = useContext(AuthContext);
  const [formData, setFormData] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tryEdit = async () => {
      console.log("TRYING");
      try {
        setErrorMsgs([]);
        await JoblyApi.edit(currUser.username, formData);
        setSubmitting(true);

        setTimeout(() => {
          setSubmitting(false);
          setDisplaySuccess(true);
        }, 2000);

        setTimeout(() => {
          setDisplaySuccess(false);
        }, 5000);
      } catch (e) {
        console.log("CAUGHT ERROR", e);
        setErrorMsgs(e);
      }
    };
    tryEdit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-mono font-bold text-center mb-5 text-l">
        Edit User Information
      </h3>

      <div className="mb-1 sm:mb-2">
        <label htmlFor="email" className="inline-block mb-1 font-medium">
          Email
        </label>
        <input
          placeholder={currUser.email}
          required
          type="text"
          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4 mb-1 sm:mb-2">
        <div>
          <label htmlFor="firstName" className="inline-block mb-1 font-medium">
            First Name
          </label>
          <input
            placeholder={currUser.firstName}
            required
            type="text"
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="lastName" className="inline-block mb-1 font-medium">
            Last Name
          </label>
          <input
            placeholder={currUser.lastName}
            required
            type="text"
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-1 sm:mb-2">
        <p className="text-xs text-gray-600 sm:text-sm">
          Confirm changes by entering password
        </p>
        <label htmlFor="password" className="inline-block mb-1 font-medium">
          Password
        </label>
        <input
          placeholder="********"
          required
          type="password"
          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 mb-8 sm:mb-8">
        <FormErrorHandler errorMsgs={errorMsgs} />
        <button
          type="submit"
          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
        >
          Accept Changes??
        </button>
      </div>
      {submitting && <Spinner />}
      {displaySuccess && (
        <SuccessAlert msg="User information has been successfully updated. Rejoice!" />
      )}
    </form>
  );
};

export default UserDetailsForm;
