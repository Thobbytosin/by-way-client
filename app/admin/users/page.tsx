"use client";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import React, { useState, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import AllUsers from "../../components/Admin/Users/AllUsers";
import { useRefreshTokenQuery } from "../../../redux/api/apiSlice";

type Props = {};

const Page: FC<Props> = () => {
  const [collapse, setCollapse] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const { user } = useSelector((state: any) => state.auth);
  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });

  // refresh token when page loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <AdminProtected>
        <Heading
          title="Users - ByWay Learning Management System"
          description="This is the users page of online e-learning platform where people can have access to resources for learning"
          keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
        />
        <div className="flex min-h-[100vh]">
          {/* sidebar */}
          <div
            className={`${
              collapse ? "w-[4%] " : "w-[18%] "
            } h-[100vh] fixed left-0 top-0   p-3 z-[99]  text-white dark:text-black bg-[#0F172A] dark:bg-slate-50`}
          >
            <AdminSidebar
              user={user}
              collapse={collapse}
              setCollapse={setCollapse}
              avatar={avatar}
            />
          </div>

          {/* content */}
          <div
            className={`min-w-[100vw] bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 min-h-[100vh] ${
              collapse ? "ml-[6rem]" : "ml-[12rem]"
            } `}
          >
            <DashboardHeader />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
