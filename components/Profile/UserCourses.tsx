import React, { FC } from "react";
import UserCourseCard from "./UserCourseCard";
import { useUserQueries } from "@/hooks/api/user.api";
import Loader from "../Loader/Loader";

type Props = {
  user: any;
};

const UserCourses: FC<Props> = ({ user }) => {
  const { userCoursesSummaryDomainData } = useUserQueries({
    type: "user-courses-summary",
  });
  const { userCoursesSummary, userCoursesSummaryLoading } =
    userCoursesSummaryDomainData;

  if (userCoursesSummaryLoading) return <Loader />;

  return (
    <div className="sm:p-8 p-4">
      <h1 className=" text-2xl sm:text-start text-center font-semibold">
        Courses <span className=" text-sm">({user?.courses?.length})</span>
      </h1>

      <div className=" mt-10 flex sm:flex-row flex-col gap-4 sm:justify-start justify-center items-center flex-wrap">
        {userCoursesSummary?.map((course, index: number) => (
          <UserCourseCard key={index} i={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
