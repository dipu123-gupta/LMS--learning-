import React from "react";

const CarouselSlide = ({
  title,
  description,
  slideNumber,
  totalSlideNumber,
  image,
}) => {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
      <div
        className="
          flex flex-col items-center justify-center
          gap-3 sm:gap-4
          px-4 sm:px-[10%] lg:px-[15%]
          text-center
        "
      >
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="
            w-28 h-28
            sm:w-32 sm:h-32
            lg:w-40 lg:h-40
            rounded-full
            border-2 border-gray-400
            object-cover
          "
        />

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-lg lg:text-xl text-gray-200">
          {description}
        </p>

        {/* TITLE */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
          {title}
        </h1>

        {/* NAVIGATION */}
        <div
          className="
            absolute
            left-3 right-3 sm:left-5 sm:right-5
            top-1/2
            flex
            -translate-y-1/2
            justify-between
          "
        >
          {/* PREVIOUS */}
          <a
            href={`#slide${
              slideNumber === 1 ? totalSlideNumber : slideNumber - 1
            }`}
            className="btn btn-circle btn-sm sm:btn-md"
          >
            ❮
          </a>

          {/* NEXT */}
          <a
            href={`#slide${
              slideNumber === totalSlideNumber ? 1 : slideNumber + 1
            }`}
            className="btn btn-circle btn-sm sm:btn-md"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};


export default CarouselSlide;
