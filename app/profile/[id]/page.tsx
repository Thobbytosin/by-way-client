"use client";

import React, { useState, useEffect } from "react";
import UserProtected from "../../hooks/userProtected";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Profile from "../../components/Profile/Profile";
import { useRefreshTokenQuery } from "../../../redux/api/apiSlice";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const { user } = useSelector((state: any) => state.auth);
  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });

  // refresh token when page loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <UserProtected>
        <Heading
          title={`${user?.name} Profile - ByWay Learning Management System`}
          description="This is an online e-learning platform where people can have access to resources for learning"
          keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Web development"
        />

        <Header activeItem={activeItem} />

        <Profile />
      </UserProtected>
    </div>
  );
};

export default Page;
