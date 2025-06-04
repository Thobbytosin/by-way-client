/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from "react";
import CourseClassContent from "./CourseClassContent";
import CourseClassContentList from "./CourseClassContentList";
import { useGetCourseContentDataQuery } from "../../../redux/course/courseApi";
import Header from "../../Header";
import Heading from "../../../utils/Heading";
import { useGetAllAdminsQuery } from "../../../redux/user/userApi";
import { useRefreshTokenQuery } from "../../../redux/api/apiSlice";
import { useSelector } from "react-redux";

type Props = {
  courseId: string;
};

const CourseClass: FC<Props> = ({ courseId }) => {
  const { user } = useSelector((state: any) => state.auth);
  const { data, refetch: courseContentRefetch } = useGetCourseContentDataQuery(
    courseId,
    {}
  );
  const [courseContentData, setCourseContentData] = useState(null);
  const [activeTag, setActiveTag] = useState(0);
  const [admin, setAdmin] = useState<any>({});
  const { data: adminData } = useGetAllAdminsQuery({});
  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });

  useEffect(() => {
    if (adminData) {
      setAdmin(adminData.admins[0]);
    }
  }, [adminData]);

  // check local storage for progress bar
  // const savedProgress = localStorage.getItem(
  //   `${user.email}/${courseId} - courseProgress`
  // );
  const activeCourseFromUsersCourses: any = user?.courses?.find(
    (c: any) => c.courseId === courseId
  );

  const viewedCounterLength = activeCourseFromUsersCourses?.progress?.filter(
    (v: any) => v.viewed === true
  );

  const [progressCounter, setProgressCounter] = useState<number>(
    viewedCounterLength ? viewedCounterLength?.length : 0
  );

  // setProgressCounter(viewedCounterLength);

  // check local storage first for active video
  // const savedIndex = localStorage.getItem(
  //   `${user.email}/${courseId} - activeVideoIndex`
  // );
  // active video state
  const [activeVideo, setActiveVideo] = useState<number>(0);

  // set course last visible section
  const savedLastVisibleSection = localStorage.getItem(
    `${user.email}/${courseId}/${data?.content[activeVideo]?.videoSection}`
  );

  interface VisibleSectionState {
    [key: string]: boolean;
  }

  // visible section state
  const [visibleSection, setVisibleSection] = useState<VisibleSectionState>(
    savedLastVisibleSection &&
      savedLastVisibleSection ===
        `"${data?.content[activeVideo]?.videoSection}"`
      ? { [data?.content[activeVideo]?.videoSection]: true }
      : { [data?.content[0]?.videoSection]: true }
  );

  // update the active video index in the local storage whenever the index changes
  // useEffect(() => {
  //   localStorage.setItem(
  //     `${user.email}/${courseId} - activeVideoIndex`,
  //     activeVideo.toString()
  //   );

  //   // to set active section to true
  //   if (data) {
  //     localStorage.setItem(
  //       `${user.email}/${courseId}/${data?.content[activeVideo]?.videoSection}`,
  //       JSON.stringify(data?.content[activeVideo]?.videoSection)
  //     );
  //   }

  //   // set progress
  //   localStorage.setItem(
  //     `${user.email}/${courseId} - courseProgress`,
  //     progressCounter.toString()
  //   );
  // }, [data, activeVideo]);

  useEffect(() => {
    if (data) {
      setCourseContentData(data?.content);
    }
  }, [data]);

  // refresh token when active tag or active video changses

  useEffect(() => {
    refetch();
  }, [activeVideo, activeTag]);

  return (
    <div>
      <Heading
        // title={courseContentData[activeVideo]?.title}
        title="Page"
        description="This is the course lecture page e-learning platform where people can have access to resources for learning"
        keywords="Web Programming, Programming, Development"
      />

      <Header activeItem={0} />

      {courseContentData && (
        <div className=" w-full h-fit grid grid-cols-10 sm:pr-14 pr-8 gap-8">
          <CourseClassContent
            data={courseContentData}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            setVisibleSection={setVisibleSection}
            visibleSection={visibleSection}
            setProgressCounter={setProgressCounter}
            progressCounter={progressCounter}
            user={user}
            courseId={courseId}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            admin={admin}
          />
          <CourseClassContentList
            data={courseContentData}
            courseId={courseId}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            visibleSection={visibleSection}
            setVisibleSection={setVisibleSection}
            progressCounter={progressCounter}
            hideForLargeTrue
          />
        </div>
      )}
    </div>
  );
};

export default CourseClass;
