import React, { useContext } from "react";
import AuthContext from "../Auth/authContext";
import ProtectedRoute from "../Auth/ProtectedRoute";
import UserDetailsForm from "./UserDetailsForm";
import ProfileHeader from "./ProfileHeader.js";
import AppliedJobsSection from "./AppliedJobsSection";
import "./Profile.css";

const Profile = () => {
  const { currUser } = useContext(AuthContext);
  return (
    <>
      {currUser.username ? (
        <>
          <div className="bg-gray-100 sm:py-3 md:py-5 lg:py-10">
            <div className="Profile bg-opacity-50 grid sm:p-10 lg:p-5 sm:rounded shadow-2xl grid-cols-1 lg:grid-cols-2 sm:mx-auto md:w-8/12 sm:w-10/12 bg-gray-900">
              <ProfileHeader />
              <div className="px-10 py-10">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <UserDetailsForm />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ProtectedRoute />
      )}
    </>
  );
};

export default Profile;
