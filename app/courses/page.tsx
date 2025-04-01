"use client";

import React, { FC, Suspense, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useRefreshTokenQuery } from "../../redux/api/apiSlice";
import Courses from "../components/Courses/Courses";
import Footer from "../components/Footer";
// import { useSearchParams } from "next/navigation";

interface Props {
  searchParams: {
    search?: string; // search query parameter from the URL
  };
}

const Page = ({ searchParams }: Props) => {
  const { refetch } = useRefreshTokenQuery({});
  // const searchParams = useSearchParams(); // This is client-side
  const search = searchParams?.search;

  // Refresh the token
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Heading
        title="Courses - ByWay Learning Management System"
        description="This is the courses page of ByWay e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
      />

      <Header activeItem={0} />

      {/* Pass the search prop to the Courses component */}
      <Suspense>
        <Courses search={search} />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Page;
