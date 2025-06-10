"use client";
import React from "react";
import Heading from "@/utils/Heading";
import CourseAnalytics from "@/components/Admin/Analytics/CourseAnalytics";

const Page = () => {
  return (
    <>
      <Heading
        title="Courses Analytics - ByWay Learning Management System"
        description="This is the courses analytics page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}

      <CourseAnalytics />
    </>
  );
};

export default Page;
