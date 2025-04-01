import { AddCircleIcon, DeleteIcon } from "../../../../app/icons/icons";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/layout/layoutApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  // fetch data
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }

    if (isSuccess) {
      refetch();
      toast.success("Categories Updated");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  // delete category
  const handleDeleteCategory = (index: number) => {
    const updateCategories = categories?.filter((_, i) => i !== index);
    setCategories(updateCategories);
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
    oldCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
  };

  // check if any faq is empty
  const isAnyCategoryEmpty = () => {
    return categories.some((c) => c.title === "");
  };

  // save changes
  const handleSave = async () => {
    await editLayout({ type: "Categories", categories });
  };

  return (
    <div className=" p-10">
      <h1 className=" font-semibold text-4xl">All Categories</h1>
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
            {categories.length > 1 && !isLoading && (
              <DeleteIcon
                onClick={() => handleDeleteCategory(i)}
                color="warning"
                fontSize="large"
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        ))}

        <AddCircleIcon
          style={{ marginTop: "42px", fontSize: "50px", cursor: "pointer" }}
          onClick={handleAddNewCategory}
        />
      </div>

      {/* button */}
      <div className=" w-full  flex justify-start mt-40 ">
        {isLoading ? (
          <SimpleLoader isAdmin />
        ) : (
          <button
            className={` text-lg px-6 py-2 ${
              areCategoriesUnchanged(data?.layout.categories, categories) ||
              isAnyCategoryEmpty()
                ? "bg-secondary dark:bg-white dark:text-secondary text-white opacity-70 cursor-not-allowed "
                : "cursor-pointer bg-primary text-white"
            }  rounded-md text-center`}
            onClick={
              areCategoriesUnchanged(data?.layout.categories, categories) ||
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
