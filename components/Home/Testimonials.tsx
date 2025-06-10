import React, { useState, FC } from "react";
import {
  ArrowRightAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/icons/icons";
import { styles } from "@/styles/style";
import Ratings from "@/utils/Ratings";
import { format } from "timeago.js";
import Image from "next/image";

type Props = {
  reviews: any[];
  fetchUsersData: any;
};

const Testimonials: FC<Props> = ({ reviews, fetchUsersData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  return (
    <div
      className={`w-full  dark:bg-gray-950 bg-gray-200 ${styles.paddingX} ${styles.paddingY} flex sm:flex-row flex-col sm:items-start items-center justify-between sm:gap-10 `}
    >
      <div className=" w-full">
        {/* sub heading */}
        <div className=" flex sm:justify-start justify-center gap-4 items-center sm:mb-6 lg:mb-8 mb-4">
          <div className=" h-[0.4px] sm:w-14 w-10 bg-gray-500" />
          <h4 className="text-gray-500 tracking-wider text-sm sm:text-base">
            TESTIMONIAL
          </h4>
        </div>

        {/* title */}
        <h2 className={`${styles.featuresHeadingLeft} text-primary`}>
          What They Say?
        </h2>
        <br className="lg:block hidden" />
        <p className={styles.featuresDescription}>
          ByWay has got more than 100k positive ratings from our users around
          the world.
        </p>
        <br className="lg:block hidden" />
        <p className={styles.featuresDescription}>
          Some of the students and teachers were greatly helped by the Skilline.
        </p>
        <br className="lg:block hidden" />
        <p className={styles.featuresDescription}>
          Are you too? Please give your assessment
        </p>

        {/* button */}
        <button className=" mx-auto rounded-full w-[250px] sm:w-[300px] flex justify-between items-center mt-10 border border-primary text-primary transition duration-300 hover:border-none hover:bg-primary hover:text-white">
          <span className=" ml-6">Check our courses</span>
          <span className=" h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] rounded-full flex justify-center items-center border-l border-b border-t border-primary hover:border-white hover:dark:border-black hover:border">
            <ArrowRightAltIcon />
          </span>
        </button>
      </div>

      {/* slider */}
      <div className=" relative w-full h-[500px]">
        {/*prev button */}
        {reviews.length > 1 && (
          <div
            onClick={prevSlide}
            className=" w-16 h-16 lg:w-20 lg:h-20 dark:bg-dimDark bg-white shadow-lg  dark:shadow-gray-800 rounded-full cursor-pointer absolute -left-[10%] lg:left-[4%] top-[40%] z-10 border-[8px] dark:border-black text-primary flex justify-center items-center"
          >
            <ChevronLeftIcon color="inherit" fontSize="large" />
          </div>
        )}

        {/*next button */}
        {reviews.length > 1 && (
          <div
            onClick={nextSlide}
            className=" w-16 h-16 lg:w-20 lg:h-20 dark:bg-dimDark bg-white shadow-lg  dark:shadow-gray-800 rounded-full cursor-pointer absolute -right-[10%] lg:right-[4%] top-[40%] z-10 border-[8px] dark:border-black text-primary flex justify-center items-center"
          >
            <ChevronRightIcon color="inherit" fontSize="large" />
          </div>
        )}

        {/* SLIDER CONTAINER */}
        <div
          className="w-full h-full overflow-hidden "
          style={{
            backgroundImage: `url(/assets/testimonials.png)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Slider content */}
          <div
            className={`w-full h-full flex transition-transform duration-500  `}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {reviews?.slice(0, 8)?.map((review: any, index: number) => (
              <div
                key={index}
                className={`w-full h-full   flex-shrink-0 relative`}
              >
                <div className=" bg-dimDark dark:bg-white bg- absolute bottom-[3rem] lg:bottom-6 left-[10%] lg:left-[20%] text-white dark:text-gray-600 w-[90%]  lg:w-[80%] min-h-fit lg:min-h-[30%] rounded-xl border-l-8 border-[#F67766] flex flex-col justify-center p-6 shadow-xl">
                  <p className=" text-base sm:text-lg pl-6 border-l-2 border-gray-700 dark:border-gray-300">
                    &quot;{review.comment}.&quot;
                  </p>
                  <div className="mt-6 sm:mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* review image */}
                      <div className=" w-8 h-8 rounded-full border-2 border-primary overflow-hidden">
                        <Image
                          src={fetchUsersData(review.user._id)?.avatar?.url}
                          alt="user_avatar"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div>
                        {/* reviewer name */}
                        <p className=" font-semibold sm:text-base text-sm">
                          {fetchUsersData(review.user._id)?.name}
                        </p>
                        <p className="text-[10px] sm:text-[12px] text-gray-500 italic">
                          {format(review.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* ratings */}
                    <Ratings
                      key={index}
                      rating={review.rating}
                      color="text-golden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
