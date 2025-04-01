"use client";

import React, { FC, useEffect } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import { useRefreshTokenQuery } from "../redux/api/apiSlice";
import Hero from "./components/Home/Hero";
import CoursesCategory from "./components/Home/CoursesCategory";
import { useGetAllCoursesWithoutPurchaseQuery } from "../redux/course/courseApi";
import { useGetHeroDataQuery } from "../redux/layout/layoutApi";
import { useGetUserLatestQuery } from "../redux/user/userApi";
import Loader from "./components/Loader/Loader";
import SuccessCount from "./components/Home/SuccessCount";
import Categories from "./components/Home/Categories";
import LittleDesc from "./components/Home/LittleDesc";
import Features from "./components/Home/Features";
import Testimonials from "./components/Home/Testimonials";
import LatestBlogs from "./components/Home/LatestBlogs";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const { refetch: refetchedData } = useRefreshTokenQuery(undefined, {
    skip: false,
  });

  const {
    data: coursesData,
    isLoading,
    refetch,
  } = useGetAllCoursesWithoutPurchaseQuery({});

  // console.log(coursesData);

  // get banner
  const {
    data: heroData,
    isLoading: heroIsLoading,
    refetch: heroRefetched,
  } = useGetHeroDataQuery("Banner", {
    skip: false,
  });

  // TO GET USER COUNT
  const {
    data: usersData,
    refetch: refetchUsersData,
    isLoading: usersLoading,
  } = useGetUserLatestQuery(undefined, {
    skip: false,
  });

  // get categories

  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    refetch: categoriesRefetched,
  } = useGetHeroDataQuery("Categories", {
    skip: false,
  });

  // refresh the token
  useEffect(() => {
    refetchedData();
    refetch();
    heroRefetched();
    refetchUsersData();
  }, [
    coursesData,
    usersData,
    refetch,
    refetchUsersData,
    refetchedData,
    heroRefetched,
  ]);

  // fetch user latest role
  const fetchUsersData = (userId: string) => {
    const updatedUser = usersData?.users?.filter(
      (user: any) => user._id === userId
    );

    return {
      role: updatedUser[0]?.role,
      name: updatedUser[0]?.name,
      avatar: updatedUser[0]?.avatar,
    };
  };

  // console.log(usersData);

  // create new all courses reviews array
  const allReviews = Array.from(
    new Set(coursesData?.courses?.map((item: any) => item.reviews))
  );

  const updatedReviews = allReviews.flatMap((item: any) => item);

  // console.log(updatedReviews);

  return (
    <div>
      <Heading
        title="ByWay Learning Management System"
        description="This is an online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
      />

      <Header />

      {heroIsLoading || isLoading || usersLoading ? (
        <Loader key={1} />
      ) : (
        <>
          {/* Hero */}
          <Hero data={heroData} />

          {/* Success Count */}
          <SuccessCount
            coursesLength={coursesData?.courses.length}
            usersLength={usersData?.users.length}
          />

          {/* Categories */}
          <Categories
            isLoading={categoriesIsLoading}
            data={categoriesData?.layout?.categories}
            key={1}
            coursesData={coursesData?.courses}
          />

          {/* blog */}
          <LittleDesc />

          {/* Courses category */}
          <CoursesCategory data={coursesData} isLoading={isLoading} />

          {/* features */}
          <Features />

          {/* testimonials */}
          <Testimonials
            reviews={updatedReviews}
            fetchUsersData={fetchUsersData}
          />

          {/* latest resources */}
          <LatestBlogs />
        </>
      )}

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Page;
