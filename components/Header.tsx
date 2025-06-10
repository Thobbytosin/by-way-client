"use client";

import React, { FC, useState } from "react";
import SearchBar from "@/utils/SearchBar";
import NavItems from "@/utils/NavItems";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { FaHamburger } from "react-icons/fa";
import Image from "next/image";
import { styles } from "@/styles/style";
import { useSelector } from "react-redux";
import avatar from "@/public/assets/avatar.png";
import { useRouter } from "next/navigation";
import SmartLink from "./SmartLink";

type Props = {
  activeItem?: number | null;
};

const Header: FC<Props> = ({ activeItem }) => {
  const router = useRouter();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm === "") {
      return;
    } else {
      router.push(`/courses?search=${searchTerm}`);
    }
  };

  const handleKeyboardEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // for sticky state
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 180) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  // close sidebar
  const handleCloseSidebar = (e: any) => {
    setOpenSidebar(false);
  };

  return (
    <nav
      role="navigation"
      data-testid="main navigation"
      className={`${
        active
          ? " dark:bg-opacity-50 dark:bg-gradient-to-b bg-white dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full min-h-[50px] z-[80] border-b dark:border-[#ffffff1c] dark:shadow transition duration-500  "
          : " w-full border-b shadow  dark:border-[#ffffff1c]  min-h-[50px] z-[80] dark:shadow "
      }`}
    >
      <div className={`w-full py-2 ${styles.paddingX}  h-full `}>
        <div className="w-full h-[50px]  flex items-center justify-between  gap-10">
          {/* Logo */}
          <div>
            <SmartLink href="/" className=" flex items-center">
              <Image
                src={require("@/public/logo.png")}
                width={20}
                height={28}
                alt="app_logo"
                className="w-5 h-7"
              />
              <h3 className=" font-semibold text-xs text-black dark:text-white">
                ByWay
              </h3>
            </SmartLink>
          </div>

          {/* Search bar */}
          <div className=" w-full md:block hidden">
            <SearchBar
              key={1}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleKeyboardEnter={handleKeyboardEnter}
              handleSearch={handleSearch}
            />
          </div>

          {/* Nav links */}
          <div className=" flex items-center gap-4">
            <NavItems key={1} activeItem={activeItem} isMobile={false} />

            {/* mobile */}

            {/* user profile */}
            <div className=" md:hidden block">
              {user ? (
                <SmartLink
                  href={`/profile/${user?.name
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="h-[30px] w-[32px] rounded-full border-2 border-primary  mr-1 flex justify-center items-center overflow-hidden">
                    <Image
                      src={user?.avatar ? user.avatar?.url : avatar}
                      alt="avatar"
                      width={30}
                      height={30}
                      className=" w-full h-full"
                    />
                  </div>
                </SmartLink>
              ) : (
                <div className=" ">
                  <SmartLink href="/login" className=" w-full h-full">
                    <button
                      className={`rounded-sm text-white text-xs w-20 py-2   bg-primary hover:text-primary hover:bg-transparent hover:border hover:border-primary transition duration-300`}
                    >
                      Login
                    </button>
                  </SmartLink>
                </div>
              )}
            </div>

            {/* menu toggler */}
            <button
              data-testid="menu toggler"
              title="menu-toogler"
              aria-label="Toggle menu"
              role="Toggle menu"
              className=" md:hidden block"
              onClick={() => setOpenSidebar(true)}
            >
              <span className=" text-black dark:text-white text-base sm:text-xl">
                <FaHamburger fontSize="inherit" />
              </span>
            </button>

            {/* theme switch */}
            <div className=" md:hidden inline-block">
              <ThemeSwitcher />
            </div>
          </div>

          {/* sign in/up & theme toggler  show only laptop*/}
          <div className=" hidden md:flex items-center ">
            {user ? (
              <SmartLink
                href={`/profile/${user?.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <div className="h-[30px] w-[32px] rounded-full border-2 border-primary mr-6   flex justify-center items-center overflow-hidden">
                  <Image
                    src={user?.avatar ? user.avatar?.url : avatar}
                    alt="avatar"
                    width={30}
                    height={30}
                    className=" w-full h-full"
                  />
                </div>
              </SmartLink>
            ) : (
              <div className=" flex gap-2 mr-4">
                <SmartLink href="/login" className=" w-full h-full">
                  <button
                    className={`rounded-sm text-white text-xs w-20 py-2   bg-primary hover:text-primary hover:bg-transparent hover:border hover:border-primary transition duration-300`}
                  >
                    Login
                  </button>
                </SmartLink>

                <SmartLink href="/register" className=" w-full h-full">
                  <button className=" rounded-sm   text-white dark:text-slate-700 bg-slate-700 dark:bg-white text-xs w-20 py-2 hover:bg-opacity-80 transition duration-300 ">
                    Sign up
                  </button>
                </SmartLink>
              </div>
            )}

            {/* theme switch */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* mobile sidebar */}

      <div>
        {/* overlay */}
        <div
          data-testid="overlay"
          onClick={handleCloseSidebar}
          className={`${
            openSidebar ? "translate-x-[0%]" : "translate-x-[100%]"
          } bg-black/50 fixed left-0 top-0 w-screen h-screen z-[99] cursor-pointer transition-all duration-700`}
        />

        {/* sidebar */}
        <div
          id="sidebar"
          data-testid="sidebar"
          aria-label="Sidebar Navigation"
          className={`fixed w-[65%] h-screen top-0 right-0 z-[99] transition-all duration-700  ${
            openSidebar ? "translate-x-[0%]" : "translate-x-[100%]"
          }`}
        >
          <div
            // onClick={handleCloseSidebar}
            className=" w-full flex flex-col justify-between   bg-white dark:bg-black  h-full py-6"
          >
            <div>
              <div className=" mb-8 ml-6">
                <SmartLink href={"/"} className=" flex items-center">
                  <Image
                    src={require("@/public/logo.png")}
                    alt="app_logo"
                    width={100}
                    height={100}
                    className="w-5 h-7"
                  />
                  <h3 className=" font-semibold text-xs text-black dark:text-white">
                    ByWay
                  </h3>
                </SmartLink>
              </div>
              <NavItems activeItem={activeItem} isMobile={true} />
            </div>

            <div className="">
              {user && (
                <SmartLink href="/profile">
                  <div className=" flex items-center gap-3 my-10 w-full cursor-pointer transition duration-300 hover:bg-slate-200 px-6 py-3">
                    <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        src={user?.avatar ? user?.avatar.url : avatar}
                        alt="avatar"
                        width={10}
                        height={10}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold mb-1">
                        {user && user.name}
                      </h4>
                      <p className=" text-gray-500 text-[10px] sm:text-xs">
                        {user && user.email}
                      </p>
                    </div>
                  </div>
                </SmartLink>
              )}
              <p className=" ml-6 text-xs text-black dark:text-white text-start">
                &copy; {new Date().getFullYear()} ByWay, All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
