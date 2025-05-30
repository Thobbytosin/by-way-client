/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from "../../utils/SearchBar";
import React, { FC, useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useGetHeroDataQuery } from "../../../redux/layout/layoutApi";
import { useGetAllCoursesWithoutPurchaseQuery } from "../../../redux/course/courseApi";

import CourseCard from "../Course/CourseCard";
import { styles } from "../../styles/style";
import Loader from "../Loader/Loader";

type Props = {
  search: any;
};

const Courses: FC<Props> = ({ search }) => {
  // const [search, setSearch] = useState(search)
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const [category, setCategory] = useState(search || "All");
  const [courses, setCourses] = useState([]);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetHeroDataQuery("Categories", {});
  const {
    data: coursesData,
    isLoading: coursesIsLoading,
    refetch: coursesRefetch,
  } = useGetAllCoursesWithoutPurchaseQuery({});

  //   update params
  const updateSearchParam = (newSearchValue: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", newSearchValue);

    // Update the URL without refreshing or navigating away
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  useEffect(() => {
    coursesRefetch();

    // filter all
    if (category === "All") {
      setCourses(coursesData?.courses);

      return;
    }

    // filter by category
    if (category !== "All" && category !== "" && search !== "") {
      setCourses(
        coursesData?.courses?.filter(
          (item: any) =>
            item.category?.toLowerCase().startsWith(search?.toLowerCase()) ||
            item.category === category ||
            item.name?.toLowerCase().includes(search?.toLowerCase())
        )
      );

      return;
    }

    // filter by search term from page
    if (category === "" && search !== "" && searchText) {
      setCourses(
        coursesData?.courses?.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchText?.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText?.toLowerCase())
        )
      );
      return;
    }

    // }
  }, [coursesData, category, search, searchText]);

  const handleSearch = () => {
    if (searchText === "") {
      return;
    } else {
      router.push(`/courses?search=${searchText}`);
    }
  };

  const handleKeyboardEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen">
      {coursesIsLoading ? (
        <Loader />
      ) : (
        <>
          {/* banner */}
          <div
            className=" w-full bg-black h-[450px] flex flex-col justify-center items-center relative"
            style={{
              backgroundImage: `url(/assets/coursesBanner.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className=" absolute left-0 top-0 w-full h-full bg-slate-950 bg-opacity-60 " />
            <div className=" w-[85%] sm:w-[70%] mx-auto bg-white bg-opacity-90 z-[9] py-1 sm:py-2 pr-2 pl-4 sm:pl-6 rounded-full">
              <SearchBar
                key={1}
                setSearchTerm={setSearchText}
                searchTerm={searchText}
                handleKeyboardEnter={handleKeyboardEnter}
                handleSearch={handleSearch}
                setCategoryTag={setCategory}
                forCourses
              />
            </div>
            <div className=" flex items-center justify-center max-w-[85%] sm:max-w-[70%] flex-wrap gap-3 mx-auto z-[9] mt-8">
              {/* all categories */}
              <div
                className={`px-6 py-1 text-xs  text-center rounded-full cursor-pointer font-medium ${
                  category === "All"
                    ? "bg-red-600 text-white"
                    : "bg-lime-500 text-white "
                }`}
                onClick={() => {
                  setSearchText("");
                  updateSearchParam("All".toLowerCase());
                  setCategory("All");
                }}
              >
                All
              </div>
              {/* rest of the categories */}
              {categoriesData?.layout?.categories?.map((c: any) => (
                <div
                  key={c?._id}
                  className={`px-6 py-1 text-xs text-center rounded-full font-medium cursor-pointer ${
                    category === c?.title
                      ? "bg-white text-black"
                      : "bg-primary text-white"
                  } `}
                  onClick={() => {
                    setSearchText("");
                    updateSearchParam(c?.title?.toLowerCase());
                    setCategory(c?.title);
                  }}
                >
                  {c?.title}
                </div>
              ))}
            </div>
          </div>

          {/* courses */}

          <div className={`w-full my-10 sm:my-20 ${styles.paddingX}`}>
            {/* when there is no course */}
            {!courses?.[0] && (
              <h2 className={styles.courseSubTagHeading}>
                No course found yet.
              </h2>
            )}

            {/* for all courses */}
            {courses?.[0] && category === "All" && (
              <>
                <h2 className={styles.courseSubTagHeading}>
                  All Courses{" "}
                  <span className=" text-base">({courses?.length})</span>
                </h2>
                <div
                  className={`flex lg:justify-start justify-center gap-4 flex-wrap mt-10 `}
                >
                  {courses?.map((course: any, i: number) => (
                    <CourseCard key={i} course={course} i={i} />
                  ))}
                </div>
              </>
            )}

            {/* for not all courses */}
            {courses?.[0] && category !== "All" && (
              <>
                <h2 className={styles.courseSubTagHeading}>
                  {courses?.length}{" "}
                  {courses?.length === 1 ? "course found" : "courses found"}
                </h2>
                <div className={`flex gap-3 flex-wrap mt-10 `}>
                  {courses?.map((course: any, i: number) => (
                    <CourseCard key={i} course={course} i={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
