import { AddCircleIcon, DeleteIcon } from "../../../icons/icons";
import { styles } from "../../../styles/style";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setActive,
  setBenefits,
  setPrerequisites,
  prerequisites,
  active,
}) => {
  // updating the array
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits]; // spread the array
    const updatedItem = { ...updatedBenefits[index], title: value };
    updatedBenefits[index] = updatedItem;
    setBenefits(updatedBenefits);
  };

  //   add another benefit
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  //   remove a benefit
  const handleDeleteBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  //   prerequisites
  // updating the array
  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    const updatedItem = {
      ...updatedPrerequisites[index],
      title: value,
    }; // Create a shallow copy of the object
    updatedPrerequisites[index] = updatedItem; // Replace the item in the array with the updated one
    setPrerequisites(updatedPrerequisites);
  };

  //   add another benefit
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  //   remove a benefit
  const handleDeletePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  //   go to prev page
  const prevButton = () => {
    setActive(active - 1);
  };

  //   go to next page
  const handleNextPage = () => {
    if (
      benefits[benefits.length - 1].title === "" &&
      prerequisites[prerequisites.length - 1].title === ""
    ) {
      toast.error("Please fill the fields before proceeding");
    } else {
      setActive(active + 1);
    }
  };

  return (
    <div className=" mt-[6rem] w-[80%]">
      {/* benefits */}
      <div className=" w-full">
        <label htmlFor="benefits" className=" text-sm font-medium">
          What are the benefits of taking this course?
        </label>
        <div>
          {benefits.map((benefit: any, index) => (
            <div key={index} className=" flex gap-3 items-center">
              <input
                type="text"
                name="benefit"
                id="benefit"
                placeholder="You will have access to over 30 video resources..."
                value={benefit.title}
                onChange={(e: any) =>
                  handleBenefitChange(index, e.target.value)
                }
                className={styles.inputStyle}
              />

              {benefits.length > 1 && (
                <DeleteIcon
                  onClick={() => handleDeleteBenefit(index)}
                  color="warning"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ))}
          <AddCircleIcon
            style={{ marginTop: "16px", fontSize: "30px", cursor: "pointer" }}
            onClick={handleAddBenefit}
          />
        </div>
      </div>

      {/* prerequisites */}
      <div className=" w-full mt-20">
        <label htmlFor="prerequisites" className=" text-sm font-medium">
          What are the prerequisites before taking this course?
        </label>
        <div>
          {prerequisites.map((prerequisite: any, index) => (
            <div key={index} className=" flex gap-3 items-center">
              <input
                type="text"
                name="prerequisites"
                id="prerequisites"
                placeholder="You need a computer..."
                value={prerequisite.title}
                onChange={(e: any) =>
                  handlePrerequisiteChange(index, e.target.value)
                }
                className={styles.inputStyle}
              />

              {prerequisites.length > 1 && (
                <DeleteIcon
                  onClick={() => handleDeletePrerequisite(index)}
                  color="warning"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ))}
          <AddCircleIcon
            style={{ marginTop: "16px", fontSize: "30px", cursor: "pointer" }}
            onClick={handleAddPrerequisite}
          />
        </div>
      </div>
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

export default CourseData;
