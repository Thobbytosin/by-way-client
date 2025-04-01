import {
  AddCircleIcon,
  AddIcon,
  AddLinkIcon,
  ArrowDropDownIcon,
  DeleteIcon,
  EditIcon,
} from "../../../icons/icons";
import { styles } from "../../../styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (value: number) => void;
  courseContentData: any;
  setCourseContentData: (value: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [activeSection, setActiveSection] = useState(1);
  const [hoverLink, setHoverLink] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(true)
  ); // create an array with a length and fill with false e.g [false, false, false,....]

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  //   toggle collapsed state
  const handleToggleCollapse = (index: number) => {
    const updatedCollapse = [...isCollapsed];
    updatedCollapse[index] = !updatedCollapse[index]; // turns the value(boolean) to opposite. e.g true becomes false or vice versa
    setIsCollapsed(updatedCollapse);
  };

  //   delete link
  const handleDeleteLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  //   add new link
  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData]; // Shallow copy of courseContentData
    const currentLinks = [...updatedData[index].links]; // Shallow copy of the links array

    // Check if the last link's fields are empty
    if (
      currentLinks[currentLinks.length - 1].title === "" ||
      currentLinks[currentLinks.length - 1].url === ""
    ) {
      toast.error("Please fill the link fields before adding a new link");
    } else {
      currentLinks.push({ title: "", url: "" }); // Push a new link to the copied links array
      updatedData[index] = { ...updatedData[index], links: currentLinks }; // Update the course content with the new links array
      setCourseContentData(updatedData); // Update the state
    }
  };

  //   add new objective
  const handleAddObjective = (index: number) => {
    const updatedData = [...courseContentData];
    const currentObjectives = [...updatedData[index].objectives];

    // check if last objective is not empty
    if (currentObjectives[currentObjectives.length - 1]?.title === "") {
      toast.error(
        "Please fill the objective fields before adding a new objective"
      );
    } else {
      currentObjectives.push({ title: "" });
      updatedData[index] = {
        ...updatedData[index],
        objectives: currentObjectives,
      };
      setCourseContentData(updatedData);
    }
  };

  //   delete objective
  const handleDeleteObjective = (index: number, objectiveIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].objectives.splice(objectiveIndex, 1);
    setCourseContentData(updatedData);
  };

  //  add new content (in the same section)
  const handleAddNewContent = (item: any) => {
    // check if all fields are filled
    if (
      item.title === "" ||
      item.videoTitle === "" ||
      item.videoDescription === "" ||
      item.videoDuration === "" ||
      item.videoUrl === "" ||
      item.links[item.links.length - 1].title === "" ||
      item.links[item.links.length - 1].url === ""
    ) {
      toast.error("Please fill all fields before creating a new content");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // check if a previous content section has already been created
        if (lastVideoSection) {
          // set the last video section to the present video section for them to be in the same section(if video section is equal, means they are in same section)

          //   this logic determines helps to create new content or section (showNewSectionInput logic in the form below)
          newVideoSection = lastVideoSection;
        }

        const newContent = {
          videoUrl: "",
          title: "",
          videoDescription: "",
          videoDuration: "",
          videoSection: newVideoSection,
          links: [
            {
              title: "",
              url: "",
            },
          ],
        };

        setCourseContentData([...courseContentData, newContent]);
      }
    }
  };

  //   add new section
  const handleAddNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoTitle === "" ||
      courseContentData[courseContentData.length - 1].videoDescription === "" ||
      courseContentData[courseContentData.length - 1].videoDuration === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].title === "" ||
      courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].url === ""
    ) {
      toast.error("Please fill all the fields before creating a new section");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        videoDescription: "",
        videoDuration: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  // previous page
  const prevButton = () => {
    setActive(active - 1);
  };

  //   go to next page
  const handleNextPage = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoTitle === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].title === "" ||
      courseContentData[courseContentData.length - 1].links[
        courseContentData[courseContentData.length - 1].links.length - 1
      ].url === ""
    ) {
      toast.error("Section can not be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className=" mt-[6rem] w-[80%]">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showNewSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-slate-400 bg-opacity-40 dark:bg-opacity-10 p-4 rounded-lg  ${
                showNewSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showNewSectionInput && (
                <>
                  <div className=" flex items-center">
                    <input
                      type="text"
                      value={item.videoSection}
                      className={`bg-transparent ${
                        item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                      } cursor-pointer outline-none py-3 text-xl font-medium`}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        const updatedItem = {
                          ...updatedData[index],
                          videoSection: e.target.value,
                        };
                        updatedData[index] = updatedItem;
                        setCourseContentData(updatedData);
                      }}
                    />
                    <EditIcon style={{ cursor: "pointer" }} />
                  </div>
                </>
              )}

              {/* content title, delete icon, collapse toggler */}
              <div className=" w-full flex items-center justify-between">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className=" text-md italic">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div className=" text-lg"></div>
                )}

                {/* arrow button to collapse the content and delete button t */}
                <div className=" flex items-center gap-2">
                  {/* delete content */}
                  <DeleteIcon
                    className={`text-warning ${
                      courseContentData.length > 1
                        ? "cursor-pointer"
                        : "cursor-no-drop opacity-40"
                    }`}
                    onClick={() => {
                      if (courseContentData.length > 1) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />

                  {/* arrow toggle for collapse */}
                  <ArrowDropDownIcon
                    fontSize="large"
                    className="cursor-pointer"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleToggleCollapse(index)}
                  />
                </div>
              </div>

              {/* content body */}
              {!isCollapsed[index] && (
                <>
                  {/* video title */}
                  <div className=" w-full my-6">
                    <label htmlFor="videoTitle" className={styles.labelTag}>
                      Video Title
                    </label>
                    <input
                      type="text"
                      id="videoTitle"
                      name="videoTitle"
                      value={item.title}
                      className={styles.inputStyle}
                      placeholder="Video Title..."
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        const updatedItem = {
                          ...updatedData[index],
                          title: e.target.value,
                        }; // Create a shallow copy of the object
                        updatedData[index] = updatedItem; // Replace the item in the array with the updated one
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* video url */}
                  <div className=" w-full mb-6">
                    <label htmlFor="videoUrl" className={styles.labelTag}>
                      Video URL
                    </label>
                    <input
                      type="text"
                      id="videoUrl"
                      name="videoUrl"
                      value={item.videoUrl}
                      className={styles.inputStyle}
                      placeholder="Video URL"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        const updatedItem = {
                          ...updatedData[index],
                          videoUrl: e.target.value,
                        };
                        updatedData[index] = updatedItem;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* video duration */}
                  <div className=" w-full mb-6">
                    <label htmlFor="videoDuration" className={styles.labelTag}>
                      Video Duration (in seconds)
                    </label>
                    <input
                      type="number"
                      id="videoDuration"
                      name="videoDuration"
                      value={item.videoDuration}
                      className={styles.inputStyle}
                      placeholder="Video Duration in seconds"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        const updatedItem = {
                          ...updatedData[index],
                          videoDuration: e.target.value,
                        };
                        updatedData[index] = updatedItem;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {/* video description */}
                  <div className=" w-full mb-6">
                    <label
                      htmlFor="videoDescription"
                      className={styles.labelTag}
                    >
                      Video Description
                    </label>
                    <textarea
                      id="videoDescription"
                      name="videoDescription"
                      cols={30}
                      rows={10}
                      placeholder="Write something about this video here..."
                      value={item.videoDescription}
                      onChange={(e: any) => {
                        const updatedData = [...courseContentData];
                        const updatedItem = {
                          ...updatedData[index],
                          videoDescription: e.target.value,
                        };
                        updatedData[index] = updatedItem;
                        setCourseContentData(updatedData);
                      }}
                      className={styles.inputStyle}
                    ></textarea>
                  </div>

                  <br />
                  <br />

                  {/* objectives */}
                  {item?.objectives?.map(
                    (objective: any, objectiveIndex: number) => (
                      <div key={objectiveIndex} className=" mb-6 block">
                        <div className=" w-full flex justify-between items-center">
                          <label
                            htmlFor={`objective${objectiveIndex}`}
                            className={styles.labelTag}
                          >
                            Objective {objectiveIndex + 1}
                          </label>
                          <DeleteIcon
                            className={`text-warning ${
                              item?.objectives.length > 1
                                ? "cursor-pointer"
                                : "cursor-no-drop opacity-40"
                            }`}
                            onClick={() => {
                              item?.objectives.length > 1
                                ? handleDeleteObjective(index, objectiveIndex)
                                : null;
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          id={`objective${objectiveIndex}`}
                          name={`objective${objectiveIndex}`}
                          placeholder="Learning Objectivess..."
                          className={styles.inputStyle}
                          value={objective.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            const updatedObjectives = [
                              ...updatedData[index].objectives,
                            ]; // Copy the objectives array
                            const updatedObjectiveItem = {
                              ...updatedObjectives[objectiveIndex],
                              title: e.target.value,
                            }; // Copy the specific objective object
                            updatedObjectives[objectiveIndex] =
                              updatedObjectiveItem; // Update the specific link
                            updatedData[index] = {
                              ...updatedData[index],
                              objectives: updatedObjectives,
                            }; // Update the main object with the new objectives array
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    )
                  )}

                  {/* add objective button */}
                  <div
                    className="inline-block cursor-pointer bg-[#0F172A]  dark:bg-slate-50 text-white dark:text-[#0f172a] rounded-md p-2 mb-10 relative"
                    onClick={() => handleAddObjective(index)}
                  >
                    <AddCircleIcon />
                  </div>

                  {/* links */}
                  {item?.links?.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className=" mb-6 block">
                      <div className=" w-full flex justify-between items-center">
                        <label
                          htmlFor={`link${linkIndex}`}
                          className={styles.labelTag}
                        >
                          Link {linkIndex + 1}
                        </label>
                        <DeleteIcon
                          className={`text-warning ${
                            item?.links.length > 1
                              ? "cursor-pointer"
                              : "cursor-no-drop opacity-40"
                          }`}
                          onClick={() => {
                            item?.links.length > 1
                              ? handleDeleteLink(index, linkIndex)
                              : null;
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        id={`link${linkIndex}`}
                        name={`link${linkIndex}`}
                        placeholder="Source code title (Link Title)..."
                        className={styles.inputStyle}
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          const updatedLinks = [...updatedData[index].links]; // Copy the links array
                          const updatedLinkItem = {
                            ...updatedLinks[linkIndex],
                            title: e.target.value,
                          }; // Copy the specific link object
                          updatedLinks[linkIndex] = updatedLinkItem; // Update the specific link
                          updatedData[index] = {
                            ...updatedData[index],
                            links: updatedLinks,
                          }; // Update the main object with the new links array
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        id={`link${linkIndex}`}
                        name={`link${linkIndex}`}
                        placeholder="Source code Url (Link Url)..."
                        className={styles.inputStyle}
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          const updatedLinks = [...updatedData[index].links]; // Copy the links array
                          const updatedLinkItem = {
                            ...updatedLinks[linkIndex],
                            url: e.target.value,
                          }; // Copy the specific link object
                          updatedLinks[linkIndex] = updatedLinkItem; // Update the specific link
                          updatedData[index] = {
                            ...updatedData[index],
                            links: updatedLinks,
                          }; // Update the main object with the new links array
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  {/* add link button */}
                  <div
                    onMouseEnter={() => setHoverLink(true)}
                    onMouseLeave={() => setHoverLink(false)}
                    className="inline-block cursor-pointer bg-[#0F172A]  dark:bg-slate-50 text-white dark:text-[#0f172a] rounded-md p-2 mb-6 relative"
                    onClick={() => handleAddLink(index)}
                  >
                    <AddLinkIcon />

                    <span
                      className={`absolute -top-4 left-0 text-[10px] dark:text-white dark:bg-black bg-white text-black py-1.5 w-[85px] flex justify-center items-center rounded-md transition duration-500 ${
                        hoverLink
                          ? "translate-x-0"
                          : "-translate-x-[50%] opacity-0"
                      }`}
                    >
                      Add new link
                    </span>
                  </div>

                  {/* add new content */}
                  {/* button should only show on the last content */}

                  {index === courseContentData.length - 1 && (
                    <div
                      onClick={() => handleAddNewContent(item)}
                      className=" flex items-center gap-1 font-medium underline cursor-pointer hover:text-primary transition duration-500"
                    >
                      <AddCircleIcon fontSize="small" />
                      <p className=" text-sm">Add new content</p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
        <br />

        {/* add new section */}
        <div
          onClick={() => handleAddNewSection()}
          className=" w-max flex items-center gap-1 font-medium underline cursor-pointer hover:text-green-500 transition duration-500"
        >
          <AddCircleIcon fontSize="small" />
          <p className=" text-sm">Add new section</p>
        </div>
      </form>

      <br />
      {/* prev button and next button */}
      <div className="mt-8 w-full flex justify-between">
        <button
          onClick={prevButton}
          className=" bg-warning text-white px-6 py-2 rounded-md"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          className=" bg-success text-white px-6 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
