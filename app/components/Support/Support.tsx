"use client";
import React, { useEffect, useState } from "react";
import { AddIcon, ChevronRightIcon, RemoveIcon } from "../../icons/icons";
import { styles } from "../../styles/style";
import supportBanner from "../../../public/assets/supportBanner.png";
import call from "../../../public/assets/call.png";
import Image from "next/image";
import { useGetHeroDataQuery } from "../../../redux/layout/layoutApi";
import toast from "react-hot-toast";

type Props = {};

const Support = (props: Props) => {
  const { data, error, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [faqs, setFaqs] = useState<any>([]);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setFaqs(data.layout.faq);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(
          "Could not fetch Frequently Asks Questions. Kindly refresh this page."
        );
      }
    }
  }, [data, error]);

  // Handle toggle functionality
  const handleToggleAnswer = (id: any) => {
    setActiveQuestionId((prev) => (prev === id ? null : id));
  };

  // console.log(data?.layout?.faq);
  // console.log(faqs);

  return (
    <>
      <div
        className={`${styles.paddingX} ${styles.paddingY} w-full min-h-fit flex sm:flex-row flex-col gap-10 justify-between items-center`}
      >
        <div className=" lg:w-full sm:w-[75%]">
          {/* notification tag */}
          <div className="mb-10 w-fit bg-white dark:bg-dimDark dark:shadow-black dark:shadow-sm shadow-md  p-2 rounded-full flex items-center cursor-pointer">
            <div className=" px-2 py-1 text-xs bg-primary rounded-full text-white mr-4">
              NEWS
            </div>
            <p className=" mr-3 text-xs font-medium">
              We have updated our FAQs
            </p>
            <ChevronRightIcon />
          </div>

          <h1 className=" text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-medium mb-4 lg:max-w-[80%] sm:text-left text-center">
            Engage your website visitors using support management tools
          </h1>

          <p className=" leading-[1.6rem] sm:leading-[1.9rem] text-[14px] sm:text-left text-center">
            Explore 50+ integrations that make your day-to-day workflow more
            efficient and familiar. Our extensive developer tools might also
            strike your fancy website.
          </p>

          <div className="xl:inline-block w-full flex justify-center sm:justify-start items-center mt-10  ">
            {/* button */}
            <button className=" bg-primary px-6 py-2 rounded-md transition duration-300 hover:border hover:border-primary hover:text-primary hover:dark:text-white text-center text-white hover:bg-transparent lg:text-[14px] text-[12px] mr-6">
              Try Free Trial
            </button>

            <button className=" bg-white px-6 py-2 rounded-md transition shadow-md duration-300 hover:border hover:bg-primary hover:text-white text-center text-black  lg:text-[14px] text-[12px]">
              Discover in Video
            </button>
          </div>
        </div>

        {/* image */}
        <div className=" sm:w-[70%] lg:w-full ">
          <Image src={supportBanner} alt="banner_image" className="w-[100%]" />
        </div>
      </div>

      {/* video call support */}
      <div className={`${styles.paddingY} ${styles.paddingX} w-full`}>
        <h2 className={`${styles.supportSectionTitle}`}>
          Introducing Soon: Video calling support
        </h2>
        <p className={styles.supportDescription}>
          Every email, web page, and social media post makes an impression on
          your customers. With our software you can be confident it&apos;s
          impression.
        </p>

        {/* banner */}
        <div
          className="w-full lg:w-[80%] mx-auto h-[90vh] mt-10 relative lg:bg-origin-content bg-center flex items-end justify-center"
          style={{
            backgroundImage: `url(/assets/videoCallBanner.png)`,
            backgroundSize: "cover",
            // backgroundPosition: "center",
          }}
        >
          <div className="text-center text-white w-[18rem]  sm:w-80 h-20  sm:h-40 bg-lightGreen rounded-tl-[2rem] rounded-bl-[3rem] rounded-tr-[2rem] absolute -left-4 lg:-left-20 top-[6rem] md:top-[11rem] lg:top-[6rem] flex justify-center items-center">
            <span className="max-w-[15rem] sm:text-base text-lg mx-auto">
              {" "}
              Hi, I’m Andry. Let me know what can I do for you
            </span>
          </div>

          <div className="text-center text-white w-[18rem]  md:w-80 h-20 sm:h-40 bg-primary rounded-tl-[2rem] rounded-br-[3rem] rounded-tr-[2rem] absolute lg:-right-20 -right-4 bottom-[10rem] md:bottom-[11rem] lg:bottom-[6rem] flex justify-center items-center">
            <span className="max-w-[15rem] text-sm sm:text-lg mx-auto">
              {" "}
              Your personal support assistance
            </span>
          </div>

          {/* VIDEO CALL ICON */}
          <div className=" mb-20 md:mb-[6rem] lg:mb-20 z-10  w-[60%] sm:w-[50%] lg:w-[30%] mx-auto">
            <Image src={call} alt="call_icon" className="w-full" />
          </div>
        </div>
      </div>

      {/* faqs */}
      <div className={`${styles.paddingY} ${styles.paddingX} w-full`}>
        <p className={`font-medium mb-6 text-base text-center text-primary`}>
          Get your questions answers
        </p>
        <h2 className={`${styles.supportSectionTitle}`}>
          Frequently Asked Questions
        </h2>

        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {faqs?.map((faq: any, index: number) => (
            <div key={index} className=" w-full border-b border-gray-500 pb-8">
              <div
                onClick={() => handleToggleAnswer(index)}
                className=" w-full flex justify-between items-center cursor-pointer"
              >
                <h2 className=" max-w-[85%] sm:text-base text-sm">
                  {faq.question}
                </h2>
                {activeQuestionId === index ? <RemoveIcon /> : <AddIcon />}
              </div>
              {/* reply */}
              {activeQuestionId === index && (
                <div className=" bg-gray-300 dark:bg-dimDark p-6 mt-4 text-sm leading-7 rounded-lg">
                  <p className=" text-xs sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* staffs */}
      <div className={`${styles.paddingY} ${styles.paddingX} w-full`}>
        <h2 className={`${styles.supportSectionTitle}`}>
          Meet our amazing super heroes who always work hardly behind the scenes
        </h2>

        <p className={styles.supportDescription}>
          Focus only on the meaning, we take care of the design. As soon as the
          meeting end you can export in one click into your preferred.
        </p>

        <div className=" w-full bg-staff-White-img dark:bg-staff-Dark-img bg-no-repeat bg-center mt-10 h-[50vh] lg:h-[90vh]"></div>
      </div>
    </>
  );
};

export default Support;
