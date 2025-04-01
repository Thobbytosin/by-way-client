import React, { FC } from "react";

type Props = {
  logoutHandler: any;
};

const Logout: FC<Props> = ({ logoutHandler }) => {
  return (
    <div className=" flex justify-center items-center h-full">
      <div>
        <h3 className=" font-medium text-lg">
          Are you sure you want to log out?
        </h3>
        <div className=" flex justify-center gap-4 mt-6">
          <button
            type="submit"
            onClick={() => logoutHandler()}
            className=" bg-primary rounded-[6px] text-center w-28 py-2 text-white text-sm hover:bg-transparent hover:border-2 hover:border-primary hover:text-black hover:dark:text-white duration-300 transition"
          >
            Yes, I&apos;m sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
