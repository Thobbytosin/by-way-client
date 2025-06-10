"use client";

import Heading from "@/utils/Heading";
import React from "react";
import AllCourses from "@/components/Admin/Course/AllCourses";

const Page = () => {
  return (
    <>
      <Heading
        title="Live Courses - ByWay Learning Management System"
        description="This is the live courses page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <AllCourses />
    </>
  );
};

export default Page;
