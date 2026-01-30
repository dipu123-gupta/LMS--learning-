import HomeLayout from '../../Layouts/HomeLayout.jsx';
import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';

const FailCheckout = () => {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white bg-gradient-to-br from-[#0f172a] to-[#020617]">
        <div className="w-96 h-[28rem] flex flex-col justify-center items-center  bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.7)]  rounded-2xl relative overflow-hidden">

          {/* Header */}
          <h1 className="bg-red-500 absolute top-0 w-full py-4 text-center  text-2xl font-bold tracking-wide">
            Payment Failed
          </h1>

          {/* Content */}
          <div className="px-6 flex flex-col items-center justify-center gap-4 mt-10">
            <RxCrossCircled className="text-red-400 text-6xl drop-shadow-lg" />
        
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-red-400">
                Opps ! your payment failed
              </h2>
              <p className="text-gray-300 text-sm">
                please try again later
              </p>
            </div>
          </div>

          {/* Button */}
          <Link
            to="/checkout"
            className="absolute bottom-0 w-full text-center  bg-red-500 hover:bg-green-600 transition-all duration-300 py-3 font-bold text-lg"
          >
            <button>Try again</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default FailCheckout