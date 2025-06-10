import { styles } from "@/styles/style";
import React, { FC } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {
  courses: any[];
};

const CoursesCategory: FC<Props> = ({ courses }) => {
  return (
    <div
      className={`w-full  dark:bg-black bg-gray-200 ${styles.paddingX} ${styles.paddingY}`}
    >
      <h2 className={styles.sectionTitle}>Check our top courses</h2>

      {/* courses */}
      <div className=" w-full flex justify-center items-center sm:flex-row flex-col gap-4 mt-[3rem] flex-wrap ">
        {courses?.slice(0, 4).map((course: any, i: number) => (
          <CourseCard key={i} course={course} i={i} />
        ))}
      </div>
    </div>
  );
};

export default CoursesCategory;
