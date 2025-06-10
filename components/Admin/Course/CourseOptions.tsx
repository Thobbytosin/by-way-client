import { CheckIcon } from "@/icons/icons";
import React, { FC } from "react";

type Props = {
  active: number;
};

const options = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Options" },
  { id: 3, title: "Course Content" },
  { id: 4, title: "Course Preview" },
];

const CourseOptions: FC<Props> = ({ active }) => {
  return (
    <div className=" flex items-center gap-6">
      {options.map((option, index) => (
        <div key={option.id} className=" flex items-center gap-2">
          <div
            className={`w-[30px] h-[30px] rounded-full flex justify-center items-center   ${
              active + 1 > index
                ? "bg-primary text-white"
                : "dark:bg-slate-50 bg-[#0F172A] text-slate-50 dark:text-[#0F172A]"
            }  `}
          >
            <CheckIcon color="inherit" fontSize="small" />
          </div>
          <h3
            className={`${active + 1 > index && "text-primary"}  font-medium`}
          >
            {option.title}
          </h3>
          <div
            className={`w-10 h-[2px] ${
              active + 1 > index
                ? "border-primary"
                : "border-[#0F172A] dark:border-slate-50 "
            } border border-dashed`}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
