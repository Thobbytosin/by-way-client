import React, { FC } from "react";
import UserCourseCard from "./UserCourseCard";

type Props = {
  user: any;
};

const UserCourses: FC<Props> = ({ user }) => {
  // console.log(user);

  return (
    <div className="sm:p-8 p-4">
      <h1 className=" text-2xl sm:text-start text-center font-semibold">
        Courses <span className=" text-sm">({user?.courses?.length})</span>
      </h1>

      <div className=" mt-10 flex sm:flex-row flex-col gap-4 sm:justify-start justify-center items-center flex-wrap">
        {user?.courses?.map((course: any, index: number) => (
          <UserCourseCard
            key={index}
            i={index}
            courseId={course.courseId}
            userCourse={course}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
