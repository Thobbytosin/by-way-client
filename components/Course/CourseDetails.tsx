import {
  CheckIcon,
  ChevronRightIcon,
  LanguageIcon,
  PlayArrowIcon,
  SchoolIcon,
  WorkspacePremiumIcon,
} from "@/icons/icons";
import { styles } from "@/styles/style";
import Ratings from "@/utils/Ratings";
import React, { FC, useState } from "react";
import { formatSameContentTime } from "./CourseCard";
import CourseSyllabus from "./CourseSyllabus";
import CoursePlayer from "@/utils/CoursePlayer";
import { extras, getDiscountedPrice } from "../Admin/Course/CoursePreview";
import PaymentModal from "./Payment/PaymentModal";
import { useRouter } from "next/navigation";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Course } from "@/types/course";
import { RootState } from "@/redux/store";
import { useUserQueries } from "@/hooks/api/user.api";
import avatarFallback from "@/public/assets/avatar.png";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  course: Course | undefined;
};

const CourseDetails: FC<Props> = ({ course }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { adminDomainData } = useUserQueries({ type: "admin" });
  const { admin } = adminDomainData;

  const hasUserBoughtCourse = user?.courses?.find(
    (c: any) => c.courseId === course?._id
  );

  const handleOrder = () => {
    setOpen(true);
  };

  return (
    <>
      {course && (
        <div
          className={`${styles.paddingX} py-10 justify-between flex sm:flex-row flex-col items-start gap-6`}
        >
          <div className=" w-full sm:w-[60%]">
            {/* page tag */}
            <div className="flex gap-3 items-center text-[10px] sm:text-xs">
              <p>Home</p>
              <ChevronRightIcon fontSize="inherit" />
              <p>Courses</p>
              <div className="sm:inline-block hidden">
                <ChevronRightIcon fontSize="inherit" />
              </div>
              <p className=" sm:inline hidden">{course?.category}</p>
              <ChevronRightIcon fontSize="inherit" />
              <p className="text-primary">{course?.name}</p>
            </div>

            {/* course name */}
            <h1 className=" font-semibold text-xl sm:text-2xl my-5">
              {course?.name}
            </h1>

            {/* course description */}
            <p className={styles.detailsDescription}>{course?.description}</p>

            {/* ratings */}
            <div className=" lg:flex lg:items-start mt-8">
              {/* ratings icon */}
              <div className=" flex  items-center mr-3">
                <span className="text-golden mr-1">
                  {Number.isInteger(course?.ratings)
                    ? course?.ratings.toFixed(1)
                    : course?.ratings}
                </span>
                <Ratings color="text-golden" rating={course?.ratings} />
                {/* total ratings */}
                <p className=" font-semibold text-xs lg:text-sm ml-2">
                  ({Math.ceil(course.ratings * course.purchase)} ratings)
                </p>
              </div>

              <div className=" flex mt-4 lg:mt-0 ">
                {/* divider */}
                <div className="hidden lg:inline-block h-[20px] bg-slate-900 dark:bg-slate-100 w-[2px] mx-4" />

                {/* time/ lectures */}
                <p className="mr-2 font-semibold text-sm">
                  {formatSameContentTime(course)}.
                </p>
                <p className="font-semibold text-sm flex items-center">
                  <span className="mr-2 flex items-center ">
                    {course?.courseData?.length}{" "}
                    {course?.courseData?.length === 1
                      ? "Lecture."
                      : "Lectures."}
                  </span>
                  <span>{course?.level}</span>
                </p>
              </div>
            </div>

            {/* creator */}
            <div className="flex items-center gap-3 mt-8">
              <div className="relative w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                <Image
                  src={admin ? admin?.avatar?.url : avatarFallback}
                  alt="admin_image"
                  fill
                  className=" object-contain"
                />
              </div>
              <p className=" text-sm font-medium">
                Created by <span className=" text-primary">{admin?.name}</span>
              </p>
            </div>

            <br />

            {/* language */}
            <div className="flex gap-2 items-center text-gray-700 dark:text-gray-400 mt-6">
              <LanguageIcon color="inherit" />
              <span className=" text-sm">English </span>
            </div>

            <br />
            <br />
            {/* content */}

            {/* descriptions and certifications */}

            <div className=" border-y border-gray-300 dark:border-gray-800 py-8 mb-8">
              {/* descriptions */}
              <h3 className={styles.detailsSubTagHeading}>
                Course Description
              </h3>
              <p className={styles.detailsDescription}>{course?.description}</p>
              {/* certiication */}
              <h3 className={`${styles.detailsSubTagHeading} mt-4`}>
                Course Certification
              </h3>
              <p className={styles.detailsDescription}>
                At Byway, we understand the significance of formal recognition
                for your hard work and dedication to continuous learning. Upon
                successful completion of our courses, you will earn a
                prestigious certification that not only validates your expertise
                but also opens doors to new opportunities in your chosen field.
              </p>
              {/* prerequisites */}
              <h3 className={`${styles.detailsSubTagHeading} mt-4`}>
                What are the prerequisites for taking this course?
              </h3>
              {course?.prerequisites?.map((item: any, index: number) => (
                <div
                  key={index}
                  className=" flex items-center gap-1 text-xs opacity-85 mb-1"
                >
                  <CheckIcon fontSize="inherit" />
                  <span className={styles.detailsDescription}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* instructor */}
            <div className=" border-b border-gray-300 dark:border-gray-800 pb-8 mb-8">
              {/* descriptions */}
              <h3 className={styles.detailsSubTagHeading}>Instructor</h3>

              <h3 className=" text-lg font-medium text-primary leading-7">
                {admin?.name}
              </h3>
              <p>Teacher</p>

              {/* teacher avatar */}
              <div className="flex items-center gap-3 mt-6">
                <div className="relative w-20 h-20 rounded-full border-2 border-primary overflow-hidden">
                  <Image
                    src={admin ? admin?.avatar?.url : avatarFallback}
                    fill
                    alt="admin_image"
                    className=" object-contain"
                  />
                </div>
                <div>
                  <p className=" text-sm font-medium">
                    <WorkspacePremiumIcon />{" "}
                    <span className="">1732 Reviews</span>
                  </p>
                  <p className=" text-sm font-medium mt-1.5">
                    <SchoolIcon /> <span className="">805 Students</span>
                  </p>
                  <p className=" text-sm font-medium mt-1.5">
                    <PlayArrowIcon /> <span className="">64 Courses</span>
                  </p>
                </div>
              </div>

              {/* about */}
              <p className="text-xs sm:text-sm leading-5 sm:leading-7 mt-4">
                With over a decade of industry experience, Ronald brings a
                wealth of practical knowledge to the classroom. He has played a
                pivotal role in designing user-centric interfaces for renowned
                tech companies, ensuring seamless and engaging user experiences.
              </p>
            </div>

            {/* syllabus */}
            <div className="border-b border-gray-300 dark:border-gray-800 pb-8 mb-8">
              {/* descriptions */}
              <h3 className={styles.detailsSubTagHeading}>Syllabus</h3>

              <div className="mt-4 sm:mt-8 w-full lg:w-[80%] border border-gray-300 dark:border-gray-800 rounded-lg">
                <CourseSyllabus content={course?.courseData} />
              </div>
            </div>
          </div>

          {/* side bar */}
          <aside className="sm:sticky h-fit right-0 top-[6rem] w-full sm:w-[35%] lg:w-[30%] p-4 rounded-lg bg-white dark:bg-slate-950 shadow-lg">
            <div className="w-full">
              {/* intro video */}
              <div className=" w-full">
                <CoursePlayer key={course?._id} link={course?.demoUrl} />
              </div>

              {/* price */}
              <div className=" mt-4 lg:flex lg:items-start">
                <h2 className=" text-2xl font-semibold">
                  {(course?.price).toLocaleString()} &#8358;
                </h2>
                <div className=" flex items-start gap-2 ">
                  <h3 className="text-base my-1.5 lg:mt-0 lg:ml-4 opacity-50 font-medium line-through">
                    {(course?.estimatedPrice).toLocaleString()} &#8358;
                  </h3>
                  {course?.estimatedPrice && (
                    <h3 className="lg:text-base text-sm  lg:mt-0 lg:ml-4 font-semibold text-warning ">
                      {Math.ceil(getDiscountedPrice(course) ?? 0)}% Off
                    </h3>
                  )}
                </div>
              </div>

              {/* price button */}
              {loading ? (
                <span className=" my-4">
                  <SimpleLoader isAdmin />
                </span>
              ) : (
                <button
                  onClick={
                    user
                      ? hasUserBoughtCourse
                        ? () => {
                            setLoading(true);
                            router.push(`/course-class/${course?._id}`);
                          }
                        : () => {
                            setLoading(true);
                            handleOrder();
                          }
                      : () => {
                          setLoading(true);
                          toast.error("You are not logged in");
                          router.push(`/login`);
                        }
                  }
                  className={`inline-block text-base  font-medium text-white ${
                    hasUserBoughtCourse ? "bg-success" : "bg-warning"
                  }  rounded-full px-6 py-2  my-2`}
                >
                  {hasUserBoughtCourse ? (
                    <span>Go to course!</span>
                  ) : (
                    <span>
                      {`Buy now  ${course.price.toLocaleString()}`} &#8358;
                    </span>
                  )}
                </button>
              )}

              {/* extras */}
              <div className=" mt-2">
                {extras.map((item, index) => (
                  <div key={index} className=" flex gap-1 items-center mb-2">
                    <div className=" h-1 w-1 rounded-full dark:bg-slate-50 bg-secondary" />
                    <span className=" text-[10px] lg:text-xs">{item}</span>
                  </div>
                ))}
              </div>

              {/* benefits */}
              <h2 className=" font-medium my-2 text-sm">
                What will you learn from this course?
              </h2>
              {course?.benefits?.map((item: any, index: number) => (
                <div
                  key={index}
                  className=" flex items-center gap-1 text-xs opacity-85 mb-1"
                >
                  <CheckIcon fontSize="inherit" />
                  <span className="text-[10px] lg:text-xs ">{item.title}</span>
                </div>
              ))}
            </div>
          </aside>

          {open && (
            <PaymentModal
              open={open}
              setOpen={setOpen}
              course={course}
              setLoading={setLoading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseDetails;
