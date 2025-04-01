import React, { FC } from "react";

type Props = {
  category: any;
  index: number;
  coursesData: any[];
};

const CategoriesCard: FC<Props> = ({ category, index, coursesData }) => {
  const filterCourses = coursesData?.filter(
    (course: any) => course.category === category.title
  );

  return (
    <div className=" w-[250px] h-[200px] rounded-2xl border flex flex-col items-center justify-center py-2 bg-[#E0F2FE] dark:bg-slate-800 dark:border-black">
      <h2 className=" font-semibold mb-2">{category.title}</h2>
      <p>
        {filterCourses?.length}{" "}
        {filterCourses?.length === 1 ? "Course" : "Courses"}
      </p>
    </div>
  );
};

export default CategoriesCard;
