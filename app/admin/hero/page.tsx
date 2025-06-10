"use client";
import React from "react";
import Heading from "@/utils/Heading";
import EditHero from "@/components/Admin/Content/EditHero";

const Page = () => {
  return (
    <>
      <Heading
        title="Hero (Admin) - ByWay Learning Management System"
        description="This is the Hero admin page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}

      <EditHero />
    </>
  );
};

export default Page;
