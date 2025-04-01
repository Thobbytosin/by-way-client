"use client";

import Link from "next/link";
import React, { FC } from "react";
import { CategoryIcon, InventoryIcon, LiveHelpIcon } from "../icons/icons";

export const navItemsData = [
  {
    name: "Courses",
    url: "/courses",
    icon: <InventoryIcon fontSize="small" />,
  },
  {
    name: "Support",
    url: "/support",
    icon: <CategoryIcon fontSize="small" />,
  },
  //   { name: "Teach ", url: "/become-an-instructor" },
  // { name: "FAQs", url: "/faqs", icon: <LiveHelpIcon fontSize="small" /> },
];

type Props = {
  activeItem?: number | null;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* laptop */}
      {!isMobile && (
        <div className=" hidden md:flex gap-4 text-sm font-semibold">
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "text-primary"
                      : "text-black dark:text-white"
                  } `}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}

      {/* mobile */}
      {isMobile && (
        <div className=" md:hidden">
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <div className=" flex items-center gap-4 py-4 px-6 transition border-b border-slate-200 dark:border-slate-800 duration-500 hover:bg-primary hover:text-white rounded-lg text-sm">
                  <span className=" text-slate-60">{item.icon}</span>
                  <span
                    className={` font-medium ${
                      activeItem === index
                        ? "text-primary"
                        : " dark:text-white "
                    } `}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
