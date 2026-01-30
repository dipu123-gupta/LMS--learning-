import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>

      <div className="bg-black -translate-y-5 text-white px-2 text-sm rounded rotate-12 absolute">
        page not found...
      </div>

      <button className="mt-5">
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer relative inline-block text-sm font-medium text-[#FF6A38] active:text-yellow-500"
        >
          <span className="relative block px-8 py-3 bg-[#1a2238] border border-current">
            Go Back
          </span>
        </span>
      </button>
    </div>
  );
};

export default NotFound;
