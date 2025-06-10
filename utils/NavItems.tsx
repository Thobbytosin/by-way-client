"use client";

import React, { FC } from "react";
import { CategoryIcon, InventoryIcon } from "../icons/icons";
import SmartLink from "@/components/SmartLink";

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
              <SmartLink href={item.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "text-primary"
                      : "text-black dark:text-white"
                  } `}
                >
                  {item.name}
                </span>
              </SmartLink>
            ))}
        </div>
      )}

      {/* mobile */}
      {isMobile && (
        <div className=" md:hidden">
          {navItemsData &&
            navItemsData.map((item, index) => (
              <SmartLink href={item.url} key={index} passHref>
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
              </SmartLink>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
