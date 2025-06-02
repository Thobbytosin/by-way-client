"use client";

import React, { useEffect, useState } from "react";
import UserProtected from "../../hooks/userProtected";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Profile from "../../components/Profile/Profile";
import Loader from "@/app/components/Loader/Loader";

type Props = {};

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  if (!isMounted && !user) {
    return <Loader key={"loading"} />;
  }

  return (
    <div>
      <Heading
        title={`${user?.name} Profile - ByWay Learning Management System`}
        description="This is an online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
      />

      <Header />

      <Profile />
    </div>
  );
};

export default Page;
