import React from "react";
import { Star } from "phosphor-react";

const AppliedBtn = () => {
  return (
    <button
      className={`bg-teal-accent-400 cursor-default inline-flex items-center justify-center h-12 px-6 font-medium text-white bg:deep-purple-accent-400 hover:deep-purple-accent-700 hover foxus:shadow-outline focus:outline-none transition-duration-200 rounded`}
    >
      Applied  <Star className="inline-flex " size={26} />
    </button>
  );
};

export default AppliedBtn;
