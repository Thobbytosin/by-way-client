import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div
      className={`dark:bg-gray-100 bg-[#1E293B] min-h-[40vh] flex justify-center items-center py-14`}
    >
      <div className="lg:w-[70%] w-full mx-auto flex flex-col justify-center items-center">
        {/* logo and header */}
        <div className=" flex sm:flex-row flex-col items-center justify-center  gap-8">
          {/* Logo */}
          <div>
            <Link href={"/"} className=" flex items-center">
              <Image
                src={require("../icon.png")}
                width={40}
                height={40}
                alt="app_logo"
                //   className="w-5 h-7"
              />
              <h3 className=" font-semibold  text-white dark:text-black text-xl">
                ByWay
              </h3>
            </Link>
          </div>

          {/* divider */}
          <div className=" w-40 h-[1px] sm:h-20 sm:w-[1.5px] bg-gray-500 dark:bg-gray-300" />

          {/* text */}
          <p className=" text-center sm:text-start max-w-[20rem] text-white dark:text-black font-medium">
            <span className=" text-lightGreen">Empowering Learners</span>{" "}
            through accessible and engaging{" "}
            <span className=" text-lightGreen">Online Education.</span>
          </p>
        </div>

        {/* form */}
        <div className=" mt-[3.5rem] sm:w-[70%] w-[80%]">
          <h2 className=" text-lg sm:text-xl text-white dark:text-black font-medium text-center">
            Subscribe to get our Newsletter
          </h2>
          <form className=" sm:flex gap-4 h-[40px] mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full border border-gray-500 rounded-full px-6 sm:pl-6 sm:py-6 bg-transparent w-[100%] text-white dark:text-black outline-none"
            />
            <button
              type="submit"
              className="sm:mx-0 mx-auto sm:mt-0 mt-4 h-full flex justify-center items-center px-6 sm:p-6 rounded-full bg-lightGreen text-white transition duration-300 hover:bg-transparent hover:border hover:border-gray-200 hover:dark:border-gray-900 hover:dark:text-black"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* careers, privacy policy, terms */}
        <div className="mx-auto  flex items-center justify-center gap-2 sm:gap-4 mt-20">
          <h4 className=" text-white dark:text-black font-medium  transition duration-300 hover:text-lightGreen cursor-pointer text-base sm:text-lg">
            Careers.
          </h4>
          {/* divider */}
          <div className="w-[2px] h-5 bg-gray-500 hidden sm:inline-block" />

          <h4 className=" text-white font-medium dark:text-black transition duration-300 hover:text-lightGreen cursor-pointer text-base sm:text-lg">
            Privacy Policy.
          </h4>

          {/* divider */}
          <div className="w-[2px] h-5 hidden sm:inline-block bg-gray-500" />

          <h4 className=" text-white font-medium dark:text-black transition duration-300 hover:text-lightGreen cursor-pointer text-base sm:text-lg">
            Terms & Conditions.
          </h4>
        </div>

        {/* copyright */}
        <p className=" font-semibold text-white dark:text-black text-center my-8">
          &copy; {new Date().getFullYear()} ByWay, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
