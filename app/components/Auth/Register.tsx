import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { styles } from "../../styles/style";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import CustomModal from "../../utils/CustomModal";
import Verification from "../../utils/Verification";
import {
  useRegisterMutation,
  useSocialAuthMutation,
} from "../../../redux/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

type Props = {};

// validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must be alphanumeric"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isSuccess, data, error }] = useRegisterMutation();
  const [socialAuth, { error: socialError, isSuccess: socialSuccess }] =
    useSocialAuthMutation();
  const { user, token } = useSelector((state: any) => state.auth);
  const { data: sessionData } = useSession();

  // for social login
  useEffect(() => {
    if (!user) {
      if (sessionData) {
        socialAuth({
          name: sessionData?.user?.name,
          email: sessionData?.user?.email,
          avtar: sessionData?.user?.image,
        });
      }
    }

    if (sessionData && socialSuccess) {
      toast.success("Login successfully");
    }

    if (socialError) {
      if ("data" in socialError) {
        const errorData = socialError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [sessionData, user]);

  // to check data from register server
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";

      toast.success(message);

      setOpen(true); // to open verification
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  //   form validation and submission
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      try {
        const dataToSubmit = {
          name: data.name,
          email: data.email,
          password: data.password,
        };

        await register(dataToSubmit);
      } catch (error: any) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // console.log(token);

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  // console.log(/\d/.test(values.password)); check if string contains a number

  return (
    <>
      <div className=" w-full h-full flex items-center  bg-white dark:bg-black ">
        {/* image container / show only on laptop */}
        <div
          className="hidden md:block w-[40%] h-full bg-slate-500 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/assets/register.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* content */}
        <div
          className={`w-[100%] md:w-[60%] ${styles.paddingX} text-black dark:text-white`}
        >
          <h1 className=" text-center font-semibold text-2xl ">
            Create Your Account
          </h1>
          <h5 className=" text-xs sm:text-sm text-center mt-2">
            <span>Already have an account?</span>
            <span className=" ml-1 text-[14px] text-primary font-medium">
              <Link href="/login">Sign in</Link>
            </span>
          </h5>

          {/* FORM */}
          <form onSubmit={handleSubmit} className=" mt-8">
            {/* NAME INPUT */}
            <div className=" mt-4 sm:mt-6">
              <label htmlFor="name" className={`font-medium text-sm`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                className={`block text-sm p-2 w-full outline-none bg-transparent border rounded-[6px]  mt-1 ${
                  touched.name && errors.name
                    ? "border-warning border-2"
                    : "border-gray-300"
                }`}
              />
              {touched.name && errors.name && (
                <span className="mt-1 text-xs text-warning">
                  {errors.name} *
                </span>
              )}
            </div>

            {/* EMAIL INPUT */}
            <div className="mt-4 sm:mt-6">
              <label htmlFor="email" className={`font-medium text-sm`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className={`block text-sm p-2 w-full outline-none bg-transparent border rounded-[6px] mt-1 ${
                  touched.email && errors.email
                    ? "border-warning border-2"
                    : "border-gray-300"
                }`}
              />
              {touched.email && errors.email && (
                <span className="mt-1 text-xs text-warning">
                  {errors.email} *
                </span>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div className=" mt-4 sm:mt-6 relative">
              <label htmlFor="password" className={`font-medium text-sm `}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className={`block text-sm p-2 w-full outline-none bg-transparent border rounded-[6px]  mt-1 ${
                  touched.password && errors.password
                    ? "border-warning border-2"
                    : "border-gray-300"
                }`}
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute right-[1rem] top-[2.4rem] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye size={16} />
                ) : (
                  <AiOutlineEyeInvisible color="#9ca3af" size={16} />
                )}
              </div>

              {touched.password && errors.password && (
                <span className="mt-1 text-xs text-warning">
                  {errors.password} *
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className=" mt-4 sm:mt-6 relative">
              <label
                htmlFor="confirmPassword"
                className={`font-medium text-sm `}
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`block text-sm p-2 w-full outline-none bg-transparent border rounded-[6px] mt-1 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-warning border-2"
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
              className=" min-w-[24%] bg-black text-white dark:text-black dark:bg-white text-xs sm:text-sm text-center py-3 px-4 sm:px-1 mt-6 sm:mt-4 rounded-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Registering..."
              ) : (
                <>
                  <span>Create account</span>
                  <FaLongArrowAltRight />
                </>
              )}
            </button>
          </form>

          {/* divider */}
          <div className=" w-full flex justify-between items-center gap-3 my-6 sm:my-8">
            <div className="bg-gray-300 h-[1px] w-[100px] md:w-[250px]" />
            <span className=" text-gray-300 text-xs ">Sign up with</span>
            <div className="bg-gray-300 h-[1px] w-[100px] md:w-[250px]" />
          </div>

          {/* socials */}
          <div className=" w-full flex justify-center items-center gap-4">
            {/* google */}
            <div
              onClick={() => signIn("google")}
              className={`py-2 w-[30%] md:w-[20%] flex items-center justify-center gap-1 border-gray-300 border rounded-md  transition duration-300 ${styles.whiteBtnHover} cursor-pointer`}
            >
              <FcGoogle size={20} />
              <span className=" text-xs">Google</span>
            </div>

            {/* github */}
            <div
              onClick={() => signIn("github")}
              className={`py-2 w-[30%] md:w-[20%] flex items-center justify-center gap-1 border-gray-300 border rounded-md  transition duration-300 ${styles.whiteBtnHover} cursor-pointer`}
            >
              <AiFillGithub size={20} />
              <span className=" text-xs">Github</span>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <CustomModal open={open} setOpen={setOpen} component={Verification} />
      )}
    </>
  );
};

export default Register;
