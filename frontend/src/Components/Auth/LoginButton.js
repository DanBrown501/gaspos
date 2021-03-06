import React from "react";
import { SignIn } from "phosphor-react";

const LoginButton = (smallScreen) => {
  //if prop passed in, button will span entire width of container
  const width = smallScreen ? "w-full" : "";
  return (
    <li>
      <a
        href="/login"
        className={`${width} inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none`}
        aria-label="Login"
        title="Login"
      >
        Login 
        <SignIn size={23} />
      </a>
    </li>
  );
};

export default LoginButton;
