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
      <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
        <img
          src={image}
          className="w-40 rounded-[100%] border-2 border-gray-400"
          alt={title}
        />

        <p className="text-xl text-gray-200">{description}</p>

        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          {/* PREVIOUS */}
          <a
            href={`#slide${
              slideNumber === 1 ? totalSlideNumber : slideNumber - 1
            }`}
            className="btn btn-circle"
          >
            ❮
          </a>

          {/* NEXT */}
          <a
            href={`#slide${
              slideNumber === totalSlideNumber ? 1 : slideNumber + 1
            }`}
            className="btn btn-circle"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
