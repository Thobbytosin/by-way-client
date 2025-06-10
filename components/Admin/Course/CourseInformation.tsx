import React, { FC, useEffect, useState } from "react";
import { styles } from "@/styles/style";
import Image from "next/image";
import { useContentQueries } from "@/hooks/api/content.api";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
  isEdit?: boolean;
};

const levels = [
  { title: "Beginner" },
  { title: "Intermediate" },
  { title: "Advanced" },
];

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  isEdit,
}) => {
  const { contentDomainData } = useContentQueries({
    categories: true,
  });
  const { categories: categoriesData } = contentDomainData;

  const [categories, setCategories] = useState<
    { title: string; _id?: string }[]
  >([]);
  const [dragging, setDragging] = useState(false);

  // for image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file) {
      const preview = URL.createObjectURL(file);
      setCourseInfo({ ...courseInfo, thumbnail: file, imagePreview: preview });
    }
  };

  // console.log("IMAGE PREVIEW", courseInfo?.imagePreview);
  // console.log("THUMBNAIL", courseInfo.thumbnail);
  // console.log("DEMO VIDEO", courseInfo.demoVideo);
  // console.log("image preview", imagePreview.trim() === "");
  // console.log("video preview", videoPreview);
  // console.log(isEdit && !courseInfo?.imagePreview);

  // for video upload
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validate video type
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file (MP4, MOV, etc.)");
      return;
    }

    // 2. Create blob URL for instant preview
    const videoUrl = URL.createObjectURL(file);

    // 3. Update state with both file object and preview URL
    setCourseInfo({
      ...courseInfo,
      demoVideo: file, // Store File object for upload
      videoPreview: videoUrl,
    });

    // 4. Optional: Clean up blob URL when component unmounts
    return () => URL.revokeObjectURL(videoUrl);
  };

  // console.log(courseInfo);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCourseInfo({ ...courseInfo, thumbnail: null }); // Resets the thumbnail
  };

  const handleRemoveVideo = () => {
    setCourseInfo({ ...courseInfo, demoUrl: null, demoVideo: null });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  // console.log(courseInfo);

  return (
    <div className=" mt-[6rem] w-[80%] ">
      <form onSubmit={handleSubmit}>
        {/* course name */}
        <div className=" w-full">
          <label htmlFor="name" className="text-sm font-medium">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={courseInfo.name}
            placeholder="Fundamentals of React js"
            required
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className={styles.inputStyle}
          />
        </div>

        {/* course description */}
        <div className=" w-full mt-6">
          <label htmlFor="description" className="text-sm font-medium">
            Course Description
          </label>
          <textarea
            id="description"
            name="decription"
            cols={30}
            rows={10}
            placeholder="Write about this course here..."
            value={courseInfo.description}
            required
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={styles.inputStyle}
          ></textarea>
        </div>

        {/* course price and estimated price */}
        <div className=" w-full mt-6 flex gap-10 justify-between items-start">
          {/* course price */}
          <div className=" w-[50%]">
            <label htmlFor="price" className="text-sm font-medium">
              Course Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={courseInfo.price}
              placeholder="40"
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={styles.inputStyle}
            />
          </div>

          {/* course estimated price */}
          <div className=" w-[50%]">
            <label htmlFor="estimatedPrice" className="text-sm font-medium">
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              placeholder="100"
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={styles.inputStyle}
            />
          </div>
        </div>

        {/* course tags and category */}
        <div className=" w-full mt-6 flex gap-10 justify-between items-start">
          {/* course tags */}
          <div className=" w-[50%]">
            <label htmlFor="tags" className="text-sm font-medium">
              Course Tags
            </label>
            <input
              type="text"
              name="courseTags"
              id="courseTags"
              value={courseInfo.tags}
              placeholder="React, Web Development, MongoDB, MERN, CSS,..."
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              className={styles.inputStyle}
            />
          </div>

          {/* course category */}
          <div className=" w-[50%]">
            <label htmlFor="categories" className="text-sm font-medium">
              Course Category
            </label>
            <select
              id="categories"
              required
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
              className={`${styles.inputStyle} text-black dark:text-white mt-4`}
            >
              <option value="" className=" text-black dark:text-white">
                Select Category
              </option>
              {categories?.map((category: any, i) => (
                <option
                  key={i}
                  value={category.title}
                  className=" text-black dark:text-white"
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* course level and demo url */}
        <div className=" w-full mt-6 flex gap-10 justify-between items-start">
          {/* course level */}
          <div className=" w-full">
            <label htmlFor="level" className="text-sm font-medium">
              Course Level
            </label>
            <select
              id="level"
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.inputStyle} text-black dark:text-white mt-4`}
            >
              <option value="" className=" text-black">
                Select Category
              </option>
              {levels?.map((category: any, i) => (
                <option
                  key={i}
                  value={category.title}
                  className=" text-black dark:text-white"
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* course thumbnail */}
        <div className=" w-full mt-8  ">
          <input
            type="file"
            accept="image/*"
            id="file"
            className=" hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${
              dragging ? "bg-primary text-white" : "bg-transparent"
            } min-h-[20vh] w-full flex justify-center items-center  text-center p-3 border border-gray-500`}
          >
            {courseInfo.thumbnail ? (
              <div className="relative w-full">
                <Image
                  src={
                    isEdit && !courseInfo.imagePreview
                      ? courseInfo.thumbnail
                      : courseInfo.imagePreview
                  }
                  alt="course_image"
                  width={200}
                  height={200}
                  className="max-h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className=" w-full cursor-pointer ">
                Drag and drop your image here or click to browse
              </span>
            )}
          </label>
        </div>

        {/* course demoVideo */}
        <div className=" w-full mt-8  ">
          <input
            type="file"
            accept="video/*"
            id="video"
            className=" hidden"
            onChange={handleVideoChange}
          />
          <label
            htmlFor="video"
            className={`${
              dragging
                ? "bg-primary text-white"
                : "bg-gray-300 dark:bg-gray-800"
            } min-h-[20vh] w-full flex justify-center items-center  text-center p-3`}
          >
            {courseInfo.demoVideo ? (
              <div className="relative w-full flex justify-center items-center">
                <video
                  src={
                    isEdit && !courseInfo.videoPreview
                      ? courseInfo.demoVideo
                      : courseInfo.videoPreview
                  }
                  controls
                  // width="400"
                  onLoad={() => URL.revokeObjectURL(courseInfo.demoVideo)} // Cleanup after load
                />
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className=" w-full cursor-pointer  font-medium ">
                Drag and drop your intro video here or click to browse (30mb
                max.)
              </span>
            )}
          </label>
        </div>

        {/* next button */}
        <div className="mt-8 w-full flex justify-end">
          <button
            type="submit"
            className=" bg-success text-white px-6 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
