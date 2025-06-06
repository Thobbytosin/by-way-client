"use client";
import Image from "next/image";
import ErrorIcon from "/public/assets/404.png";
import ErrorIcon2 from "/public/assets/4042.png";
import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import Header from "./Header";

type Props = {};
const NotFound = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loader />;

  return (
    <main>
      <Header />

      <div className="w-screen h-screen relative  flex flex-col justify-center items-center">
        <div className=" w-[70%] h-[70%] flex justify-center items-center ">
          <Image
            src={ErrorIcon}
            alt="404_Image"
            height={400}
            width={400}
            className=" object-cover"
          />
        </div>
        <div className=" w-[80%] md:w-full mx-auto md:mt-10">
          <h1 className=" text-center text-primary font-bold text-3xl md:text-4xl ">
            Oh no..a broken link
          </h1>
          <p className=" text-center text-sm md:text-base  text-text-light-gray my-3 md:my-6">
            The page you were looking for seems to have gone missing.
          </p>
        </div>
        <Image
          src={ErrorIcon2}
          alt="404_Image"
          width={150}
          height={150}
          className=" absolute bottom-0 right-0"
        />
      </div>
    </main>
  );
};

export default NotFound;
