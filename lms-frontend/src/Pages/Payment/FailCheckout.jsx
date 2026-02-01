import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';

const FailCheckout = () => {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 text-white bg-gradient-to-br from-[#0f172a] to-[#020617]">
        
        <div
          className="
            w-full max-w-sm sm:max-w-md
            h-[26rem] sm:h-[28rem]
            flex flex-col justify-center items-center
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_0_30px_rgba(0,0,0,0.7)]
            rounded-2xl
            relative overflow-hidden
          "
        >
          {/* Header */}
          <h1
            className="
              bg-red-500 absolute top-0 w-full
              py-3 sm:py-4
              text-center
              text-xl sm:text-2xl
              font-bold tracking-wide
            "
          >
            Payment Failed
          </h1>

          {/* Content */}
          <div className="px-4 sm:px-6 flex flex-col items-center justify-center gap-4 mt-12 sm:mt-14">
            <RxCrossCircled className="text-red-400 text-5xl sm:text-6xl drop-shadow-lg" />

            <div className="text-center space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-red-400">
                Oops! Your payment failed
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm">
                Please try again later
              </p>
            </div>
          </div>

          {/* Button */}
          <Link
            to="/checkout"
            className="
              absolute bottom-0 w-full text-center
              bg-red-500 hover:bg-red-600
              transition-all duration-300
              py-2.5 sm:py-3
              font-bold text-base sm:text-lg
            "
          >
            <button>Try Again</button>
          </Link>
        </div>

      </div>
    </HomeLayout>
  );
};


export default FailCheckout