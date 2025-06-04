import React from "react";

import Courses from "../../components/Courses/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses - ByWay Learning Management System",
  description:
    "This is the courses page of ByWay e-learning platform where people can have access to resources for learning",
  keywords: "Programming, MERN, TypeScript, ReactJs, NextJs, Web development",
};

export default async function CoursesPage() {
  return <Courses />;
}
