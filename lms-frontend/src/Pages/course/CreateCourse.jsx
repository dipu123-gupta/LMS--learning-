import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createNewCourse } from "../../Redux/Slices/CourseSlice.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    price: "",
    discount: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.addEventListener("load", () => {
        setUserInput((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          thumbnail: uploadedImage,
        }));
      });
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]:
        name === "price" || name === "discount"
          ? Number(value)
          : value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    //FIX: price === "" instead of !price (FREE COURSE SUPPORT)
    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail ||
      userInput.price === ""
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("description", userInput.description);
    formData.append("thumbnail", userInput.thumbnail);
    formData.append("price",(userInput.price));

    // SAFE DISCOUNT
    formData.append(
      "discount",
      userInput.discount === "" ? 0 :(userInput.discount)
    );

    const response = await dispatch(createNewCourse(formData));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        price: "",
        discount: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          onSubmit={onFormSubmit}
          className="relative w-[850px] rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 shadow-2xl border border-gray-700 text-white"
        >
          {/* Back button */}
          <Link
            to="/courses"
            className="absolute top-6 left-6 text-2xl text-yellow-400 hover:scale-110 transition"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-3xl font-bold">
            Create New Course
          </h1>

          <p className="text-center text-gray-400 text-sm mt-1 mb-8">
            Fill in the details to publish a new course
          </p>

          <main className="grid grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border-2 border-dashed border-gray-600 hover:border-yellow-500">
                <label htmlFor="image_upload" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center">
                      <span>Upload course thumbnail</span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="image_upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                />
              </div>

              <input
                type="text"
                name="createdBy"
                value={userInput.createdBy}
                onChange={handleUserInput}
                placeholder="Instructor name"
                className="input input-bordered"
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={userInput.title}
                onChange={handleUserInput}
                placeholder="Course title"
                className="input input-bordered"
              />

              <input
                type="text"
                name="category"
                value={userInput.category}
                onChange={handleUserInput}
                placeholder="Course category"
                className="input input-bordered"
              />

              <input
                type="number"
                name="price"
                value={userInput.price}
                onChange={handleUserInput}
                placeholder="Course Price (₹)"
                className="input input-bordered"
              />

              <input
                type="number"
                name="discount"
                min={0}
                max={100}
                value={userInput.discount}
                onChange={handleUserInput}
                placeholder="Discount (%)"
                className="input input-bordered"
              />

              <textarea
                name="description"
                value={userInput.description}
                onChange={handleUserInput}
                placeholder="Course description"
                className="textarea textarea-bordered"
              />
            </div>
          </main>

          <button
            type="submit"
            className="mt-8 w-full bg-yellow-500 py-3 font-bold rounded"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
