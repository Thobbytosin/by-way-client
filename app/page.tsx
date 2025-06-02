/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { FC, use, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Home/Hero";
import CoursesCategory from "./components/Home/CoursesCategory";
import Loader from "./components/Loader/Loader";
import SuccessCount from "./components/Home/SuccessCount";
import Categories from "./components/Home/Categories";
import LittleDesc from "./components/Home/LittleDesc";
import Features from "./components/Home/Features";
import Testimonials from "./components/Home/Testimonials";
import LatestBlogs from "./components/Home/LatestBlogs";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useContentQueries } from "./hooks/api/content.api";
import { useCourseQueries } from "./hooks/api/course.api";
import { useUserQueries } from "./hooks/api/user.api";
import { useServerStatus } from "./hooks/api/useServerStatus";
import ServerErrorUI from "./components/Home/ServerErrorUI";

interface Props {}

const Page: FC<Props> = (props) => {
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const courses = useSelector((state: RootState) => state.course.coursesFree);
  const { hero, loading: contentLoading, categories } = useContentQueries();
  const { coursesFreeDomain } = useCourseQueries();
  const { usersDomainData } = useUserQueries();
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });
  const { user } = useSelector((state: RootState) => state.auth);
  // console.log("USER", user);

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  // fetch user latest role
  const fetchUsersData = (userId: string) => {
    const updatedUser = usersDomainData.usersList?.filter(
      (user: any) => user._id === userId
    );

    return {
      role: updatedUser[0]?.role,
      name: updatedUser[0]?.name,
      avatar: updatedUser[0]?.avatar,
    };
  };

  // create new all courses reviews array
  const allReviews = Array.from(
    new Set(courses?.map((item: any) => item.reviews))
  );

  const updatedReviews = allReviews?.flatMap((item: any) => item);

  if (!isMounted) return null;

  if (serverLoading || contentLoading || coursesFreeDomain.loading) {
    return <Loader key={"loading"} />;
  }

  return (
    <>
      <div>
        <Heading
          title="ByWay Learning Management System"
          description="This is an online e-learning platform where people can have access to resources for learning"
          keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
        />

        {!contentLoading && !coursesFreeDomain.loading && <Header />}

        {!serverLoading && serverError ? (
          <ServerErrorUI errorMessage={serverError} />
        ) : (
          <>
            <Hero hero={hero} />

            <SuccessCount
              coursesLength={courses?.length}
              usersLength={usersDomainData.usersList?.length}
            />

            <Categories
              isLoading={contentLoading}
              data={categories}
              key={1}
              coursesData={courses}
            />

            <LittleDesc />

            <CoursesCategory courses={courses} />

            <Features />

            <Testimonials
              reviews={updatedReviews}
              fetchUsersData={fetchUsersData}
            />

            {/* //  latest resources  */}
            <LatestBlogs />
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Page;
