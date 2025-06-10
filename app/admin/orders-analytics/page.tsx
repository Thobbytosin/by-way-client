"use client";
import React from "react";
import Heading from "@/utils/Heading";
import OrdersAnalytics from "@/components/Admin/Analytics/OrdersAnalytics";

const Page = () => {
  return (
    <>
      <Heading
        title="Orders Analytics - ByWay Learning Management System"
        description="This is the orders analytics page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}

      <OrdersAnalytics />
    </>
  );
};

export default Page;
