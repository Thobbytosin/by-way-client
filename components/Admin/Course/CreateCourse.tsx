/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import Loader from "../../Loader/Loader";
import { useCourseMutations } from "@/hooks/api/course.api";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";

type Props = {};

const CreateCourse = (props: Props) => {
  const { navigate } = useRouteLoader();
  const {
    courseInfo: courseInfoo,
    courseInfoPending,
    courseInfoSuccess,
  } = useCourseMutations();
  const { createCourse } = courseInfoo;
  const { createCoursePending } = courseInfoPending;
  const { createCourseSuccess } = courseInfoSuccess;

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoVideo: "",
    imagePreview: "",
    videoPreview: "",
    category: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisties, setPrerequisties] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      videoDescription: "",
      videoDuration: "",
      videoSection: "Untitled Section",
      objectives: [{ title: "" }],
      links: [
        {
          title: "",
          url: "",
        },
      ],
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const [form, setForm] = useState<FormData>();

  useEffect(() => {
    if (createCourseSuccess) {
      navigate("/admin/all-courses");
    }
  }, [createCourseSuccess]);

  // console.log("Info", courseInfo);
  // console.log("Course data", courseData);
  // console.log("Course Content data", courseContentData);
  // console.log("Benefits ", benefits);
  // console.log("Prerequisites ", prerequisties);

  // submit all data to the course data object
  const handleSubmit = async () => {
    const formData = new FormData();
    // format benefits array
    const formatedBenefits = benefits.map((benefit) => ({
      title: benefit.title.trimStart().trimEnd(),
    }));

    // format prerequisites array
    const formatedPrerequisites = prerequisties.map((prereq) => ({
      title: prereq.title.trimStart().trimEnd(),
    }));

    // format course content data array
    const formatedCourseContentData = courseContentData.map((contentData) => ({
      videoUrl: contentData.videoUrl.trim(),
      title: contentData.title.trimStart().trimEnd(),
      videoDuration: contentData.videoDuration.trim(),
      videoDescription: contentData.videoDescription.trimStart().trimEnd(),
      videoSection: contentData.videoSection.trimStart().trimEnd(),
      objectives: contentData.objectives.map((objective) => ({
        title: objective.title,
      })),
      links: contentData.links.map((link) => ({
        title: link.title.trimStart().trimEnd(),
        url: link.url.trim(),
      })),
    }));

    // create data object
    const data = {
      name: courseInfo.name.trimStart().trimEnd(),
      description: courseInfo.description.trimStart().trimEnd(),
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      thumbnail: courseInfo.thumbnail,
      tags: courseInfo.tags.trimStart().trimEnd(),
      level: courseInfo.level.trim(),
      videoPreview: courseInfo.videoPreview.trim(),
      imagePreview: courseInfo.imagePreview.trim(),
      category: courseInfo.category.trim(),
      benefits: formatedBenefits,
      prerequisites: formatedPrerequisites,
      courseData: formatedCourseContentData,
    };

    setCourseData(data); // for preview ui

    // Append text fields to FormData for backend
    formData.append("name", courseInfo.name.trim());
    formData.append("description", courseInfo.description.trim());
    formData.append("price", courseInfo.price);
    formData.append("estimatedPrice", courseInfo.estimatedPrice);
    formData.append("tags", courseInfo.tags.trim());
    formData.append("level", courseInfo.level.trim());
    formData.append("category", courseInfo.category.trim());

    // Append arrays as JSON strings
    formData.append("benefits", JSON.stringify(formatedBenefits));
    formData.append("prerequisites", JSON.stringify(formatedPrerequisites));
    formData.append("courseData", JSON.stringify(formatedCourseContentData));

    // Append file (thumbnail)
    formData.append("thumbnail", courseInfo.thumbnail);
    formData.append("demoVideo", courseInfo.demoVideo);

    setForm(formData);
  };

  // handle create course
  const handleCourseCreate = () => {
    if (form) {
      createCourse(form);
    }
  };

  return (
    <div className=" w-full relative  p-10 min-h-full ">
      {/* Course options */}
      <div className="absolute top-12 left-[2rem]">
        <CourseOptions active={active} />
      </div>
      {createCoursePending && <Loader />}

      {!createCoursePending && active === 0 && (
        <CourseInformation
          active={active}
          setActive={setActive}
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
        />
      )}

      {!createCoursePending && active === 1 && (
        <CourseData
          benefits={benefits}
          setBenefits={setBenefits}
          active={active}
          setActive={setActive}
          prerequisites={prerequisties}
          setPrerequisites={setPrerequisties}
        />
      )}

      {!createCoursePending && active === 2 && (
        <CourseContent
          key={"content"}
          active={active}
          setActive={setActive}
          courseContentData={courseContentData}
          setCourseContentData={setCourseContentData}
          handleSubmit={handleSubmit}
        />
      )}

      {!createCoursePending && active === 3 && (
        <CoursePreview
          active={active}
          setActive={setActive}
          courseData={courseData}
          handleCourseCreate={handleCourseCreate}
        />
      )}
    </div>
  );
};

export default CreateCourse;
