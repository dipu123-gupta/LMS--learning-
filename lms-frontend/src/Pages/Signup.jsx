import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice.js";
import { isEmail, isPassword } from "../Helpers/regexMatcher.js";
// import validator from "validator";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! User image input State
  const [previewImage, setPreviewImage] = useState("");

  //User input data State
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  //! Handle User Input State
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  //! get Image function
  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", () => {
        console.log(fileReader.result);
        setPreviewImage(fileReader.result);
      });
    }
  };

  const createNewAccount = async (event) => {
    event.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.name ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the Details");
      return;
    }
    //! Name Validatin
    if (signupData.name.length < 3) {
      toast.error("Name should be at least 3 characters long");
      return;
    }

    //! Name Validatin
    if (signupData.name.length > 30) {
      toast.error("Name should not be more than 30 characters");
      return;
    }

    //!  EMAIL VALIDATION
    if (!isEmail(signupData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    //!  PASSWORD VALIDATION
    if (!isPassword(signupData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      );
      return;
    };

    const formData = new FormData();
    formData.append("name", signupData.name);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //! dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate("/");

      setSignupData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
    }

    setPreviewImage("");
  };
  return (
  <HomeLayout>
    <div className="flex items-center justify-center min-h-[90vh] px-4">
      <form
        onSubmit={createNewAccount}
        noValidate
        className="
          flex flex-col justify-center gap-3
          p-4 sm:p-6
          text-white
          w-full sm:w-[420px] lg:w-96
          shadow-[0_0_10px_black]
          rounded-md
        "
      >
        <h1 className="text-center text-xl sm:text-2xl font-bold">
          Registration Page
        </h1>

        {/* Avatar */}
        <label htmlFor="image-uploads" className="cursor-pointer">
          {previewImage ? (
            <img
              src={previewImage}
              className="w-24 h-24 rounded-full m-auto object-cover"
            />
          ) : (
            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
          )}
        </label>

        <input
          type="file"
          className="hidden"
          id="image-uploads"
          accept=".jpg, .jpeg, .png, .svg"
          onChange={getImage}
        />

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Full Name"
            className="bg-transparent px-2 py-2 border rounded-sm"
            onChange={handleUserInput}
            value={signupData.name}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-transparent px-2 py-2 border rounded-sm"
            onChange={handleUserInput}
            value={signupData.email}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-transparent px-2 py-2 border rounded-sm"
            onChange={handleUserInput}
            value={signupData.password}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            mt-2
            bg-yellow-600 hover:bg-yellow-400
            transition-all duration-300
            rounded-sm py-2
            font-semibold text-lg
          "
        >
          Create account
        </button>

        {/* Login */}
        <p className="text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  </HomeLayout>
);

};


// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [previewImage, setPreviewImage] = useState("");

//   const [signupData, setSignupData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     avatar: "",
//   });

//   const handleUserInput = (e) => {
//     const { name, value } = e.target;
//     setSignupData({ ...signupData, [name]: value });
//   };

//   const getImage = (event) => {
//     const uploadedImage = event.target.files[0];
//     if (!uploadedImage) return;

//     setSignupData({ ...signupData, avatar: uploadedImage });
//     setPreviewImage(URL.createObjectURL(uploadedImage));
//   };

//   const createNewAccount = async (event) => {
//     event.preventDefault();
//     // validation same rahegi
//   };

//   return (
//     <HomeLayout>
//       <div className="min-h-[90vh] flex items-center justify-center px-4">
//         <form
//           onSubmit={createNewAccount}
//           noValidate
//           className="
//             w-full 
//             max-w-md 
//             bg-black/60 
//             backdrop-blur-md
//             text-white 
//             rounded-lg 
//             p-6 
//             space-y-4 
//             shadow-lg
//           "
//         >
//           <h1 className="text-center text-2xl font-bold">
//             Create Account
//           </h1>

//           {/* Avatar */}
//           <label htmlFor="image-uploads" className="cursor-pointer block">
//             {previewImage ? (
//               <img
//                 src={previewImage}
//                 alt="avatar"
//                 className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover border"
//               />
//             ) : (
//               <BsPersonCircle className="w-24 h-24 sm:w-28 sm:h-28 mx-auto" />
//             )}
//           </label>

//           <input
//             type="file"
//             id="image-uploads"
//             className="hidden"
//             accept=".jpg, .jpeg, .png"
//             onChange={getImage}
//           />

//           {/* Name */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold">Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your full name"
//               value={signupData.name}
//               onChange={handleUserInput}
//               className="
//                 bg-transparent 
//                 border 
//                 px-3 
//                 py-2 
//                 rounded 
//                 focus:outline-none 
//                 focus:border-yellow-400
//               "
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={signupData.email}
//               onChange={handleUserInput}
//               className="
//                 bg-transparent 
//                 border 
//                 px-3 
//                 py-2 
//                 rounded 
//                 focus:outline-none 
//                 focus:border-yellow-400
//               "
//             />
//           </div>

//           {/* Password */}
//           <div className="flex flex-col gap-1">
//             <label className="text-sm font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={signupData.password}
//               onChange={handleUserInput}
//               className="
//                 bg-transparent 
//                 border 
//                 px-3 
//                 py-2 
//                 rounded 
//                 focus:outline-none 
//                 focus:border-yellow-400
//               "
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="
//               w-full 
//               bg-yellow-600 
//               hover:bg-yellow-500 
//               transition 
//               py-2 
//               rounded 
//               font-semibold 
//               text-lg
//             "
//           >
//             Create Account
//           </button>

//           {/* Login */}
//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-yellow-400 hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </HomeLayout>
//   );
// };


export default Signup;
