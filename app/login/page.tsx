"use client";

import React, { FC } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Login from "../components/Auth/Login";

interface Props {}

const Page: FC<Props> = (props) => {
  return (
    <div className=" h-screen">
      <Heading
        title="Sign In - ByWay Learning Management System"
        description="This is the registration page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />
      <Header />

      <Login />
    </div>
  );
};

export default Page;
