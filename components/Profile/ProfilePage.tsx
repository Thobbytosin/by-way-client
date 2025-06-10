/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import Profile from "@/components/Profile/Profile";
import Loader from "@/components/Loader/Loader";
import { RootState } from "@/redux/store";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import ServerErrorUI from "@/components/Home/ServerErrorUI";
import { useRouter } from "next/navigation";

type Props = {};

const ProfilePage = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  //   const router = useRouter();

  //   const cookies = document?.cookie;
  //   const token = cookies
  //     .split("; ")
  //     .find((row) => row.startsWith("access_Token="));
  //   console.log("COOKIES:", cookies);

  //   useEffect(() => {
  //     const cookies = document?.cookie;
  //     const token = cookies
  //       .split("; ")
  //       .find((row) => row.startsWith("access_Token="));

  //     if (!token) {
  //       router.push("/");
  //     }
  //   }, []);

  if (!isMounted) {
    return <Loader key={"loading"} />;
  }

  return (
    <>
      <Heading
        title={`${user?.name} Profile - ByWay Learning Management System`}
        description="This is an online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
      />

      <Header />
      {serverLoading ? (
        <Loader key={"loading"} />
      ) : serverError ? (
        <ServerErrorUI errorMessage={serverError} />
      ) : (
        <Profile />
      )}
    </>
  );
};

export default ProfilePage;
