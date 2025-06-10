import { AddCircleIcon, DeleteIcon } from "@/icons/icons";
import React, { useState, useEffect } from "react";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import {
  useContentMutations,
  useContentQueries,
} from "@/hooks/api/content.api";

const EditCategories = () => {
  const { contentDomainData } = useContentQueries({
    categories: true,
  });
  const { categories: categoriesData } = contentDomainData;

  const { updateCategoriesDomain } = useContentMutations();
  const { updateCategories, updateCategoriesPending } = updateCategoriesDomain;

  const [categories, setCategories] = useState<
    { title: string; _id?: string }[]
  >([]);

  // fetch data
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  // delete category
  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories?.filter((_, i) => i !== index);
    setCategories(updatedCategories);

    updateCategories({ type: "Categories", categories: updatedCategories });
  };

  // add new category
  const handleAddNewCategory = () => {
    setCategories([...categories, { title: "" }]);
  };

  // handle category change
  const handleCategoryChange = (id: number, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, index) =>
        index === id ? { title: value } : cat
      )
    );
  };

  // check if categories are unchanged
  const areCategoriesUnchanged = (
    oldCategories: { title: string }[],
    newCategories: { title: string }[]
  ) => {
    return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
  };

  // check if any faq is empty
  const isAnyCategoryEmpty = () => {
    return categories.some((c) => c.title === "");
  };

  // save changes
  const handleSave = () => {
    updateCategories({ type: "Categories", categories });
  };

  return (
    <div className=" py-10">
      <h1 className=" font-semibold text-xl">All Categories</h1>
      <div className="mt-8">
        {categories?.map((category, i) => (
          <div
            key={i}
            className=" w-[50%] flex items-center justify-between py-4 px-2 hover:bg-gray-100 hover:dark:bg-slate-950 duration-300 transition "
          >
            <input
              type="text"
              placeholder="Enter new category..."
              className=" bg-transparent max-w-full outline-none"
              value={category.title}
              onChange={(e) =>
                !category._id && handleCategoryChange(i, e.target.value)
              }
            />
            {/* delete button */}
            {categories?.length > 1 && !updateCategoriesPending && (
              <DeleteIcon
                onClick={() => handleDeleteCategory(i)}
                color="warning"
                fontSize="small"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        ))}

        <AddCircleIcon
          style={{ marginTop: "42px", fontSize: "30px", cursor: "pointer" }}
          onClick={handleAddNewCategory}
        />
      </div>

      {/* button */}
      <div className=" w-full  flex justify-start mt-10 ">
        {updateCategoriesPending ? (
          <SimpleLoader isAdmin />
        ) : (
          <button
            className={` text-sm px-6 py-2 ${
              (categoriesData &&
                areCategoriesUnchanged(categoriesData, categories)) ||
              isAnyCategoryEmpty()
                ? "bg-secondary dark:bg-white dark:text-secondary text-white opacity-70 cursor-not-allowed "
                : "cursor-pointer bg-primary text-white"
            }  rounded-md text-center`}
            onClick={
              (categoriesData &&
                areCategoriesUnchanged(categoriesData, categories)) ||
              isAnyCategoryEmpty()
                ? () => null
                : handleSave
            }
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default EditCategories;
