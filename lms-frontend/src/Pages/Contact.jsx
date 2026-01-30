import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, message } = formData;

    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return false;
    }

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.post("/user", formData);

      if (res?.data?.success) {
        toast.success("Message sent successfully ✨");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send message ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white px-4">
        
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-8 space-y-5"
        >
          {/* TITLE */}
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Contact Us
          </h1>

          <p className="text-center text-sm text-gray-300">
            We’d love to hear from you. Fill out the form below.
          </p>

          {/* NAME */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 px-4 py-2.5 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 px-4 py-2.5 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
            />
          </div>

          {/* MESSAGE */}
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Message</label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg bg-black/40 px-4 py-2.5 text-white placeholder-gray-400 outline-none border border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(250,204,21,0.4)] active:scale-95"
            }`}
          >
            {loading ? "Sending..." : "Send Message ✉️"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;
