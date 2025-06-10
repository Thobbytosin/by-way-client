"use client";
import Heading from "@/utils/Heading";
import React from "react";
import CreateCourse from "@/components/Admin/Course/CreateCourse";

const Page = () => {
  return (
    <>
      <Heading
        title="Create Course - ByWay Learning Management System"
        description="This is the create course admin page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <CreateCourse />
    </>
  );
};

export default Page;
