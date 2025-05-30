import {
  CheckIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  OndemandVideoIcon,
} from "../../../icons/icons";
import { useLoadUserQuery } from "../../../../redux/api/apiSlice";
import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import successGif from "../../../../public/assets/completed.gif";

type Props = {
  data: any[];
  activeVideo: number;
  setActiveVideo: (video: number) => void;
  visibleSection: any;
  setVisibleSection: (visibleSection: any) => void;
  progressCounter: number;
  hideForLargeTrue?: boolean;
  courseId: string;
};

const CourseClassContentList: FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  visibleSection,
  setVisibleSection,
  progressCounter,
  hideForLargeTrue,
  courseId,
}) => {
  const { data: userData } = useLoadUserQuery({});
  let [active, setActive] = useState<any>({});

  const activeCourseFromUsersCourses: any = userData?.user?.courses?.find(
    (c: any) => c.courseId === courseId
  );

  const notViewedVideo: any = activeCourseFromUsersCourses?.progress?.find(
    (v: any) => v.viewed === false
  );

  const findUserViewedVideo = activeCourseFromUsersCourses?.progress?.filter(
    (v: any) => v.viewed === true
  );

  useEffect(() => {
    const activeLastNotViewedVideoIndex: number = data?.findIndex(
      (av: any) => av._id === notViewedVideo?.videoId
    );

    // setActiveVideo(activeLastNotViewedVideoIndex);
    // active = data[activeVideo];
    if (activeLastNotViewedVideoIndex >= 0) {
      // means there is 1 or more video not viewed yet
      setActiveVideo(activeLastNotViewedVideoIndex);
    } else {
      // active = data[data.length - 1];
      // means all videos are viewed
      setActiveVideo(data.length - 1);
    }
  }, []);

  // if (activeLastNotViewedVideoIndex >= 0) {
  //   // means there is 1 or more video not viewed yet
  //   active = data[activeLastNotViewedVideoIndex];
  // } else {
  //   active = data[data.length - 1];
  // }

  // useEffect(() => {
  //   active = data[activeVideo];
  // }, [activeVideo]);

  const videoSections = Array.from(
    new Set(data?.map((item: any) => item.videoSection))
  );

  const toggleSection = (section: string) => {
    setVisibleSection((prevVisibleSections: any) => ({
      ...prevVisibleSections,
      [section]: !prevVisibleSections[section],
    }));
  };

  const contentTotalDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.ceil((duration % 3600) / 60);

    // Return formatted time
    return `${
      hours >= 1
        ? `${hours === 1 ? `${hours} hr.` : `${hours} hr.`} ${
            minutes < 1
              ? ""
              : `${minutes === 1 ? `${minutes} min.` : `${minutes} min.`}`
          } `
        : duration < 60
        ? `${duration} sec.`
        : `${minutes} min.`
      // : `${minutes} min.`
    }`;
  };

  // find id from data
  const findIfFromParent = (item: any) => {
    const id = data?.findIndex((it: any) => item._id === it._id);

    return id;
  };

  const calcProgessPercent = () => {
    const progessCount = (progressCounter / data.length) * 100;

    return Math.floor(progessCount);
  };

  // 199480

  // set active content video
  active = data[activeVideo];

  return (
    <>
      {active && (
        <div
          className={`${
            hideForLargeTrue ? "hidden lg:block mt-[8.5rem]" : "mt-0"
          } w-full h-fit bg-[#E2E8F0] dark:bg-[#0B1739] rounded-lg sm:rounded-xl lg:col-span-3 col-span-10 mx-auto sm:pt-3 pt-1`}
        >
          <div className="my-6 px-6 flex items-center w-full justify-between">
            <h2 className=" text-[0.88rem] sm:text-[1rem] font-semibold">
              {progressCounter === data?.length ? (
                <span className=" text-success">Course Completed!</span>
              ) : (
                <span>Course Completion</span>
              )}
            </h2>

            <div className=" flex items-center gap-3">
              {/* <div className=" w-[35px] h-[35px] lg:w-[50px] lg:h-[50px]">
                <CircularProgressbar
                  value={calcProgessPercent()}
                  text={`${calcProgessPercent()}%`}
                  styles={{
                    path: {
                      stroke: `rgba(35, 189, 238, ${
                        calcProgessPercent() / 100
                      })`,
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: "#23BDEE",
                      // Text size
                      fontSize: "22px",
                      fontWeight: "bold",
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: "#23BDEE",
                    },
                  }}
                />
              </div> */}

              <p
                className={`text-xs sm:text-sm font-semibold ${
                  progressCounter === data?.length ? "text-primary" : ""
                }`}
              >
                {progressCounter === data?.length ? (
                  <Image src={successGif} alt="completed" className=" w-10" />
                ) : (
                  `${progressCounter} out of ${data.length}`
                )}
              </p>
            </div>
          </div>
          <>
            {videoSections?.map((section: any, i) => (
              <div
                key={i}
                className={`p-4 
                   w-full `}
              >
                <div className=" cursor-pointer w-full gap-3 flex justify-between items-center">
                  <h4
                    className="w-full font-semibold text-sm sm:text-base pb-4 mb-4 border-b-2 border-gray-300 dark:border-gray-800"
                    onClick={() => toggleSection(section)}
                  >
                    {visibleSection[section] ? (
                      <KeyboardArrowUpIcon fontSize="inherit" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="inherit" />
                    )}{" "}
                    {i + 1}. {section}
                  </h4>
                </div>

                {visibleSection[section] && (
                  <ul className=" bg-white dark:bg-black mt-2 rounded-lg">
                    {data
                      ?.filter(
                        (s: any, dataIndex: number) =>
                          s.videoSection === section
                      )
                      .map((item: any, index: number) => (
                        <li
                          onClick={() => {
                            const id = data?.findIndex(
                              (it: any) => item._id === it._id
                            );

                            return setActiveVideo(id);
                          }}
                          key={index}
                          className={`py-4 px-3 hover:text-white hover:dark:text-black hover:bg-gray-900 hover:dark:bg-gray-100 transition duration-300 cursor-pointer rounded-lg ${
                            index > 0
                              ? "border-t border-gray-300 dark:border-gray-800"
                              : "border-none"
                          } ${
                            active?._id === item._id &&
                            "bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
                          }`}
                        >
                          <div className=" flex items-center ">
                            {/* check */}
                            <div
                              className={`text-[12px] w-5 h-5 rounded-[4px] ${
                                active?._id === item._id &&
                                "bg-primary border-none text-white"
                              } ${
                                progressCounter > findIfFromParent(item) &&
                                "bg-primary border-none text-white"
                              }  border border-gray-800 flex justify-center items-center`}
                            >
                              <CheckIcon fontSize="inherit" />
                            </div>

                            {/* title */}
                            <p className=" font-medium max-w-[250px] text-xs -mt-2 ml-4">
                              {findIfFromParent(item) + 1}. {item.title}
                            </p>
                          </div>

                          {/* video duration */}
                          <div className=" flex items-center justify-end mt-2 gap-1 text-primary">
                            <p className=" text-gray-500 text-[12px]">
                              {contentTotalDuration(item.videoDuration)}
                            </p>

                            <OndemandVideoIcon
                              color="inherit"
                              fontSize="small"
                            />
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default CourseClassContentList;
