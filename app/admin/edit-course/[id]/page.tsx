"use client";
import Heading from "@/utils/Heading";
import React, { FC } from "react";
import EditCourse from "@/components/Admin/Course/EditCourse";

type Props = {};

const Page: FC<Props> = ({ params }: any) => {
  const pageId = params?.id;

  return (
    <>
      <Heading
        title="Edit Course - ByWay Learning Management System"
        description="This is the create course admin page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, User Login, Sign In"
      />

      {/* content */}
      <EditCourse id={pageId} />
    </>
  );
};

export default Page;
