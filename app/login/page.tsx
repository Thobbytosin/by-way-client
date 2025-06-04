import React, { FC } from "react";
import Login from "../../components/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - ByWay Learning Management System",
  description:
    "This is the login page of online e-learning platform where people can have access to resources for learning",
  keywords:
    "Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In",
};

export default async function LoginPage() {
  return <Login />;
}
