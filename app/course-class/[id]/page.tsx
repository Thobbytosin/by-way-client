/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
// import CourseClass from "@/components/Course/Class/CourseClass";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCourseQueries } from "@/hooks/api/course.api";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import Heading from "@/utils/Heading";
import ServerErrorUI from "@/components/Home/ServerErrorUI";
import Header from "@/components/Header";
import { getLastViewedProgress } from "@/utils/helpers";
import { CourseData } from "@/types/course.types";
import CourseClassContent from "@/components/Course/Class/CourseClassContent";
import CourseClassContentList from "@/components/Course/Class/CourseClassContentList";
import { LessonStatus } from "@/types/user.types";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export type SectionGroup = {
  sectionTitle: string;
  videos: CourseData[];
};

const Page = ({ params }: any) => {
  const id = params.id;

  const { loading, user } = useProtectedRoute({
    requireCoursePurchase: id,
    redirectPath: `/course-details/${id}`,
  });

  const { courseContentDomain } = useCourseQueries({
    courseId: id,
    type: "course-content",
  });
  const { courseData, courseDataLoading } = courseContentDomain;
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });
  const [groupedSections, setGroupedSections] = useState<SectionGroup[]>([]);
  const [activeVideo, setActiveVideo] = useState<CourseData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState<LessonStatus | null>(
    null
  );
  const [hasInitialized, setHasInitialized] = useState(false);

  // group videos intp sections
  useEffect(() => {
    if (courseData) {
      const groupedSections: SectionGroup[] = [];
      courseData.forEach((video) => {
        const existing = groupedSections.find(
          (group) => group.sectionTitle === video.videoSection
        );

        if (existing) {
          existing.videos.push(video);
        } else {
          groupedSections.push({
            sectionTitle: video.videoSection,
            videos: [video],
          });
        }
      });

      setGroupedSections(groupedSections);
    }
  }, [courseData]);

  // update the last active index
  useEffect(() => {
    if (!hasInitialized && courseData) {
      const selectedCourse = user?.courses.find((c) => c.courseId === id);
      if (!selectedCourse) return;
      setSelectedCourse(selectedCourse);
      const userProgress = selectedCourse.progress;

      const { activeIndex } = getLastViewedProgress(userProgress, courseData);

      setActiveIndex(activeIndex);
      setActiveVideo(courseData[activeIndex]);
      setHasInitialized(true); // intialize only once
    }
  }, [courseData]);

  // Update metadata when active video changes
  useEffect(() => {
    if (activeVideo) {
      document.title = `${activeIndex + 1}. ${activeVideo.title}`;
    }
  }, [activeVideo, activeIndex]);

  if (courseDataLoading) {
    return <Loader key={"loading"} />;
  }

  if (!loading && !user) {
    return <Loader key="loading" />;
  }

  return (
    <>
      <Header activeItem={0} />

      {loading || serverLoading ? (
        <Loader key={"loading"} />
      ) : serverError ? (
        <ServerErrorUI errorMessage={serverError} />
      ) : (
        <div>
          {courseData ? (
            <div className=" w-full h-fit grid grid-cols-10 sm:pr-14 px-8 gap-8 ">
              <CourseClassContent
                data={courseData}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                courseId={id}
                courseData={courseData}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                groupedSections={groupedSections}
              />

              <CourseClassContentList
                courseData={courseData}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                groupedSections={groupedSections}
                selectedCourse={selectedCourse}
                hideForLargeTrue
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Page;
