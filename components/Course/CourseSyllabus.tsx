import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  OndemandVideoIcon,
} from "@/icons/icons";
import React, { useState } from "react";

type Props = {
  content: any;
};

const CourseSyllabus: React.FC<Props> = ({ content }) => {
  const [data, setData] = useState(content);

  // create new array
  const videoSections = Array.from(
    new Set(data?.map((item: any) => item.videoSection))
  );

  interface VisibleSectionState {
    [key: string]: boolean;
  }

  const [visibleSection, setVisibleSection] = useState<VisibleSectionState>({});

  const toggleSection = (section: string) => {
    setVisibleSection((prevVisibleSections) => ({
      ...prevVisibleSections,
      [section]: !prevVisibleSections[section],
    }));
  };

  const numberofLessonsInSection = (section: string) => {
    const lessons = data?.filter((item: any) => item.videoSection === section);
    // setNewSeparatedSection(lessons);

    if (lessons) {
      return `${lessons.length} ${lessons.length > 1 ? "Lessons" : "Lesson"}`;
    } else {
      return `0 Lecture`;
    }
  };

  const sectionTotalDuration = (section: string) => {
    const sections = data?.filter((item: any) => item.videoSection === section);
    const seconds = sections?.reduce(
      (acc: number, c: any) => acc + c.videoDuration,
      0
    );

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Return formatted time
    return `${
      hours >= 1
        ? `${hours === 1 ? `${hours} hour` : `${hours} hours`} ${
            minutes < 1
              ? ""
              : `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`
          } `
        : `${seconds < 60 ? `${seconds} seconds` : `${minutes} minutes`}`
    }`;
  };

  const contentTotalDuration = (duration: number) => {
    const seconds = duration;

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Return formatted time
    return `${
      hours >= 1
        ? `${hours === 1 ? `${hours} hour` : `${hours} hours`} ${
            minutes < 1
              ? ""
              : `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`
          } `
        : `${seconds < 60 ? `${seconds} seconds` : `${minutes} minutes`}`
    }`;
  };

  return (
    <>
      {videoSections?.map((section: any, i) => (
        <div
          key={i}
          className={`p-4  ${
            videoSections.length - 1 === i
              ? "border-none"
              : "border-b border-gray-300 dark:border-gray-800"
          }  w-full `}
        >
          <div className=" cursor-pointer w-full sm:flex sm:justify-between sm:items-center">
            <h4
              className=" font-semibold text-sm sm:text-base"
              onClick={() => toggleSection(section)}
            >
              {visibleSection[section] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{" "}
              {section}
            </h4>
            <p className="text-xs lg:text-sm flex gap-4 items-center font-normal mt-2 lg:mt-0">
              <span>{numberofLessonsInSection(section)}</span>
              <span className=" w-2 h-2 bg-slate-800 dark:bg-slate-100 rounded-full" />
              <span>{sectionTotalDuration(section)}</span>
            </p>
          </div>
          {/* <h2 onClick={() => toggleDepartment(department)}>
            {department} {visibleDepartments[department] ? "(-)" : "(+)"}
          </h2> */}
          {visibleSection[section] && (
            <ul className=" bg-white dark:bg-black mt-2 rounded-lg">
              {data
                ?.filter((s: any) => s.videoSection === section)
                .map((item: any, index: number) => (
                  <li
                    key={index}
                    className={`p-3 flex gap-3 items-start hover:bg-gray-200 hover:dark:bg-gray-900 transition duration-300 cursor-pointer rounded-lg ${
                      index > 0
                        ? "border-t border-gray-300 dark:border-gray-800"
                        : "border-none"
                    }`}
                  >
                    <OndemandVideoIcon color="primary" />
                    <div>
                      <p className=" font-medium text-sm">{item.title}</p>
                      <p className=" text-xs text-gray-500">
                        {contentTotalDuration(item.videoDuration)}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default CourseSyllabus;
