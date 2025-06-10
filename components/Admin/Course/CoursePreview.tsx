import React, { FC } from "react";
import CoursePlayer from "@/utils/CoursePlayer";
import Ratings from "@/utils/Ratings";
import { CheckIcon } from "@/icons/icons";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseEdit?: any;
  handleCourseCreate?: any;
  isEdit?: boolean;
};

export const extras = [
  "Source code included",
  "Full lifetime access",
  "Certificate upon completion",
  "Premium Support",
];

// calculate discounted price
export const getDiscountedPrice = (courseData: any): number | undefined => {
  if (courseData.price && courseData.estimatedPrice) {
    return (
      ((courseData.estimatedPrice - courseData.price) /
        courseData.estimatedPrice) *
      100
    );
  }

  return 0;
};

const CoursePreview: FC<Props> = ({
  active,
  courseData,
  setActive,
  handleCourseEdit,
  handleCourseCreate,
  isEdit,
}) => {
  //  previous page
  const prevButton = () => {
    setActive(active - 1);
  };

  // handle edit course
  const handleCreate = () => {
    handleCourseCreate();
  };
  // handle edit course
  const handleEdit = () => {
    handleCourseEdit();
  };

  return (
    <div className=" mt-[6rem] w-[80%]">
      <div className=" w-full relative">
        <div className="w-full bg-black dark:bg-black">
          <CoursePlayer
            key={courseData?.name}
            link={
              courseData?.videoPreview.trim() === ""
                ? courseData?.demoVideo
                : courseData?.videoPreview
            }
            isClass
          />
        </div>
      </div>

      {/* price */}
      <div className=" mt-4 flex items-start">
        <h2 className=" text-2xl font-medium">
          {String(courseData?.price).toLocaleString()} &#8358;
        </h2>
        <h3 className=" ml-4 opacity-50 font-medium line-through">
          {String(courseData?.estimatedPrice).toLocaleString()} &#8358;
        </h3>
        {courseData?.estimatedPrice && (
          <h3 className=" ml-4 font-medium ">
            {Math.ceil(getDiscountedPrice(courseData) ?? 0)}% Off
          </h3>
        )}
      </div>

      {/* price button */}
      <div className=" inline-block text-lg font-medium text-white bg-red-500 rounded-full py-2 px-4 my-4">
        {courseData.price} &#8358;
      </div>

      {/* coupon form */}
      <form className=" flex gap-2 items-center">
        <input
          type="text"
          id="coupon"
          name="coupon"
          placeholder="Coupon code.."
          className=" w-[70%] bg-transparent border border-gray-500 outline-none rounded-md text-sm p-2"
        />

        <button className=" text-white bg-primary rounded-full py-2 px-6 font-medium text-sm">
          Apply
        </button>
      </form>

      {/* extras */}
      <div className=" mt-4">
        {extras.map((item, index) => (
          <div key={index} className=" flex gap-1 items-center mb-2">
            <div className=" h-1 w-1 rounded-full dark:bg-slate-50 bg-secondary" />
            <span className="text-sm ">{item}</span>
          </div>
        ))}
      </div>
      <br />
      {/* course name */}

      <h1 className=" text-3xl font-semibold mb-4">{courseData?.name}</h1>

      {/* ratings */}
      <div className=" w-full flex items-end gap-4">
        <div>
          <Ratings
            rating={isEdit ? courseData?.ratings : 0}
            color="text-primary"
          />
        </div>
        <div className="w-[50%] flex justify-between items-center">
          <p className=" text-sm ml-2">
            {isEdit ? courseData?.reviews?.length : 0}{" "}
            {isEdit
              ? courseData?.reviews?.length === 1
                ? "Review"
                : "Reviews"
              : "Reviews"}
          </p>
          <p className=" text-sm ml-2">
            {isEdit ? courseData?.purchase : 0}{" "}
            {isEdit
              ? courseData?.purchase === 1
                ? "Student"
                : "Students"
              : "Students"}
          </p>
        </div>
      </div>

      {/* benefits */}
      <h2 className=" text-2xl font-medium mt-4 mb-2">
        What will you learn from this course?
      </h2>
      {courseData?.benefits?.map((item: any, index: number) => (
        <div
          key={index}
          className=" flex items-center gap-1 text-xs opacity-85 mb-1"
        >
          <CheckIcon fontSize="inherit" />
          <span className=" text-sm">{item.title}</span>
        </div>
      ))}

      {/* prerequisites */}
      <h2 className=" text-2xl font-medium mt-4 mb-2">
        What are the prerequisites for taking this course?
      </h2>
      {courseData?.prerequisites?.map((item: any, index: number) => (
        <div
          key={index}
          className=" flex items-center gap-1 text-xs opacity-85 mb-1"
        >
          <CheckIcon fontSize="inherit" />
          <span className=" text-sm">{item.title}</span>
        </div>
      ))}

      {/* course details */}
      <h2 className=" text-2xl font-medium mt-4 mb-2">Course Details</h2>
      <p className=" mt-4 text-sm">{courseData.description}</p>

      <br />
      <br />
      {/* prev button and next button */}
      <div className="mt-8 w-full flex justify-between">
        <button
          onClick={prevButton}
          className=" bg-warning text-white px-6 py-2 rounded-md"
        >
          Prev
        </button>
        <button
          onClick={isEdit ? handleEdit : handleCreate}
          className={`${
            isEdit ? "bg-success" : "bg-primary"
          } font-semibold text-lg text-white px-6 py-2 rounded-md`}
        >
          {isEdit ? "Update Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
