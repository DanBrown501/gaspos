import React from "react";
import {
  FacebookLogo,
  TwitterLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              GasPos
            </span>
          </a>
          {/* <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
             Lorem ipsum
            </p>
            <p className="mt-4 text-sm text-gray-800">
             Lorem ipsum
            </p>
          </div> */}
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Contacts
          </p>
          <div className="md:pt-5 flex">
            <p className="mr-1 text-gray-800">Phone:</p>
            <a
              href="tel:000-000-0000"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-deep-purple-800"
            >
              1-800-209-1241
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a
              href="mailto:sanspanic.dev@gmail.com"
              aria-label="My email"
              title="My email"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-deep-purple-800"
            >
              sales@gaspos.co
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Location:</p>
            <a
              href="https://www.google.com/maps/place/Edinburgh,+UK/@55.9411884,-3.2755498,12z/data=!3m1!4b1!4m5!3m4!1s0x4887b800a5982623:0x64f2147b7ce71727!8m2!3d55.953252!4d-3.188267"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-teal-accent-400 hover:text-deep-purple-800"
            >
              419 Main Street
              Suite 200
              North Little Rock, AR 72114
              USA
            </a>
          </div>
        </div>
        <div>
          {/* <span className="text-base font-bold tracking-wide text-gray-900">
            Social
          </span> */}
          <div className="md:pt-5 flex items-center mt-1 space-x-3">
            <a href="https://facebook.com/gasposinc">
              <FacebookLogo
                className="cursor-pointer text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                size={24}
              />
            </a>
            <a href="https://twitter.com/gasposinc">
              <TwitterLogo
                className="cursor-pointer text-gray-500 transition-colors duration-300 hover:text-teal-accent-400"
                size={24}
              />
            </a>
          </div>
          {/* <p className="mt-4 text-sm text-gray-500">
            Lorem ipsum
          </p> */}
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright 2020 Gas Pos, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
