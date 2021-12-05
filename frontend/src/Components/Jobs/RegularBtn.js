import React from "react";

const RegularBtn = ({ handleApply }) => {
  return (
    <button
      onClick={handleApply}
      className="bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 inline-flex items-center justify-center h-12 px-6 font-medium text-white hover:deep-purple-accent-700 hover foxus:shadow-outline focus:outline-none transition-duration-200 rounded"
    >
      Apply
    </button>
  );
};

export default RegularBtn;
