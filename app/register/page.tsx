"use client";

import React, { FC, useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Register from "../components/Auth/Register";

interface Props {}

const Page: FC<Props> = (props) => {
  return (
    <div className=" h-screen">
      <Heading
        title="Registration - ByWay Learning Management System"
        description="This is the registration page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User registration, Sign up"
      />
      <Header />

      <Register />
    </div>
  );
};

export default Page;
