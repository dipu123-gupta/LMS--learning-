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
    if (response.payload.success) {
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
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={createNewAccount}
          noValidate
          className="flex flex-col justify-center gap-3 p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
          <label htmlFor="image-uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full m-auto"
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
            name="image-uploads"
            onChange={getImage} 
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              id="name"
              placeholder="Enter Your Full Name"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>
          <button
            type="submit"
            className=" mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Create account
          </button>

          <p className="text-center">
            Already hava an account ?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
