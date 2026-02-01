import React from "react";

import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer
      className="
        w-full
        bg-gray-800
        text-white
        py-4 sm:py-5
        px-4 sm:px-10 lg:px-20
        flex flex-col sm:flex-row
        items-center
        justify-center sm:justify-between
        gap-3 sm:gap-0
      "
    >
      <section className="text-sm sm:text-lg text-center sm:text-left">
        © {year} | All rights reserved
      </section>

      <section className="flex items-center justify-center gap-5 text-xl sm:text-2xl">
        <a className="hover:text-yellow-500 transition duration-300">
          <BsFacebook />
        </a>
        <a className="hover:text-yellow-500 transition duration-300">
          <BsInstagram />
        </a>
        <a className="hover:text-yellow-500 transition duration-300">
          <BsLinkedin />
        </a>
        <a className="hover:text-yellow-500 transition duration-300">
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
};


export default Footer;