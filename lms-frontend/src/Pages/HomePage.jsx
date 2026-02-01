import HomeLayout from "../Layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import main from "../imge/main5.png";

// const HomePage = () => {
//   return (
//     <HomeLayout>
//       <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
//         <div className="w-1/2 space-y-6 text-center">
//           <h1 className="text-5xl font-semibold">
//             Find out best
//             <span className="text-yellow-500 font-bold">Online course</span>
//           </h1>
//           <p className="text-xl text-gray-200">
//             We have a large library of courses taught by highly skilled and
//             qualified faculties at a very affordable cost ....
//           </p>
//           <div className="space-x-6">
//             <Link to="/courses">
//               <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300">
//                 Explore Courses
//               </button>
//             </Link>

//             <Link to="/contact">
//               <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-300">
//                 Contact Us
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div className="w-1/2 flex items-center justify-center">
//           <img src={main} alt="" />
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };


// const HomePage = () => {
//   return (
//     <HomeLayout>
//       <div
//         className="
//           pt-10 text-white
//           flex flex-col lg:flex-row
//           items-center justify-center
//           gap-10
//           mx-4 lg:mx-16
//           min-h-[90vh]
//         "
//       >
//         {/* TEXT SECTION */}
//         <div
//           className="
//             w-full lg:w-1/2
//             space-y-6
//             text-center lg:text-left
//             order-1
//           "
//         >
//           <h1
//             className="
//               text-2xl
//               sm:text-3xl
//               md:text-4xl
//               lg:text-5xl
//               font-semibold
//             "
//           >
//             Find out best{" "}
//             <span className="text-yellow-500 font-bold">
//               Online course
//             </span>
//           </h1>

//           <p
//             className="
//               text-sm
//               sm:text-base
//               md:text-lg
//               lg:text-xl
//               text-gray-200
//             "
//           >
//             We have a large library of courses taught by highly skilled and
//             qualified faculties at a very affordable cost ....
//           </p>
//         </div>

//         {/* IMAGE */}
//         <div
//           className="
//             w-full lg:w-1/2
//             flex items-center justify-center
//             order-2
//           "
//         >
//           <img
//             src={main}
//             alt="hero"
//             className="
//               w-[70%]
//               sm:w-[60%]
//               md:w-[45%]
//               lg:w-auto
//             "
//           />
//         </div>

//         {/* BUTTONS */}
//         <div
//           className="
//             w-full
//             flex flex-col sm:flex-row
//             gap-4
//             justify-center
//             lg:justify-start
//             order-3
//             lg:hidden
//           "
//         >
//           <Link to="/courses" className="w-full sm:w-auto">
//             <button
//               className="
//                 w-full
//                 bg-yellow-500
//                 px-5 py-3
//                 rounded-md
//                 font-semibold
//                 text-base sm:text-lg
//                 hover:bg-yellow-600
//                 transition-all
//               "
//             >
//               Explore Courses
//             </button>
//           </Link>

//           <Link to="/contact" className="w-full sm:w-auto">
//             <button
//               className="
//                 w-full
//                 border border-yellow-500
//                 px-5 py-3
//                 rounded-md
//                 font-semibold
//                 text-base sm:text-lg
//                 hover:bg-yellow-500
//                 transition-all
//               "
//             >
//                 Contact Us
//             </button>
//           </Link>
//         </div>

//         {/* DESKTOP BUTTONS (OLD POSITION – NO CHANGE) */}
//         <div className="hidden lg:flex gap-6">
//           <Link to="/courses">
//             <button
//               className="
//                 bg-yellow-500
//                 px-5 py-3
//                 rounded-md
//                 font-semibold
//                 text-lg
//                 hover:bg-yellow-600
//                 transition-all
//               "
//             >
//               Explore Courses
//             </button>
//           </Link>

//           <Link to="/contact">
//             <button
//               className="
//                 border border-yellow-500
//                 px-5 py-3
//                 rounded-md
//                 font-semibold
//                 text-lg
//                 hover:bg-yellow-500
//                 transition-all
//               "
//             >
//               Contact Us
//             </button>
//           </Link>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };


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
