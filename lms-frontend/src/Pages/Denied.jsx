import React from "react";
import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-semibold text-white">403</h1>

      <div className="absolute -translate-y-5 bg-black text-white px-3 py-1 text-sm rounded rotate-12">
        Access Denied
      </div>

      <button onClick={() => navigate(-1)} className="mt-4 border px-6 py-2 text-white hover:bg-yellow-500 transition">
        Go Back
      </button>
    </main>
  );
};

export default Denied;
