import React, { FC } from "react";

type Props = {
  handleDelete: any;
  open: boolean;
  setOpen: (value: boolean) => void;

  loading?: boolean;
};

const DeleteCourseModal: FC<Props> = ({
  handleDelete,
  open,
  setOpen,

  loading,
}) => {
  return (
    <div className=" fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center">
      <div
        onClick={() => setOpen(!open)}
        className=" w-full h-full bg-transparent fixed left-0 top-0 "
      />
      <div className=" p-4 bg-white dark:bg-slate-800 rounded-lg z-[99]">
        <h3 className=" text-center font-medium text-[1.4rem] my-4 ">
          Are you sure you want to delete this course?
        </h3>
        <div className=" w-full flex justify-between items-center mt-10">
          <button
            onClick={() => setOpen(!open)}
            className=" py-3 w-[8rem] bg-warning rounded-full text-white text-center hover:opacity-95 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className=" py-3 w-[8rem] bg-success rounded-full text-white text-center hover:opacity-95 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
