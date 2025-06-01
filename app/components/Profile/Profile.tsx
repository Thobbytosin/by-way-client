"use client";

import { styles } from "../../styles/style";
import React, { useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import UserCourses from "./UserCourses";
import { signOut } from "next-auth/react";
import Logout from "../../components/Auth/Logout";
import { useLogoutQuery } from "../../../redux/auth/authApi";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [scroll, setScroll] = useState(false);
  const [logout, setLogout] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(null);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut(); // sign out the next auth session too
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 180) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div
      className={`flex sm:flex-row flex-col gap-10 sm:gap-4 lg:gap-8 w-full ${styles.paddingX} ${styles.paddingY} lg:min-h-screen sm:min-h-[50%]  relative`}
    >
      <div
        className={`sm:w-[270px] w-full h-fit overflow-clip bg-[#e2e2e258] dark:bg-[#f8fafc09]  sm:sticky rounded-xl ${
          scroll ? "sm:top-[120px]" : "sm:top-[30px]"
        }`}
      >
        <SidebarProfile
          active={active}
          setActive={setActive}
          avatar={avatar}
          user={user}
        />
      </div>

      {/* content  */}
      <div className="w-full bg-[rgba(226,226,226,0.35)] dark:bg-[#f8fafc09] rounded-xl sm:p-0 p-8">
        {active === 0 && <ProfileInfo avatar={avatar} user={user} />}
        {active === 1 && <UserCourses user={user} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && <Logout logoutHandler={logoutHandler} />}
      </div>
    </div>
  );
};

export default Profile;
