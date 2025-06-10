"use client";
import React from "react";
import Heading from "@/utils/Heading";
import EditCategories from "@/components/Admin/Content/EditCategories";

const Page = () => {
  return (
    <>
      <Heading
        title="Categories (Admin) - ByWay Learning Management System"
        description="This is the categories admin page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <EditCategories />
    </>
  );
};

export default Page;
