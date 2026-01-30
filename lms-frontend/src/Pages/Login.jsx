import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "./../Redux/Slices/AuthSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the Details");
      return;
    }

    const response = await dispatch(login(loginData));

    //  FIXED HERE
    if (response?.payload?.success) {
      navigate("/");
      setLoginData({ email: "", password: "" });
    } else {
      toast.error(response?.payload?.message || "Login failed");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-[#0f172a] to-[#020617]">
        <form
          onSubmit={onLogin}
          noValidate
          className="flex flex-col gap-4 p-6 w-96 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.7)] text-white"
        >
          <h1 className="text-center text-2xl font-bold tracking-wide">
            Login Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 border border-white/20 rounded focus:outline-none focus:border-yellow-400"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-3 py-2 border border-white/20 rounded focus:outline-none focus:border-yellow-400"
              onChange={handleUserInput}
              value={loginData.password}
            />

            <Link
              to="/forgot-password"
              className="text-sm text-yellow-400 hover:underline self-end"
            >
              Forgot password ?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-md py-2 font-bold text-black text-lg"
          >
            Login
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-300">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
