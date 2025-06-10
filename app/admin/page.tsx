"use client";
import React from "react";
import Heading from "@/utils/Heading";
import DashboardHero from "@/components/Admin/DashboardHero";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Heading
        title="Admin Dashboard - ByWay Learning Management System"
        description="This is the admin page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <DashboardHero user={user} />
    </>
  );
};

export default Page;
