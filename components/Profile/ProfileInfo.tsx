import { useFormik } from "formik";
import Image from "next/image";
import React, { FC, useState } from "react";
import * as Yup from "yup";
import avatarDefault from "@/public/assets/avatar.png";
import { AiFillCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useUserMutations } from "@/hooks/api/user.api";
import { TUser } from "@/types/user.types";

// validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
});

type Props = {
  user: TUser;
};

const ProfileInfo: FC<Props> = ({ user }) => {
  const { userInfo, infoLoading } = useUserMutations();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // for user profile image upload
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setPreviewUrl(imagePreview);

      const form = new FormData();

      form.append("avatar", file);

      userInfo.updateProfilePicture(form);
    } else {
      return toast.error("ERROR UPLOADING FILE TO SERVER");
    }
  };

  //   form validation and submission
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        const dataToSubmit = {
          name: data.name,
        };

        userInfo.updateUser(dataToSubmit);
      } catch (error: any) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <div className=" w-full h-full gap-8 lg:gap-4 flex flex-col items-center justify-center">
      {/* profile image */}
      <div className=" lg:w-[140px] lg:h-[140px] sm:w-[110px] sm:h-[110px] rounded-full border-2 border-transparent mx-auto mb-8 relative">
        <div className=" w-full h-full flex justify-center items-end overflow-hidden rounded-full">
          <Image
            src={previewUrl || (user?.avatar ? user.avatar.url : avatarDefault)}
            width={140}
            height={140}
            alt="profile_image"
            className=" w-[140px] h-[140px] "
          />
          <input
            type="file"
            id="avatar"
            // ref={fileInputRef}
            className=" hidden"
            onChange={handleImageChange}
            name="avatar"
            accept="image/*"
          />
        </div>
        <div
          className={`cursor-pointer absolute -bottom-2 lg:bottom-0 right-[10px] lg:right-[12px] w-10 h-10 rounded-full flex justify-center items-center text-black dark:text-white  bg-white bg-gradient-to-b dark:from-gray-700 dark:to-gray-900 p-1  `}
        >
          <label
            htmlFor="avatar"
            className={`w-full h-full rounded-full flex justify-center items-center text-black dark:text-white  `}
          >
            <AiFillCamera size={20} />
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[70%] lg:w-[50%] mx-auto "
      >
        {/* NAME INPUT */}
        <div className="">
          <label htmlFor="name" className={`font-medium text-sm`}>
            Edit Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={user?.name ?? ""}
            onChange={handleChange}
            className={`block text-sm p-2 w-full outline-none bg-transparent border-b rounded-[6px]  mt-1 ${
              touched.name && errors.name
                ? "border-warning border-b-2"
                : "border-gray-300"
            } `}
          />
          {touched.name && errors.name && (
            <span className="mt-1 text-xs text-warning">
              {errors.name as string} *
            </span>
          )}
        </div>

        {/* EMAIL INPUT */}
        <div className=" mt-4 sm:mt-6 opacity-40">
          <label htmlFor="email" className={`font-medium text-sm`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email ?? ""}
            readOnly
            className={`block text-sm p-2 w-full outline-none bg-transparent border rounded-[6px] mt-1`}
          />
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

      {isSubmitting && (
        <div className=" fixed left-0 top-0 w-screen h-screen bg-gray-900 bg-opacity-70 ">
          <Loader />
        </div>
      )}

      {infoLoading.updateAvatarPending && (
        <div className=" fixed left-0 top-0 w-screen h-screen bg-gray-900 bg-opacity-70 ">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
