"use client";
import React from "react";
import Heading from "@/utils/Heading";
import UsersAnalytics from "@/components/Admin/Analytics/UsersAnalytics";

const Page = () => {
  return (
    <>
      <Heading
        title="Users Analytics - ByWay Learning Management System"
        description="This is the users analytics page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}

      <UsersAnalytics />
    </>
  );
};

export default Page;
