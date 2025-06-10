/* eslint-disable react-hooks/exhaustive-deps */
import {
  CheckIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  LockIcon,
  OndemandVideoIcon,
} from "@/icons/icons";
import React, { FC, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CourseData } from "@/types/course.types";
import { SectionGroup } from "@/app/course-class/[id]/page";
import { LessonStatus } from "@/types/user.types";
import { contentTotalDuration } from "@/utils/helpers";

type Props = {
  groupedSections: SectionGroup[];
  courseData: CourseData[];
  setActiveVideo: (value: CourseData | null) => void;
  activeVideo: CourseData | null;
  setActiveIndex: (value: number) => void;
  activeIndex: number;
  selectedCourse: LessonStatus | null;
  hideForLargeTrue?: boolean;
};

const CourseClassContentList: FC<Props> = ({
  courseData,
  activeIndex,
  setActiveIndex,
  setActiveVideo,
  activeVideo,
  hideForLargeTrue,
  selectedCourse,
  groupedSections,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSectionLocked = (section: string) => {
    const currentSection = groupedSections.find(
      (g) => g.sectionTitle === section
    );
    if (!currentSection) return false;

    const sectionIndex = groupedSections.findIndex(
      (g) => g.sectionTitle === section
    );

    for (let i = 0; i < sectionIndex; i++) {
      const prev = groupedSections[i];
      const completed = prev.videos.every(
        (video) =>
          selectedCourse?.progress.find((p) => p.videoId === video._id)?.viewed
      );
      if (!completed) return true;
    }

    return false;
  };

  const totalVideos = selectedCourse?.progress.length ?? 0;

  const viewedCount =
    selectedCourse?.progress.filter((p) => p.viewed).length ?? 0;

  const completionPercentage = Math.round((viewedCount / totalVideos) * 100);

  return (
    <>
      {activeVideo && (
        <div
          className={`${
            hideForLargeTrue ? "hidden lg:block mt-[8.5rem]" : "mt-0"
          } w-full h-fit bg-[#E2E8F0] dark:bg-[#0B1739] rounded-lg sm:rounded-xl lg:col-span-3 col-span-10 mx-auto py-6`}
        >
          <div className="mb-4  px-6 flex items-center w-full justify-between gap-10">
            <div className="w-full bg-gray-400 dark:bg-black rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="min-w-fit text-xs text-gray-700 dark:text-white font-semibold">
              {completionPercentage}% completed
            </p>
          </div>

          {groupedSections?.map((section, index) => {
            // check if section is expanded
            const expanded = expandedSections[section.sectionTitle] ?? true;
            // check if section is locked
            const locked = isSectionLocked(section.sectionTitle);

            return (
              <div key={index} className=" px-3">
                <div
                  onClick={() => toggleSection(section.sectionTitle)}
                  className=" bg-white dark:bg-black flex justify-between items-center mb-4 p-2 cursor-pointer"
                >
                  <h3 className=" font-medium text-xs text-red-600 dark:text-primary">
                    {index + 1}. {section.sectionTitle}
                  </h3>
                  <span className=" text-gray-900 dark:text-white">
                    {expanded ? (
                      <KeyboardArrowUpIcon color="inherit" fontSize="small" />
                    ) : locked ? (
                      <LockIcon color="inherit" fontSize="small" />
                    ) : (
                      <KeyboardArrowDownIcon color="inherit" fontSize="small" />
                    )}
                  </span>
                </div>

                {/* videos in a section */}
                {expanded && (
                  <div className="space-y-2">
                    {section.videos.map((video, i) => {
                      // find current lesson index from the course data
                      const lessonIndex = courseData?.findIndex(
                        (c) => c._id === video._id
                      );

                      // check current lesson progress from users history
                      const progress = selectedCourse?.progress.find(
                        (c) => c.videoId === video._id
                      );

                      const isActive = lessonIndex === activeIndex;
                      const isViewed = progress?.viewed;

                      return (
                        <div
                          key={i}
                          className={` p-2 rounded-md r ${
                            isActive
                              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black cursor-pointe"
                              : locked
                              ? "hover:bg-gray-400 hover:dark:bg-black transition duration-700 cursor-not-allowed"
                              : "  hover:bg-gray-400 hover:dark:bg-black transition duration-700 cursor-pointer"
                          }`}
                          onClick={() => {
                            if (!locked) {
                              setActiveIndex(lessonIndex);
                              setActiveVideo(video);
                            }
                          }}
                        >
                          <div className=" flex items-center ">
                            {/* checkmark */}
                            <div
                              className={`${
                                isActive
                                  ? "bg-primary border-none text-white"
                                  : ""
                              } ${
                                isViewed
                                  ? "bg-primary border-none text-white"
                                  : ""
                              } text-[12px] w-5 h-5 rounded-[4px] ${
                                locked
                                  ? "border-none text-gray-500"
                                  : "border border-gray-800"
                              }   flex justify-center items-center`}
                            >
                              {locked ? (
                                <LockIcon fontSize="small" color="inherit" />
                              ) : (
                                <CheckIcon fontSize="inherit" />
                              )}
                            </div>

                            <p className=" font-medium max-w-[250px] text-xs  ml-4">
                              {lessonIndex + 1}. {video.title}
                            </p>
                          </div>

                          <div className=" flex items-center justify-end  gap-1 text-primary">
                            <p className=" text-gray-500 text-[12px]">
                              {contentTotalDuration(video.videoDuration)}
                            </p>

                            <OndemandVideoIcon
                              color="inherit"
                              fontSize="small"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CourseClassContentList;
