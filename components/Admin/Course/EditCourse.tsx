import React, { useState, useEffect, FC } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "../../../redux/course/courseApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../../Loader/Loader";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    thumbnail: "",
    demoVideo: "",
    imagePreview: "",
    videoPreview: "",
    category: "",
    reviews: "",
    purchase: "",
    ratings: "",
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
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    updateCourse,
    { isLoading: uploadLoading, isSuccess: uploadSuccess, error: uploadError },
  ] = useUpdateCourseMutation();
  const [form, setForm] = useState<any>(null);

  // fetch data
  useEffect(() => {
    if (uploadSuccess) {
      refetch();
      toast.success("Course updated successfully");
      router.push("/admin/all-courses");
    }

    if (uploadError) {
      if ("data" in uploadError) {
        const error = uploadError as any;
        toast.error(error.data.message);
      }
    }
  }, [uploadError, uploadSuccess, refetch, router]);

  const editCourseData =
    data && data.courses?.find((course: any) => course._id === id);
  // fetch course data
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        category: editCourseData.category,
        demoVideo: editCourseData.demoVideo,
        imagePreview: editCourseData.imagePreview,
        videoPreview: editCourseData.videoPreview,
        thumbnail: editCourseData.thumbnail,
        reviews: editCourseData.reviews,
        purchase: editCourseData.purchase,
        ratings: editCourseData.ratings,
      });

      setBenefits(editCourseData.benefits);
      setPrerequisties(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  // submit all data to the course data object (page 3)
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
      videoDuration: contentData.videoDuration,
      videoDescription: contentData.videoDescription.trimStart().trimEnd(),
      videoSection: contentData.videoSection.trimStart().trimEnd(),
      objectives: contentData.objectives.map((objective) => ({
        title: objective.title,
      })),
      links: contentData.links.map((link) => ({
        title: link.title.trimStart().trimEnd(),
        url: link.url.trim(),
      })),
      suggestion: contentData.suggestion,
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
      category: courseInfo.category.trim(),
      videoPreview: courseInfo.videoPreview.trim(),
      imagePreview: courseInfo.imagePreview.trim(),
      reviews: editCourseData.reviews,
      purchase: editCourseData.purchase,
      ratings: editCourseData.ratings,
      benefits: formatedBenefits,
      prerequisites: formatedPrerequisites,
      courseData: formatedCourseContentData,
    };

    setCourseData(data); // for ui

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

  // handle update course
  const handleCourseEdit = async () => {
    const data = { id, data: form };
    await updateCourse(data);
  };

  return (
    <div className=" w-full relative  p-10 min-h-full">
      {/* Course options */}
      <div className="absolute top-12 left-[2rem]">
        <CourseOptions active={active} setActive={setActive} />
      </div>
      {!uploadLoading && (
        <>
          {active === 0 && (
            <CourseInformation
              active={active}
              setActive={setActive}
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              isEdit
            />
          )}

          {active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              active={active}
              setActive={setActive}
              prerequisites={prerequisties}
              setPrerequisites={setPrerequisties}
            />
          )}

          {active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}

          {active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseEdit={handleCourseEdit}
              isEdit
            />
          )}
        </>
      )}

      {/* uploading  */}
      {uploadLoading && <Loader />}
    </div>
  );
};

export default EditCourse;
