import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { DoneAllIcon } from "../../icons/icons";
import Ratings from "../../utils/Ratings";
import Loader from "../Loader/Loader";
import Image from "next/image";
import { useCourseQueries } from "@/hooks/api/course.api";

type Props = {
  courseId: string;
  i: number;
  userCourse: any;
};

export const formatSameContentTime = (course: any) => {
  const seconds = course?.courseData?.reduce(
    (acc: number, c: any) => acc + c.videoDuration,
    0
  );

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Return formatted time
  return `${
    hours >= 1 ? `${hours}.${minutes} Total hours` : `${minutes} minutes`
  }`;
};

const UserCourseCard: FC<Props> = ({ courseId, i, userCourse }) => {
  const router = useRouter();
  const { courseDomain } = useCourseQueries({ type: "auth-course", courseId });
  const { course, courseLoading } = courseDomain;

  const calcPercentComplete = () => {
    const allCoursesNumber = userCourse?.progress?.length;
    const courseCompleteNumber = userCourse?.progress?.filter(
      (c: any) => c.viewed === true
    ).length;

    const percentageComplete: number =
      (courseCompleteNumber / allCoursesNumber) * 100;

    if (Number.isInteger(percentageComplete)) {
      return percentageComplete;
    } else {
      return percentageComplete.toFixed(2);
    }
  };

  return (
    <div className="">
      {courseLoading ? (
        <Loader />
      ) : (
        <div
          key={i}
          onClick={() => router.push(`/course-class/${course?._id}`)}
          className=" cursor-pointer w-[200px] lg:w-[250px] h-[320px] rounded-lg bg-white  dark:bg-gray-900 p-4 hover:shadow-lg hover:border hover:border-gray-200 hover:dark:border-gray-900 transition duration-500"
        >
          {/* thumbnail */}
          <div className=" w-full h-[150px] overflow-clip rounded-lg">
            {course?.thumbnail?.url ? (
              <Image
                src={course?.thumbnail?.url}
                alt="thumbnail"
                width={200}
                height={200}
                className=" w-full h-full object-cover"
              />
            ) : (
              <div className=" w-full h-full text-center dark:bg-gray-800 bg-gray-300 flex justify-center items-center font-medium">
                {" "}
                no_thumbnail
              </div>
            )}
          </div>

          {/* content */}

          <div className="mt-3">
            {/* course name */}
            <h4 className=" font-semibold lg:text-xs text-[10px] ">
              {course?.name}
            </h4>

            {/* ratings */}
            {course?.ratings && (
              <div className=" my-2 flex items-end gap-2">
                <Ratings key={i} rating={course?.ratings} color="text-golden" />
                <p className=" text-[12px]">
                  ({Math.ceil(course?.ratings * course?.purchase)} ratings)
                </p>
              </div>
            )}

            <div className=" mt-4  w-full">
              {/* percentage completed */}
              {calcPercentComplete() === 100 && (
                <>
                  <div className=" w-full h-[6px] rounded-full bg-success" />
                  <div className="mt-3 text-xs text-success text-end font-medium">
                    <DoneAllIcon color="inherit" fontSize="small" /> Completed
                  </div>
                </>
              )}

              {/* percentage not completed yet */}
              {calcPercentComplete() !== 100 && calcPercentComplete() !== 0 && (
                <>
                  <div className=" w-full h-[6px] rounded-full border border-gray-200 dark:border-gray-800 dark:bg-cyan-100 bg-gray-300 bg-opacity-40 dark:bg-opacity-30">
                    <div
                      className={`w-[${calcPercentComplete()}%] h-full bg-primary`}
                    />
                  </div>
                </>
              )}

              {/* percentage is zero */}
              {calcPercentComplete() === 0 && (
                <>
                  <div className=" w-full h-[6px] rounded-full border border-gray-200 dark:border-gray-800 dark:bg-cyan-100 bg-gray-300 bg-opacity-40 dark:bg-opacity-30" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCourseCard;
