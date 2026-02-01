import HomeLayout from "../Layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import main from "../imge/main5.png";

const HomePage = () => {
  return (
    <HomeLayout>
      <div
        className="
           text-white
          flex flex-col lg:flex-row
          items-center justify-center
          gap-15
          mx-4 sm:mx-2 lg:mx-16
          min-h-[90vh]
        "
      >
        {/* TEXT + BUTTONS (Laptop SAME) */}
        <div
          className="
            w-full lg:w-1/2
            space-y-6
            text-center
            order-1
          "
        >
          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              mb-12
            "
          >
            Find out best{" "}
            <span className="text-yellow-500 font-bold">
              Online course
            </span>
          </h1>

          <p
            className="
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
              text-gray-200
            "
          >
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost ....
          </p>

          {/* BUTTONS */}
          <div
            className="
              flex flex-col sm:flex-row
              gap-4 sm:gap-6
              justify-center
              mt-12
            "
          >
            <Link to="/courses" className="w-full sm:w-auto">
              <button
                className="
                  w-full sm:w-auto
                  bg-yellow-500
                  px-5 py-3
                  rounded-md
                  font-semibold
                  text-base sm:text-lg lg:text-lg
                  cursor-pointer
                  hover:bg-yellow-500
                  transition-all ease-in-out duration-300
                "
              >
                Explore Courses
              </button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <button
                className="
                  w-full sm:w-auto
                  border border-yellow-500
                  px-5 py-3
                  rounded-md
                  font-semibold
                  text-base sm:text-lg lg:text-lg
                  cursor-pointer
                  hover:bg-yellow-500
                  transition-all ease-in-out duration-300
                "
              >
                  Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="
            w-full lg:w-1/2
            flex items-center justify-center
            order-2
          "
        >
          <img
            src={main}
            alt=""
            className="
              w-[70%]
              sm:w-[60%]
              md:w-[45%]
              lg:w-auto
            "
          />
        </div>
      </div>
    </HomeLayout>
  );
};





export default HomePage;
