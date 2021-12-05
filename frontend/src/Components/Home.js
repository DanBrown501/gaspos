import React, { useContext } from "react";
import AuthContext from "./Auth/authContext";
import { ArrowRight } from "phosphor-react";

export const Home = () => {
  const { currUser } = useContext(AuthContext);
  return (
    <div className="h-auto relative flex flex-col-reverse py-16 lg:pt-16 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://static.wixstatic.com/media/6b75704e4afc400e94581c8839d0fc55.jpg/v1/fill/w_2880,h_1256,al_c,q_90,usm_0.66_1.00_0.01/6b75704e4afc400e94581c8839d0fc55.webp"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Let's Get Started
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Onboarding 
            <br className="hidden md:block" />
            has never been 
            <span className="inline-block text-deep-purple-accent-400">
              easier
            </span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            lorem ipsum
          </p>
          <div className="flex items-center">
            {currUser.username ? null : (
              <a
                href="/login"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </a>
            )}

            <a
              href="/jobs"
              aria-label=""
              className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Evaluations 
              <ArrowRight size={34} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
