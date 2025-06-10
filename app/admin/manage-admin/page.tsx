"use client";
import Heading from "@/utils/Heading";
import React from "react";
import AllUsers from "@/components/Admin/Users/AllUsers";

const Page = () => {
  return (
    <>
      <Heading
        title="Users - ByWay Learning Management System"
        description="This is the users page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <AllUsers isTeam />
    </>
  );
};

export default Page;
