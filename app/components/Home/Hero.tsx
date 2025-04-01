import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

type Props = {
  data: any;
};

const Hero: FC<Props> = ({ data }) => {
  return (
    <div className=" w-screen xl:h-screen p-10 flex xl:flex-row flex-col xl:justify-between lg:items-center ">
      {/* text */}
      <div className=" xl:w-[55%] w-full ">
        <h1 className=" text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-medium mb-4 lg:max-w-[80%] lg:text-left text-center">
          {data?.layout?.banner?.title}
        </h1>
        <p className=" leading-[1.6rem] sm:leading-[1.9rem] text-[14px] lg:text-left text-center">
          {data?.layout?.banner?.subTitle}
        </p>
        <br />

        <div className="xl:inline-block w-full flex justify-center items-center  ">
          {/* button */}
          <button className=" bg-primary px-6 py-2 rounded-md transition duration-300 hover:border hover:border-primary hover:text-primary hover:dark:text-white text-center text-white hover:bg-transparent lg:text-[14px] text-[12px]">
            Start Your Journey!
          </button>
        </div>
      </div>

      {/* image */}
      <div className=" w-full sm:w-[70%] lg:w-[50%] h-[50%]  xl:mx-0 mx-auto xl:w-[35%] xl:h-full hero_animation rounded-full xl:my-0 sm:my-20  mt-10 sm:mb-0 xl:pt-20">
        <Image
          src={data?.layout?.banner?.image?.url}
          alt="banner_image"
          height={200}
          width={200}
          className=" w-[100%]"
        />
      </div>
    </div>
  );
};

export default Hero;
