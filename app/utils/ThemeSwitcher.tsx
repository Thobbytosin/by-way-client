"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(
    () => setMounted(true),

    []
  );

  if (!mounted) return null;

  return (
    <div>
      {theme === "light" ? (
        <div className="  text-black duration-500 transition hover:text-primary text-base sm:text-xl">
          <FaMoon
            className=" cursor-pointer"
            // fill="black"
            // size={25}
            onClick={() => setTheme("dark")}
          />
        </div>
      ) : (
        <div className="  text-white duration-500 transition hover:text-primary cursor-pointer">
          <FaSun
            className=" cursor-pointer text-base sm:text-xl"
            // fill="white"
            // size={25}
            onClick={() => setTheme("light")}
          />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
