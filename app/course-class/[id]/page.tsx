"use client";

import React, { useEffect, useState } from "react";
import UserProtected from "../../hooks/userProtected";
import {
  useLoadUserQuery,
  useRefreshTokenQuery,
} from "../../../redux/api/apiSlice";
import CourseClass from "../../components/Course/Class/CourseClass";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { useGetCourseContentDataQuery } from "@/redux/course/courseApi";

type Props = {};

const Page = ({ params }: any) => {
  const id = params.id;

  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });
  const { user } = useSelector((state: any) => state.auth);
  const [courseId, setCourseId] = useState<string | null>(null);
  const {
    data: courseData,
    refetch: courseContentRefetch,
    isLoading,
  } = useGetCourseContentDataQuery(courseId, {});

  // refresh token when page loads

  // check if user has purchased this course
  useEffect(() => {
    const hasUserPurchased = user.courses.find((c: any) => c.courseId === id);
    if (!hasUserPurchased) {
      toast.error("Access Denied: You have not purchased this course");
      redirect("/");
      return;
    }
    console.log(hasUserPurchased);
    setCourseId(hasUserPurchased.courseId);

    // if (error) {
    //   redirect("/");
    // }
  }, [id, user, courseId]);

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
