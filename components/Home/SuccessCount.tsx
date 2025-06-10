import { styles } from "@/styles/style";
import React, { FC } from "react";

type Props = {
  coursesLength: number;
  usersLength: number | undefined;
};

const SuccessCount: FC<Props> = ({ coursesLength, usersLength }) => {
  if (!usersLength) return;
  return (
    <div
      className={`${styles.paddingX} ${styles.paddingY}  w-full bg-white dark:bg-slate-900 flex sm:flex-row flex-col  items-center justify-center sm:mt-0 sm:mb-0 mt-20 sm:gap-0 gap-10`}
    >
      <div className=" w-full md:w-[450px] text-center border-none md:border-r-4 ">
        <h2 className=" font-semibold text-4xl ">{coursesLength - 1}+</h2>
        <p className=" text-[14px] lg:text-md">Total Courses</p>
      </div>
      <div className=" w-full md:w-[450px] text-center border-none md:border-r-4">
        <h2 className=" font-semibold text-4xl ">{usersLength - 1}+</h2>
        <p>Subscribed Users</p>
      </div>
      <div className=" w-full md:w-[450px] text-center border-none md:border-r-4">
        <h2 className=" font-semibold text-4xl ">85 %</h2>
        <p>Percentage Success</p>
      </div>
    </div>
  );
};

export default SuccessCount;
