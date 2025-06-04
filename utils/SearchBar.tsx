"use client";

import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleKeyboardEnter: any;
  handleSearch: any;
  forCourses?: boolean;
  setCategoryTag?: any;
};

const SearchBar: FC<Props> = ({
  searchTerm,
  setSearchTerm,
  handleKeyboardEnter,
  handleSearch,
  forCourses,
  setCategoryTag,
}) => {
  return (
    <div
      className={`w-full ${
        forCourses
          ? "border-none"
          : "border border-gray-400 p-2 text-gray-400  dark:border-[#ffffff1c]"
      }   rounded-lg ${forCourses ? "text-base" : "text-sm"} flex items-center`}
    >
      <input
        title="search-box"
        type="text"
        placeholder="Search resources.."
        value={searchTerm}
        onKeyDown={handleKeyboardEnter}
        onChange={(e) => {
          forCourses && setCategoryTag("");
          setSearchTerm(e.target.value);
        }}
        className={`outline-none w-full bg-transparent text-xs ${
          forCourses ? " text-gray-950" : "text-black dark:text-white"
        }  `}
      />
      {!forCourses && (
        <FaSearch
          size={15}
          className=" cursor-pointer"
          onClick={handleSearch}
        />
      )}
      {forCourses && (
        <button
          onClick={handleSearch}
          className=" bg-primary rounded-l-full rounded-r-full py-1 sm:py-2 px-4 text-xs sm:text-sm lg:text-xs text-white"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
