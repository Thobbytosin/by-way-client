import React, { FC, useState } from "react";
import { styles } from "../styles/style";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";

type Props = {
  handleSubmit: any;
  active: boolean;
  setActive: (value: boolean) => void;
  role: string;
  handleRoleChange: any;
  email: string;
  handleEmailChange: any;
  loading: boolean;
};

const UpdateUserRole: FC<Props> = ({
  handleSubmit,
  active,
  setActive,
  role,
  handleRoleChange,
  email,
  handleEmailChange,
  loading,
}) => {
  return (
    <div className=" fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center">
      <div
        onClick={() => setActive(!active)}
        className=" w-full h-full bg-transparent fixed left-0 top-0 "
      />
      <div className=" p-4 bg-white dark:bg-slate-800 rounded-lg z-[99]">
        <h3 className=" text-center font-medium text-[1.4rem] my-4">
          Add New Member
        </h3>
        <form onSubmit={handleSubmit} className=" my-4">
          {/* email input */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Email"
            className={styles.inputStyle}
          />
          {/* select options */}
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className={`${styles.inputStyle} text-black dark:text-white mt-4`}
          >
            <option value="admin" className=" text-black">
              Admin
            </option>
            <option value="user" className=" text-black">
              User
            </option>
          </select>

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="text-md text-center bg-primary py-2 rounded-full font-medium text-white transition duration-300 hover:text-primary hover:border hover:bg-transparent hover:border-primary w-full mt-4"
          >
            {loading ? <SimpleLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserRole;
