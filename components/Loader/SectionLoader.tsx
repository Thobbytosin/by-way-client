import Image from "next/image";
import React from "react";

const SectionLoader = () => {
  return (
    <div className="  w-full h-[30vh] flex items-center justify-center z-50 my-6">
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading..."
        aria-label="loading_icon"
        width={60}
        height={60}
        // className=" w-[10%] h-[10%]"
        priority
      />
    </div>
  );
};

export default SectionLoader;
