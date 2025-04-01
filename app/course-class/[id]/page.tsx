"use client";

import React, { useEffect } from "react";
import UserProtected from "../../hooks/userProtected";
import {
  useLoadUserQuery,
  useRefreshTokenQuery,
} from "../../../redux/api/apiSlice";
import CourseClass from "../../components/Course/Class/CourseClass";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

type Props = {};

const Page = ({ params }: any) => {
  const id = params.id;

  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });
  const { data, isLoading, error } = useLoadUserQuery(undefined, {});

  // refresh token when page loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  // check if user has purchased this course
  useEffect(() => {
    if (data) {
      const hasUserPurchased = data.user.courses.find(
        (c: any) => c.courseId === id
      );
      if (!hasUserPurchased) {
        toast.error("Access Denied: You have not purchased this course");
        redirect("/");
      }
    }

    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <div>
      <UserProtected>
        {isLoading ? (
          <div className=" w-screen h-screen">
            <Loader />
          </div>
        ) : (
          <>
            <CourseClass courseId={id} />
          </>
        )}
      </UserProtected>
    </div>
  );
};

export default Page;
