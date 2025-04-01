import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { AccessTimeIcon, GridViewIcon } from "../../icons/icons";
import Ratings from "../../utils/Ratings";
import Image from "next/image";

type Props = {
  course: any;
  i: number;
};

export const formatSameContentTime = (course: any) => {
  const seconds = course?.courseData?.reduce(
    (acc: number, c: any) => acc + c.videoDuration,
    0
  );

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // console.log(hours, typeof hours);

  // Return formatted time
  return `${
    hours >= 1 ? `${hours}.${minutes} Total hours` : `${minutes} minutes`
  }`;
};

const CourseCard: FC<Props> = ({ course, i }) => {
  const router = useRouter();

  return (
    <div
      key={i}
      onClick={() => router.push(`/course-details/${course._id}`)}
      className=" cursor-pointer w-[220px] lg:w-[270px] h-[400px] rounded-lg bg-white  dark:bg-gray-900 p-4 hover:shadow-lg hover:border hover:border-gray-200 hover:dark:border-gray-900 transition duration-500"
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

      {/* category and duration */}
      <div className=" w-full flex justify-between items-center mt-4">
        <div className=" flex gap-1 items-center">
          <div className="text-gray-500 text-md">
            <GridViewIcon color="inherit" fontSize="inherit" />
          </div>
          <p className=" text-gray-800 dark:text-gray-500 lg:text-[12px] text-[10px] ">
            {course?.category}
          </p>
        </div>

        {/* video duration */}
        {course?.courseData?.find((c: any) => c.videoDuration) && (
          <div className=" flex gap-1 items-center">
            <div className="text-gray-500 text-md">
              <AccessTimeIcon color="inherit" fontSize="inherit" />
            </div>
            <p className=" text-gray-500 lg:text-[12px] text-[10px]">
              {/* {course?.courseData?.reduce(
            (acc: number, c: any) => acc + c.videoDuration,
            0
          )} */}
              {formatSameContentTime(course)}
              {/* hours */}
            </p>
          </div>
        )}
      </div>

      {/* content */}

      <div className="mt-3">
        {/* course name */}
        <h4 className=" font-semibold lg:text-sm text-[12px] mb-2">
          {course.name}
        </h4>

        {/* ratings */}
        <div className=" flex items-end gap-2">
          <Ratings key={i} rating={course?.ratings} color="text-golden" />
          <p className=" text-[12px]">
            ({Math.ceil(course.ratings * course.purchase)} ratings)
          </p>
        </div>

        {/* lectures and level */}
        <p className=" w-full flex gap-4 mt-4 text-gray-900 dark:text-gray-100 font-medium sm:text-sm text-xs">
          <span>
            {course?.courseData?.length}{" "}
            {course?.courseData?.length === 1 ? "Lecture." : "Lectures."}
          </span>
          <span className="text-primary underline">{course?.level}</span>
        </p>

        {/* price */}
        <div className=" flex items-start gap-3 mt-4">
          <h3 className=" font-semibold lg:text-2xl text-xl">
            &#8358; {(course?.price).toLocaleString()}
          </h3>
          <h3 className=" opacity-50 font-medium line-through">
            &#8358; {(course?.estimatedPrice).toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
