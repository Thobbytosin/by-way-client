import React from "react";
import { Metadata } from "next";
import Register from "../../components/Auth/Register";

export const metadata: Metadata = {
  title: "Registration - ByWay Learning Management System",
  description:
    "This is the registration page of online e-learning platform where people can have access to resources for learning",
  keywords:
    "Programming, MERN, TypeScript, ReactJs, NextJs, User registration, Sign up",
};

export default async function UserRegistrationPage() {
  return <Register />;
}
