import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUpdateUserPasswordMutation } from "../../../redux/user/userApi";
import { useLoadUserQuery } from "../../../redux/api/apiSlice";
import toast from "react-hot-toast";

type Props = {};

// validation schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Old Password must be at least 6 characters")
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(6, "New Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "New Password must be alphanumeric"
    )
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = (props: Props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updateUserPassword, { isSuccess, error, isLoading }] =
    useUpdateUserPasswordMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success("Password updated");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        const dataToSubmit = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        };

        await updateUserPassword(dataToSubmit);
      } catch (error: any) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;
  return (
    <div className=" h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" w-full sm:w-[70%] lg:w-[50%] mx-auto "
      >
        {/* OLD PASSWORD INPUT */}
        <div className=" mt-4 sm:mt-6 relative">
          <label htmlFor="oldPassword" className={`font-medium text-sm `}>
            Old Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            id="pldPassword"
            name="oldPassword"
            onChange={handleChange}
            placeholder="Old Password"
            className={`block text-sm p-2 w-full outline-none bg-transparent border-b rounded-[6px]  mt-1 ${
              touched.oldPassword && errors.oldPassword
                ? "border-warning border-b-2"
                : "border-gray-300"
            }`}
          />
          <div
            onClick={() => setShowOldPassword((prev) => !prev)}
            className=" absolute right-[1rem] top-[2.4rem] cursor-pointer"
          >
            {showOldPassword ? (
              <AiOutlineEye size={16} />
            ) : (
              <AiOutlineEyeInvisible color="#9ca3af" size={16} />
            )}
          </div>

          {touched.oldPassword && errors.oldPassword && (
            <span className="mt-1 text-xs text-warning">
              {errors.oldPassword} *
            </span>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div className=" mt-4 sm:mt-6 relative">
          <label htmlFor="newPassword" className={`font-medium text-sm `}>
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            onChange={handleChange}
            placeholder="New Password"
            className={`block text-sm p-2 w-full outline-none bg-transparent border-b rounded-[6px] mt-1 ${
              touched.newPassword && errors.newPassword
                ? "border-warning border-b-2"
                : "border-gray-300"
            }`}
          />
          <div
            onClick={() => setShowNewPassword((prev) => !prev)}
            className=" absolute right-[1rem] top-[2.4rem] cursor-pointer"
          >
            {showNewPassword ? (
              <AiOutlineEye size={16} />
            ) : (
              <AiOutlineEyeInvisible color="#9ca3af" size={16} />
            )}
          </div>

          {touched.newPassword && errors.newPassword && (
            <span className="mt-1 text-xs text-warning">
              {errors.newPassword} *
            </span>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className=" mt-4 sm:mt-6 relative">
          <label htmlFor="confirmPassword" className={`font-medium text-sm `}>
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`block text-sm p-2 w-full outline-none bg-transparent border-b rounded-[6px] mt-1 ${
              touched.confirmPassword && errors.confirmPassword
                ? "border-warning border-b-2"
                : "border-gray-300"
            }`}
          />
          <div
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className=" absolute right-[1rem] top-[2.4rem] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEye size={16} />
            ) : (
              <AiOutlineEyeInvisible color="#9ca3af" size={16} />
            )}
          </div>

          {touched.confirmPassword && errors.confirmPassword && (
            <span className="mt-1 text-xs text-warning">
              {errors.confirmPassword} *
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" w-[100%] bg-black text-white dark:text-black dark:bg-white text-sm text-center py-3 px-4 sm:px-1  mt-6 sm:mt-4 rounded-md flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Loading..."
          ) : (
            <>
              <span>Update</span>
            </>
          )}
        </button>
      </form>

      {isLoading && (
        <div className=" fixed left-0 top-0 w-screen h-screen bg-gray-900 bg-opacity-70 ">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
