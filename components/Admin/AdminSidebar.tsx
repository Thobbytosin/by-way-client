import {
  AdminPanelSettingsIcon,
  BarChartIcon,
  BubbleChartIcon,
  CategoryIcon,
  CreateNewFolderIcon,
  DashboardIcon,
  FirstPageIcon,
  InsightsIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowRightIcon,
  LiveHelpIcon,
  MenuBookIcon,
  PeopleIcon,
  ShowChartIcon,
  SourceIcon,
  StreamIcon,
  WebIcon,
} from "@/icons/icons";
import { styles } from "@/styles/style";
import FolderCopy from "@mui/icons-material/FolderCopy";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import React, { FC, useState } from "react";
import avatarDefault from "@/public/assets/avatar.png";
import { TUser } from "@/types/user.types";
import SmartLink from "../SmartLink";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";

type Props = {
  collapse: boolean;
  setCollapse: (value: boolean) => void;
  user: TUser | undefined;
};

const AdminSidebar: FC<Props> = ({ setCollapse, collapse, user }) => {
  const [hoverCollapse, setHoverCollapse] = useState(false);
  const [hoverDash, setHoverDash] = useState(false);
  const [hoverCourse, setHoverCourse] = useState(false);
  const [hoverContent, setHoverContent] = useState(false);
  const [hoverPeople, setHoverPeople] = useState(false);
  const [hoverAnalytics, setHoverAnalytics] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [showContentOptions, setShowContentOptions] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const pathName = usePathname();
  const { navigate } = useRouteLoader();
  const params = useParams();

  return (
    <div className=" w-full h-full flex flex-col justify-between ">
      {collapse ? (
        // COLLAPSE WINDOW
        <div className=" w-full flex flex-col items-center">
          {/* toggle collapse */}
          <div
            onMouseEnter={() => setHoverCollapse(true)}
            onMouseLeave={() => setHoverCollapse(false)}
            className=" cursor-pointer relative"
            onClick={() => setCollapse(false)}
          >
            <MenuBookIcon />

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md font-medium absolute w-[7rem] text-center top-0 left-4 ${
                hoverCollapse
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 hidden translate-x-100"
              } `}
            >
              Expand Window
            </span>
          </div>

          {/* dashboard */}
          <div
            onMouseEnter={() => setHoverDash(true)}
            onMouseLeave={() => setHoverDash(false)}
            onClick={() => navigate("/admin")}
            className={`cursor-pointer mt-10 ${
              pathName === "/admin" && "text-primary"
            } hover:text-primary duration-300 transition relative`}
          >
            <DashboardIcon fontSize="medium" color="inherit" />

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md font-medium absolute -top-4 left-2 ${
                hoverDash
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 hidden -translate-x-100"
              } `}
            >
              Dashboard
            </span>
          </div>

          {/* courses */}
          <div
            onClick={() => setShowCourseOptions((prev) => !prev)}
            className={`cursor-pointer mt-4 relative`}
          >
            <div
              onMouseEnter={() => setHoverCourse(true)}
              onMouseLeave={() => setHoverCourse(false)}
              className={` ${
                pathName === "/admin/create-course" && "text-primary"
              } ${pathName === "/admin/all-courses" && "text-primary"} ${
                pathName === `/admin/edit-course/${params?.id}` &&
                "text-primary"
              } hover:text-primary duration-300 transition`}
            >
              <FolderCopy fontSize="medium" color="inherit" />
            </div>

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md font-medium absolute -top-4 left-2 ${
                hoverCourse
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-100 hidden"
              } `}
            >
              Courses
            </span>

            {/* course options */}

            <div
              className={`${
                showCourseOptions ? "translate-x-0 opacity-100" : " hidden"
              } transition duration-300 absolute top-[0] left-10 w-[150px] bg-black dark:bg-white bg-opacity-45`}
            >
              <span
                onClick={() => navigate("/admin/create-course")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white  duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/create-course" && "bg-primary text-white"
                }`}
              >
                <CreateNewFolderIcon fontSize="small" />
                Add Course
              </span>
              <span
                onClick={() => navigate("/admin/all-courses")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/all-courses" && "bg-primary text-white"
                }`}
              >
                <StreamIcon fontSize="small" />
                All Courses
              </span>
            </div>
          </div>

          {/* users */}
          <div
            onMouseEnter={() => setHoverPeople(true)}
            onMouseLeave={() => setHoverPeople(false)}
            onClick={() => navigate("/admin/users")}
            className={`cursor-pointer mt-4 ${
              pathName === "/admin/users" && "text-primary"
            } hover:text-primary duration-300 transition relative`}
          >
            <PeopleIcon fontSize="medium" color="inherit" />

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md font-medium absolute -top-4 left-2 ${
                hoverPeople
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 hidden -translate-x-100"
              } `}
            >
              Users
            </span>
          </div>

          {/* manage admin */}
          <div
            onMouseEnter={() => setHoverAdmin(true)}
            onMouseLeave={() => setHoverAdmin(false)}
            onClick={() => navigate("/admin/manage-admin")}
            className={`cursor-pointer mt-4 ${
              pathName === "/admin/manage-admin" && "text-primary"
            } hover:text-primary duration-300 transition relative`}
          >
            <AdminPanelSettingsIcon fontSize="medium" color="inherit" />

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md w-[7.6rem] font-medium absolute -top-4 left-[14px] ${
                hoverAdmin
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 hidden -translate-x-100"
              } `}
            >
              Manage Admin
            </span>
          </div>

          {/* manage content */}
          <div
            onClick={() => setShowContentOptions((prev) => !prev)}
            className={`cursor-pointer mt-4 relative`}
          >
            <div
              onMouseEnter={() => setHoverContent(true)}
              onMouseLeave={() => setHoverContent(false)}
              className={` ${pathName === "/admin/hero" && "text-primary"}  ${
                pathName === "/admin/faqs" && "text-primary"
              } ${
                pathName === "/admin/categories" && "text-primary"
              } hover:text-primary duration-300 transition`}
            >
              <SourceIcon fontSize="medium" color="inherit" />
            </div>

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md w-[8rem] font-medium absolute -top-4 left-[18px] ${
                hoverContent
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-100 hidden"
              } `}
            >
              Manage Content
            </span>

            {/* content options */}

            <div
              className={`${
                showContentOptions ? "translate-x-0 opacity-100" : " hidden"
              } transition duration-300 absolute top-[0] left-10 w-[150px] bg-black dark:bg-white bg-opacity-45`}
            >
              <span
                onClick={() => navigate("/admin/hero")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white  duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/hero" && "bg-primary text-white"
                }`}
              >
                <WebIcon fontSize="small" />
                Hero
              </span>
              <span
                onClick={() => navigate("/admin/faqs")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/faqs" && "bg-primary text-white"
                }`}
              >
                <LiveHelpIcon fontSize="small" />
                Faqs
              </span>
              <span
                onClick={() => navigate("/admin/categories")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/categories" && "bg-primary text-white"
                }`}
              >
                <CategoryIcon fontSize="small" />
                Categories
              </span>
            </div>
          </div>

          {/* analytics */}
          <div
            onClick={() => setShowAnalytics((prev) => !prev)}
            className={`cursor-pointer mt-4 relative`}
          >
            <div
              onMouseEnter={() => setHoverAnalytics(true)}
              onMouseLeave={() => setHoverAnalytics(false)}
              className={` ${
                pathName === "/admin/courses-analytics" && "text-primary"
              }  ${pathName === "/admin/users-analytics" && "text-primary"} ${
                pathName === "/admin/orders-analytics" && "text-primary"
              } hover:text-primary duration-300 transition`}
            >
              <InsightsIcon fontSize="medium" color="inherit" />
            </div>

            {/* icon name on hover */}
            <span
              className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md w-[6rem] text-center font-medium absolute -top-4 left-[18px] ${
                hoverAnalytics
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-100 hidden"
              } `}
            >
              Analytics
            </span>

            {/* analytics options */}

            <div
              className={`${
                showAnalytics ? "translate-x-0 opacity-100" : " hidden"
              } transition duration-300 absolute top-[0] left-10 w-[150px] bg-black dark:bg-white bg-opacity-45`}
            >
              <span
                onClick={() => navigate("/admin/courses-analytics")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white  duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/courses-analytics" &&
                  "bg-primary text-white"
                }`}
              >
                <BarChartIcon fontSize="small" />
                Courses Analytics
              </span>
              <span
                onClick={() => navigate("/admin/users-analytics")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/users-analytics" &&
                  "bg-primary text-white"
                }`}
              >
                <BubbleChartIcon fontSize="small" />
                Users Analytics
              </span>
              <span
                onClick={() => navigate("/admin/orders-analytics")}
                className={`w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer p-1 flex items-center gap-2 ${
                  pathName === "/admin/orders-analytics" &&
                  "bg-primary text-white"
                }`}
              >
                <ShowChartIcon fontSize="small" />
                Orders Analytics
              </span>
            </div>
          </div>
        </div>
      ) : (
        // EXPANDED WINDOW
        <div>
          {/* logo and toggler */}
          <div className={`w-full ${styles.flexBetweenCenter} `}>
            {/* Logo */}
            <div>
              <SmartLink href={"/"} className=" flex items-center">
                <Image
                  src={require("@/public/logo.png")}
                  width={18}
                  height={26}
                  alt="app_logo"
                  className="w-4 h-6"
                />
                <h3 className=" font-semibold text-[12px] ml-1">ByWay</h3>
              </SmartLink>
            </div>

            {/* toggler */}
            <div className=" cursor-pointer" onClick={() => setCollapse(true)}>
              <FirstPageIcon fontSize="medium" />
            </div>
          </div>

          {/* dashboard */}
          <div
            onClick={() => navigate("/admin")}
            className={`w-full flex items-center gap-2 hover:text-primary duration-300 transition cursor-pointer mt-10 text-xl ${
              pathName === "/admin" && "text-primary"
            }`}
          >
            <DashboardIcon fontSize="inherit" />
            <h4 className=" text-sm font-medium">Dashboard </h4>
          </div>

          {/* courses */}
          <div
            onClick={() => setShowCourseOptions((prev) => !prev)}
            className={`relative w-full  cursor-pointer mt-4 text-xl `}
          >
            <div
              className={`w-full flex items-center justify-between  hover:text-primary duration-300 transition ${
                pathName === "/admin/create-course" && "text-primary"
              } ${pathName === "/admin/all-courses" && "text-primary"} ${
                pathName === `/admin/edit-course/${params?.id}` &&
                "text-primary"
              }`}
            >
              <div className=" flex items-center gap-2 ">
                <FolderCopy fontSize="inherit" />
                <h4 className=" text-sm font-medium">Courses </h4>
              </div>
              <span className="">
                {showCourseOptions ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </span>
            </div>
          </div>

          {/* add courses */}
          {showCourseOptions && (
            <div
              onClick={() => navigate("/admin/create-course")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/create-course" && "bg-primary text-white"
              }`}
            >
              <CreateNewFolderIcon fontSize="small" />
              Add Course
            </div>
          )}

          {/* all courses */}
          {showCourseOptions && (
            <div
              onClick={() => navigate("/admin/all-courses")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/all-courses" && "bg-primary text-white"
              }`}
            >
              <StreamIcon fontSize="small" />
              Live Courses
            </div>
          )}

          {/* users */}
          <div
            onClick={() => navigate("/admin/users")}
            className={`w-full flex items-center gap-2 hover:text-primary duration-300 transition cursor-pointer mt-4 text-xl ${
              pathName === "/admin/users" && "text-primary"
            }`}
          >
            <PeopleIcon fontSize="inherit" />
            <h4 className=" text-sm font-medium">Users </h4>
          </div>

          {/* manage admin */}
          <div
            onClick={() => navigate("/admin/manage-admin")}
            className={`w-full flex items-center gap-2 hover:text-primary duration-300 transition cursor-pointer mt-4 text-xl ${
              pathName === "/admin/manage-admin" && "text-primary"
            }`}
          >
            <AdminPanelSettingsIcon fontSize="inherit" />
            <h4 className=" text-sm font-medium">Manage Admin</h4>
          </div>

          {/* manage content */}
          <div
            onClick={() => setShowContentOptions((prev) => !prev)}
            className={`relative w-full  cursor-pointer mt-4 text-xl `}
          >
            <div
              className={`w-full flex items-center justify-between  hover:text-primary duration-300 transition ${
                pathName === "/admin/hero" && "text-primary"
              } ${pathName === "/admin/faqs" && "text-primary"} ${
                pathName === "/admin/categories" && "text-primary"
              } `}
            >
              <div className=" flex items-center gap-2 ">
                <SourceIcon fontSize="inherit" />
                <h4 className=" text-sm font-medium">Manage Content </h4>
              </div>
              <span className="">
                {showContentOptions ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </span>
            </div>
          </div>

          {/* hero */}
          {showContentOptions && (
            <div
              onClick={() => navigate("/admin/hero")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/hero" && "bg-primary text-white"
              }`}
            >
              <WebIcon fontSize="small" />
              Hero
            </div>
          )}

          {/* faqs*/}
          {showContentOptions && (
            <div
              onClick={() => navigate("/admin/faqs")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/faqs" && "bg-primary text-white"
              }`}
            >
              <LiveHelpIcon fontSize="small" />
              Faqs
            </div>
          )}

          {/* categories*/}
          {showContentOptions && (
            <div
              onClick={() => navigate("/admin/categories")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/categories" && "bg-primary text-white"
              }`}
            >
              <CategoryIcon fontSize="small" />
              Categories
            </div>
          )}

          {/* analytics */}
          <div
            onClick={() => setShowAnalytics((prev) => !prev)}
            className={`relative w-full  cursor-pointer mt-4 text-xl `}
          >
            <div
              className={`w-full flex items-center justify-between  hover:text-primary duration-300 transition ${
                pathName === "/admin/courses-analytics" && "text-primary"
              } ${pathName === "/admin/users-analytics" && "text-primary"} ${
                pathName === "/admin/orders-analytics" && "text-primary"
              } `}
            >
              <div className=" flex items-center gap-2 ">
                <InsightsIcon fontSize="inherit" />
                <h4 className=" text-sm font-medium">Analytics </h4>
              </div>
              <span className="">
                {showAnalytics ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
              </span>
            </div>
          </div>

          {/* courses analytics */}
          {showAnalytics && (
            <div
              onClick={() => navigate("/admin/courses-analytics")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/courses-analytics" &&
                "bg-primary text-white"
              }`}
            >
              <BarChartIcon fontSize="small" />
              Courses Analytics
            </div>
          )}

          {/* users analytics*/}
          {showAnalytics && (
            <div
              onClick={() => navigate("/admin/users-analytics")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/users-analytics" && "bg-primary text-white"
              }`}
            >
              <BubbleChartIcon fontSize="small" />
              Users Analytics
            </div>
          )}

          {/* orders analytics */}
          {showAnalytics && (
            <div
              onClick={() => navigate("/admin/orders-analytics")}
              className={` w-full text-[12px] hover:bg-primary hover:text-white duration-300 transition cursor-pointer px-2 py-4 flex items-center gap-2 ${
                pathName === "/admin/orders-analytics" &&
                "bg-primary text-white"
              }`}
            >
              <ShowChartIcon fontSize="small" />
              Orders Analytics
            </div>
          )}
        </div>
      )}

      {/* for profile image */}
      {collapse ? (
        <div className=" w-full flex items-center relative">
          <div
            onMouseEnter={() => setHoverProfile(true)}
            onMouseLeave={() => setHoverProfile(false)}
            className=" w-6 h-6 rounded-full overflow-hidden border-2 border-primary"
          >
            <Image
              src={user?.avatar ? user?.avatar?.url : avatarDefault}
              alt="profile_image"
              width={24}
              height={24}
              className=" w-full h-full"
            />
          </div>

          {/* icon name on hover */}
          <span
            className={`text-[12px] dark:bg-slate-50 bg-[#0F172A] p-1 transition duration-700  text-white dark:text-black rounded-md font-medium absolute -top-4 left-2 w-14 ${
              hoverProfile
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            } `}
          >
            Hi, {user && user.name}
          </span>
        </div>
      ) : (
        <div className=" w-full flex items-center gap-2">
          <div className=" w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={user?.avatar ? user?.avatar?.url : avatarDefault}
              alt="profile_image"
              width={40}
              height={40}
              className=" w-full h-full"
            />
          </div>
          <h4 className=" text-sm font-medium">Hi, {user && user.name}</h4>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
