import { styles } from "../../styles/style";
import React from "react";
import littleDescIcon from "../../../public/assets/littleDesc.png";
import Image from "next/image";

type Props = {};

const LittleDesc = (props: Props) => {
  return (
    <div
      className={`${styles.paddingX} ${styles.paddingY} w-full   flex lg:flex-row flex-col-reverse items-center gap-8 xl:my-10 `}
    >
      <div className=" relative w-full lg:inline-block flex flex-col justify-center items-center text-center lg:text-left  ">
        {/* circle */}

        <div className="">
          <h2 className=" text-2xl font-medium max-w-[30rem] leading-10 xl:text-left text-center">
            <div className="inline-block w-9 h-9 rounded-full bg-lightGreen pl-6">
              <span>E</span>
            </div>
            verything you can do in a physical classroom,
            <span className=" text-lightGreen"> you can do with ByWay.</span>
          </h2>

          {/* paragraph */}
          <div className=" relative">
            <p className=" max-w-[35rem] mt-4 leading-[1.6rem] sm:leading-[1.9rem] sm:text-[18px] text-sm">
              ByWay’s school management software helps traditional and online
              schools manage scheduling, attendance, payments and virtual
              classrooms all in one secure cloud-based system.
            </p>
            <div className=" absolute right-[4rem]  bottom-[1.2rem] w-4 h-4 rounded-full bg-lightGreen " />
          </div>
        </div>
      </div>

      {/* image */}
      <div className="w-full flex justify-center items-center">
        <Image
          src={littleDescIcon}
          alt="image"
          className=" xl:w-full sm:w-[80%] w-full"
        />
      </div>
    </div>
  );
};

export default LittleDesc;
