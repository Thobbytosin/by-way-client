"use client";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";
import Heading from "../../utils/Heading";
import React, { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
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
          title="Create Course - ByWay Learning Management System"
          description="This is the create course admin page of online e-learning platform where people can have access to resources for learning"
          keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
        />
        <div className="flex min-h-[100vh]">
          {/* sidebar */}
          <div
            className={`${
              collapse ? "w-[4%] " : "w-[15%] "
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
            className={`w-full min-h-[100vh] ${
              collapse ? "ml-[6rem]" : "ml-[16rem]"
            } `}
          >
            <DashboardHeader />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
