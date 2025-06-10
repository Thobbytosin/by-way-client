"use client";
import React from "react";
import Heading from "@/utils/Heading";
import EditFaq from "@/components/Admin/Content/EditFaq";

const Page = () => {
  return (
    <>
      <Heading
        title="Frequently Asked Questions (Admin) - ByWay Learning Management System"
        description="This is the Admin FAQS of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}

      <EditFaq />
    </>
  );
};

export default Page;
