/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { styles } from "@/styles/style";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import { RootState } from "@/redux/store";
import { useAuthMutations } from "@/hooks/api/auth.api";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import Loader from "../Loader/Loader";
import ServerErrorUI from "../Home/ServerErrorUI";
import Header from "../Header";
import { useLoginMutation } from "@/hooks/api/login.api";

type Props = {};

// validation schema
const validationSchema = Yup.object().shape({
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
});

const Login = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: nextAuthData } = useSession();
  const { mutate: loginUser, isPending: loginUserLoading } = useLoginMutation();
  const { loginDomain, socialLoginUser } = useAuthMutations();
  // const { loginUser, loginUserLoading } = loginDomain;
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });

  // for social login
  useEffect(() => {
    if (!user) {
      let formData;
      if (nextAuthData) {
        formData = {
          name: nextAuthData.user?.name || "",
          email: nextAuthData.user?.email || "",
          avatar: nextAuthData.user?.image || "",
        };

        socialLoginUser(formData);
      }
    }
  }, [nextAuthData]);

  // formik login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      loginUser(formData);
    },
  });
  const { errors, touched, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <>
      <div className={styles.pageMinSize}>
        <Header />
        {serverLoading ? (
          <Loader key={"loading"} />
        ) : serverError ? (
          <ServerErrorUI errorMessage={serverError} />
        ) : (
          <>
            <div className=" w-full h-full flex items-center justify-center flex-col lg:flex-row-reverse bg-white dark:bg-black ">
              {/* image container / show only on laptop */}

              <div
                className="hidden md:block lg:w-[40%] w-[85%] h-[400px] lg:h-screen bg-slate-500 overflow-hidden bg-cover bg-center md:my-10 lg:my-0"
                style={{
                  backgroundImage: `url(/assets/login.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* content */}
              <div
                className={`w-[100%] lg:w-[60%] ${styles.paddingX} text-black dark:text-white`}
              >
                <h1 className=" text-center font-semibold text-2xl ">
                  Sign in to your Account
                </h1>
                <p className=" text-xs sm:text-sm text-center mt-2">
                  <span>Don&apos;t have an account?</span>

                  <span className=" ml-1 text-[14px] text-primary font-medium">
                    <Link href="/register">Sign up</Link>
                  </span>
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit} className=" mt-8">
                  {/* EMAIL INPUT */}
                  <div className=" mt-4 sm:mt-6">
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
                    <label
                      htmlFor="password"
                      className={`font-medium text-sm `}
                    >
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

                  <button
                    type="submit"
                    disabled={loginUserLoading}
                    className={`min-w-[24%] bg-black text-white dark:text-black dark:bg-white text-sm text-center py-3 px-4 sm:px-1  mt-6 sm:mt-4 rounded-md flex items-center justify-center gap-2 ${
                      loginUserLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {loginUserLoading ? (
                      <SimpleLoader isAdmin />
                    ) : (
                      <>
                        <span>Sign in</span>
                        <FaLongArrowAltRight />
                      </>
                    )}
                  </button>
                </form>

                {/* divider */}
                <div className=" w-full flex justify-between items-center gap-3  my-8">
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
          </>
        )}
      </div>
    </>
  );
};

export default Login;
