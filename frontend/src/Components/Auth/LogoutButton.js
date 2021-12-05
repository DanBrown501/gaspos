import React, { useContext } from "react";
import AuthContext from "./authContext";
import { useHistory } from "react-router-dom";

const LogoutButton = (smallScreen) => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  //if prop passed in, button will span entire width of container
  const width = smallScreen ? "w-full" : "";

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    history.push("/login");
  };

  return (
    <li>
      <a
        href="/"
        className={`${width} inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none`}
        aria-label="Logout"
        title="Logout"
        onClick={handleLogout}
      >
        Logout
      </a>
    </li>
  );
};

export default LogoutButton;
