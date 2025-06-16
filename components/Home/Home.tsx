/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import ServerErrorUI from "./ServerErrorUI";
import Hero from "./Hero";
import SuccessCount from "./SuccessCount";
import Categories from "./Categories";
import LittleDesc from "./LittleDesc";
import CoursesCategory from "./CoursesCategory";
import Features from "./Features";
import Testimonials from "./Testimonials";
import LatestBlogs from "./LatestBlogs";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useContentQueries } from "@/hooks/api/content.api";
import { useCourseQueries } from "@/hooks/api/course.api";
import { useUserQueries } from "@/hooks/api/user.api";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import { styles } from "@/styles/style";
import { getCookie } from "@/utils/helpers";
import CookiesConsent from "../CookiesConsent";

const Home = () => {
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const courses = useSelector((state: RootState) => state.course.coursesFree);
  const { contentDomainData, contentDomainLoading } = useContentQueries({
    hero: true,
    categories: true,
  });
  const { hero, categories } = contentDomainData;
  const { heroLoading, categoriesLoading } = contentDomainLoading;
  const { coursesFreeDomain } = useCourseQueries({ type: "free-list" });
  const { coursesLoading } = coursesFreeDomain;
  const { usersDomainData } = useUserQueries({ type: "user-lists" });
  const { usersList } = usersDomainData;
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  // for cookie consent
  useEffect(() => {
    if (!isMounted) return;
    if (typeof window === "undefined") return;

    const consent = getCookie("cookie_consent");

    if (!consent) {
      setShowConsent(true);
      return;
    }
  }, [isMounted]);

  // fetch user latest role
  const fetchUsersData = (userId: string) => {
    const updatedUser = usersList?.filter((user: any) => user._id === userId);

    return {
      role: updatedUser?.[0]?.role,
      name: updatedUser?.[0]?.name,
      avatar: updatedUser?.[0]?.avatar,
    };
  };

  // create new all courses reviews array
  const allReviews = Array.from(
    new Set(courses?.map((item: any) => item.reviews))
  );

  const updatedReviews = allReviews?.flatMap((item: any) => item);

  if (!isMounted) return null;

  if (heroLoading || categoriesLoading || coursesLoading) {
    return <Loader key={"loading"} />;
  }

  return (
    <>
      <div className={styles.pageMinSize}>
        {!heroLoading && !categoriesLoading && !coursesLoading && <Header />}

        {serverLoading ? (
          <Loader key={"loading"} />
        ) : serverError ? (
          <ServerErrorUI errorMessage={serverError} />
        ) : (
          <>
            <Hero hero={hero} />

            <SuccessCount
              coursesLength={courses?.length}
              usersLength={usersDomainData.usersList?.length}
            />

            <Categories
              isLoading={categoriesLoading}
              data={categories}
              key={1}
              coursesData={courses}
            />

            <LittleDesc />

            <CoursesCategory courses={courses} />

            <Features />

            {usersDomainData.usersList && updatedReviews && (
              <Testimonials
                reviews={updatedReviews}
                fetchUsersData={fetchUsersData}
              />
            )}

            {/* //  latest resources  */}
            <LatestBlogs />

            <Footer />
          </>
        )}

        {showConsent && <CookiesConsent setShowConsent={setShowConsent} />}
      </div>
    </>
  );
};

export default Home;
