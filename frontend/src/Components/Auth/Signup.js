import React, { useState, useContext } from "react";
import AuthContext from "./authContext";
import AuthSVG from "./AuthSVG";
import { Link, Redirect, useHistory } from "react-router-dom";
import Spinner from "../FormComponents/Spinner";
import SuccessAlert from "../FormComponents/SuccessAlert";
import FormErrorHandler from "../FormComponents/FormErrorHandler";

const Signup = () => {
  const initialState = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    countryCode: "",
    postalCode: ""
  };
  const [formData, setFormData] = useState(initialState);
  const { register, currUser } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const history = useHistory();
  const [errorMsgs, setErrorMsgs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tryToRegister = async (formData) => {
      try {
        setErrorMsgs([]);
        await register(formData);
        setFormData(initialState);
        setSubmitting(true);

        setTimeout(() => {
          setSubmitting(false);
          setDisplaySuccess(true);
        }, 2000);

        setTimeout(() => {
          history.push("/login");
        }, 5000);
      } catch (e) {
        setErrorMsgs(e);
      }
    };

    tryToRegister(formData);
  };

  return (
    <>
      {currUser.username ? <Redirect to="/" /> : null}
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center sm:px-5 py-2">
        <div className="w-11/12 sm:w-8/12 bg-gray-100 text-gray-500 rounded-3xl shadow-xl  overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-teal-400 py-10 px-10">
              <AuthSVG />
            </div>
            <div className="w-full md:w-1/2 py-8 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Sign Up</h1>
                <p>Enter your information to sign up</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <label
                      htmlFor="username"
                      className="text-xs font-semibold px-1"
                    >
                      Username
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Joe"
                        onChange={handleChange}
                        name="username"
                        value={formData.username}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-3">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold px-1"
                    >
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="********"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold px-1"
                    >
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="sales@gaspos.co"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-semibold px-1"
                    >
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Joe"
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-semibold px-1"
                    >
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Example"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-semibold px-1"
                    >
                      Birth Date
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="07/04/1776"
                        name="birthDate"
                        onChange={handleChange}
                        value={formData.birthDate}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-semibold px-1"
                    >
                      Phone Number
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="281-330-8004"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={formData.phoneNumber}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <label
                      htmlFor="address"
                      className="text-xs font-semibold px-1"
                    >
                      Address
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="address"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="sales@gaspos.co"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold px-1"
                    >
                      City
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="North Little Rock"
                        name="city"
                        onChange={handleChange}
                        value={formData.city}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-semibold px-1"
                    >
                      State
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Arkansas"
                        name="state"
                        onChange={handleChange}
                        value={formData.state}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold px-1"
                    >
                      Postal Code
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="72214"
                        name="postalCode"
                        onChange={handleChange}
                        value={formData.postalCode}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <label
                      htmlFor="countryCode"
                      className="text-xs font-semibold px-1"
                    >
                      Country Code
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="US"
                        name="countryCode"
                        onChange={handleChange}
                        value={formData.countryCode}
                        required
                      />
                    </div>
                  </div>
                </div>
                <FormErrorHandler errorMsgs={errorMsgs} />
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full transition duration-200 max-w-xs mx-auto bg-teal-accent-400 hover:bg-teal-accent-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      SIGN UP
                      {submitting && (
                        <span>
                          <Spinner />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>{" "}
              {displaySuccess && (
                <>
                  <div className="text-center">
                    <SuccessAlert
                      spinner
                      msg="Rejoice! You're about to be redirected to the login page."
                    />
                  </div>
                </>
              )};
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
