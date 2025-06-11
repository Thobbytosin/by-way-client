/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import Heading from "@/utils/Heading";
import Header from "@/components/Header";
import Profile from "@/components/Profile/Profile";
import Loader from "@/components/Loader/Loader";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import ServerErrorUI from "@/components/Home/ServerErrorUI";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

type Props = {};

const ProfilePage = (props: Props) => {
  const { user, loading, allowedToRender } = useProtectedRoute({});
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });

  if (loading || !allowedToRender || serverLoading) {
    return <Loader key="loading" />;
  }

  // If server error
  if (serverError) {
    return <ServerErrorUI errorMessage={serverError} />;
  }

  return (
    <>
      <Heading
        title={`${user?.name} Profile - ByWay Learning Management System`}
        description="This is an online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
      />

      <Header />
      <Profile />
    </>
  );
};

export default ProfilePage;
