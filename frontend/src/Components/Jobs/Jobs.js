import React, { useContext } from "react";
import Header from "../Header";
import ProtectedRoute from "../Auth/ProtectedRoute";
import AuthContext from "../Auth/authContext";
import alloy from '@alloyidentity/web-sdk';
import { useHistory } from "react-router-dom";

const alloyInitParams = {
  key: '028d85e0-aa24-4ca1-99f2-90e3ee3f4e6b',
  // entityToken: 'P-nCLYNtmujqr9ZPwQ0C9S',
  // externalEntityId: 'P-nCLYNtmujqr9ZPwQ0C9S',
  documents: ['license', 'passport'],
  selfie: true,
  evaluationData: {
      nameFirst: 'John',
      nameLast: 'Beta',
      addressLine1: 'Address Line 1. C - left door',
      addressLine2: 'Secondary address. 2�B',
      addressCity: 'City address',
      addressState: 'TX',
      addressPostalCode: '+419550',
      addressCountryCode: 'VI',
      birthDate: '2020-03-03',
  },
  // color: { primary: '#CD7D2D', secondary: '#862633' }
  // forceMobile: true
};
alloy.init(alloyInitParams)

const Jobs = () => {
  const history = useHistory();
  const { currUser } = useContext(AuthContext);
  
  const callback = data => {
      console.log(data);
  };

  const onOpen = (e) => {
      e.preventDefault();
      alloy.open(callback);
  };

  const onClose = (e) => {
    e.preventDefault();
    alloy.close();
  };


  return (
    <>
      {currUser.username ? (
        <div className="bg-gray-100">
          <Header
            title="Evaluation"
            category="OnBoarding"
            description="Click below to get started."
          />
            <div className="inline-block mb-1 sm:mb-2">
              <button onClick={onOpen}
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
              >
                Open
              </button>
            </div>
            <div className="inline-block mt-4 mb-2 sm:mb-4">
              <button onClick={onClose}
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
              >
                Close
              </button>
            </div>
            
        </div>
      ) : (
        <ProtectedRoute />
      )}
    </>
  );
};

export default Jobs;
