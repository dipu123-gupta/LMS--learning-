import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/course/description/${data._id}`, {
          state: { ...data },
        })
      }
      className=" text-white w-[22rem] h-[450px] cursor-pointer rounded-2xl overflow-hidden group bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt={data?.title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-yellow-400 line-clamp-2">
          {data?.title}
        </h2>

        <p className="text-sm text-gray-300 line-clamp-2">
          {data?.description}
        </p>

        <div className="pt-2 space-y-1 text-sm">
          <p>
            <span className="text-yellow-400 font-semibold">Category:</span>{" "}
            {data?.category}
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">
              Total Lectures:
            </span>{" "}
            {data?.numberOfLectures}
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Price:</span>{" "}
            {data.isFree ? (
              <span className="text-green-400 font-bold">FREE</span>
            ) : (
              <>
                {data.discount > 0 && (
                  <span className="line-through text-gray-400 mr-2">
                    ₹ {data.price}
                  </span>
                )}
                <span className="text-green-400 font-bold">
                  ₹ {data.finalPrice}
                </span>
              </>
            )}
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Instructor:</span>{" "}
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
