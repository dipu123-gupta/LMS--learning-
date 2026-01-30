import HomeLayout from "../Layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import main from "../imge/main5.png";

const HomePage = () => {
  return (
    <HomeLayout>
      <div
        className="
          pt-10
          text-white
          flex flex-col-reverse
          lg:flex-row
          items-center
          justify-center
          gap-10
          px-4 sm:px-8 lg:px-16
          min-h-[90vh]
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            w-full lg:w-1/2
            space-y-6
            text-center lg:text-left
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-semibold
              leading-tight
            "
          >
            Find out best{" "}
            <span className="text-yellow-500 font-bold">
              Online course
            </span>
          </h1>

          <p
            className="
              text-base
              sm:text-lg
              lg:text-xl
              text-gray-200
            "
          >
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost ....
          </p>

          <div
            className="
              flex flex-col
              sm:flex-row
              gap-4
              sm:gap-6
              justify-center lg:justify-start
            "
          >
            <Link to="/courses">
              <button
                className="
                  bg-yellow-500
                  px-5 py-3
                  rounded-md
                  font-semibold
                  text-base sm:text-lg
                  cursor-pointer
                  hover:bg-yellow-600
                  transition-all
                  duration-300
                  w-full sm:w-auto
                "
              >
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button
                className="
                  border border-yellow-500
                  px-5 py-3
                  rounded-md
                  font-semibold
                  text-base sm:text-lg
                  cursor-pointer
                  hover:bg-yellow-500
                  transition-all
                  duration-300
                  w-full sm:w-auto
                "
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            w-full lg:w-1/2
            flex items-center justify-center
          "
        >
          <img
            src={main}
            alt=""
            className="
              w-full
              max-w-xs
              sm:max-w-sm
              lg:max-w-md
              object-contain
            "
          />
        </div>
      </div>
    </HomeLayout>
  );
};


export default HomePage;
