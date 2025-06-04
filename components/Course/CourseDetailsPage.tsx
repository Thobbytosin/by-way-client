import Heading from "@/utils/Heading";
import React, { FC } from "react";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Loader from "../Loader/Loader";
import { useCourseQueries } from "@/hooks/api/course.api";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import ServerErrorUI from "../Home/ServerErrorUI";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { courseFreeDomain } = useCourseQueries({
    type: "free-course",
    courseId: id,
  });
  const { course, courseLoading, courseFetching } = courseFreeDomain;
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });

  if (courseLoading || courseFetching) {
    return <Loader key={"loading"} />;
  }

  return (
    <>
      <Heading
        title={`${course?.name}`}
        description="This is an online e-learning platform where people can have access to resources for learning"
        keywords={`${course?.tags}`}
      />

      <>
        <Header />
        {serverLoading ? (
          <Loader key={"loading"} />
        ) : serverError ? (
          <ServerErrorUI errorMessage={serverError} />
        ) : (
          <CourseDetails course={course} />
        )}
      </>
    </>
  );
};

export default CourseDetailsPage;
