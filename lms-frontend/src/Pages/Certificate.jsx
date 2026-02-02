import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useSelector } from "react-redux";

const Certificate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.auth);

  if (!state) {
    navigate("/courses");
    return null;
  }

  const today = new Date().toLocaleDateString();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white">
        <div className="max-w-3xl w-full bg-[#111827] border-4 border-yellow-400 rounded-xl p-8 shadow-2xl text-center space-y-6">

          <h1 className="text-4xl font-extrabold text-yellow-400">
            Certificate of Completion
          </h1>

          <p className="text-lg">This is proudly presented to</p>

          <h2 className="text-3xl font-bold text-white">
            {user?.name}
          </h2>

          <p className="text-lg">
            for successfully completing the course
          </p>

          <h3 className="text-2xl font-semibold text-yellow-400">
            {state?.title}
          </h3>

          <div className="flex justify-between mt-10 text-sm">
            <div>
              <p className="font-semibold">Instructor</p>
              <p>{state?.createdBy}</p>
            </div>

            <div>
              <p className="font-semibold">Date</p>
              <p>{today}</p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded"
          >
            Download / Print Certificate
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Certificate;
