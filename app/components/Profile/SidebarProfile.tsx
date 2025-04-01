import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { FaShareAlt } from "react-icons/fa";
import { styles } from "../../styles/style";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const sidebarLinks = [
  {
    id: "profile",
    title: "Profile",
  },
  {
    id: "my-courses",
    title: "My Courses",
  },
  {
    id: "change-password",
    title: "Change Password",
  },
  {
    id: "logout",
    title: "Logout",
  },
];

type Props = {
  user: any;
  active: number;
  setActive: (value: number) => void;
  avatar: string | null;
};

const SidebarProfile: FC<Props> = ({ active, avatar, setActive, user }) => {
  const profileUrl = window.location.href; // Current URL, assuming it's the profile page

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl).then(
      () => toast.success("Link copied"),
      (err) => toast.error("Error copying link")
    );
  };

  const router = useRouter();
  return (
    <div className=" w-full">
      {/* profile image */}
      <div className=" w-[100px] h-[100px] rounded-full border-2 flex justify-center items-end overflow-hidden mx-auto mt-4">
        <Image
          src={
            user?.avatar || avatar ? user?.avatar?.url || avatar : avatarDefault
          }
          height={100}
          width={100}
          alt="profile_image"
          className=" w-[100px] h-[100px] "
        />
      </div>

      {/* user name */}
      <h2 className=" text-center mt-4 text-xl font-medium">{user.name}</h2>
      <h4 className=" text-center mt-2 mb-6 text-[11px] font-light text-wrap">
        {user.email}
      </h4>

      {/* share button */}
      <button
        className={`mx-auto flex items-center gap-1 border dark:border-gray-700 rounded-lg px-4 py-3 text-sm bg-white ${styles.bgDark} hover:border-gray-400 hover:dark:border-gray-400 duration-300 transition`}
        onClick={copyToClipboard}
      >
        Share Profile
        <FaShareAlt stroke="2px" size={16} />
      </button>

      {/* divider */}
      <div className={`bg-white ${styles.bgDark} w-full h-[3px] my-4`} />

      {/* links */}
      <ul className=" w-full">
        {sidebarLinks.map((link, index) => (
          <li
            key={link.id}
            className={`w-full pl-4 py-4 cursor-pointer hover:${
              styles.bgDark
            } hover:dark:bg-white hover:text-white hover:bg-gray-900 hover:dark:text-gray-900 duration-300 transition text-sm lg:text-base ${
              active === index &&
              "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
            }`}
            onClick={() => {
              setActive(index);
            }}
          >
            {link.title}
          </li>
        ))}

        {/* admin dashboard */}
        {user.role === "admin" && (
          <li
            className={`w-full pl-4 py-4 text-sm lg:text-base cursor-pointer hover:${
              styles.bgDark
            } hover:dark:bg-white hover:text-white hover:bg-gray-900 hover:dark:text-gray-900 duration-300 transition ${
              active === 4 &&
              "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
            }`}
            onClick={() => {
              setActive(4);
              router.push("/admin");
            }}
          >
            Admin Dashboard
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarProfile;

// ****************************************************************************************************************************************************************

// const Profile = () => {
//   const profileUrl = window.location.href; // Current URL, assuming it's the profile page

//   const handleShare = (platform) => {
//     let shareUrl = "";

//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${profileUrl}&text=Check out this profile!`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${profileUrl}`;
//         break;
//       case "email":
//         shareUrl = `mailto:?subject=Check out this profile&body=Check out this profile: ${profileUrl}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, "_blank");
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl).then(
//       () => alert("Profile link copied to clipboard!"),
//       (err) => alert("Failed to copy the link!")
//     );
//   };

//   return (
//     <div>
//       <h2>My Profile</h2>
//       <button onClick={() => handleShare("facebook")}>Share on Facebook</button>
//       <button onClick={() => handleShare("twitter")}>Share on Twitter</button>
//       <button onClick={() => handleShare("linkedin")}>Share on LinkedIn</button>
//       <button onClick={() => handleShare("email")}>Share via Email</button>
//       <button onClick={copyToClipboard}>Copy Profile Link</button>
//     </div>
//   );
// };

// export default Profile;

// import React from "react";

// const Profile = () => {
//   const profileUrl = window.location.href; // Current URL, assuming it's the profile page

//   const handleShare = (platform) => {
//     let shareUrl = "";

//     switch (platform) {
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`;
//         break;
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${profileUrl}&text=Check out this profile!`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${profileUrl}`;
//         break;
//       case "email":
//         shareUrl = `mailto:?subject=Check out this profile&body=Check out this profile: ${profileUrl}`;
//         break;
//       default:
//         return;
//     }

//     window.open(shareUrl, "_blank");
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl).then(
//       () => alert("Profile link copied to clipboard!"),
//       (err) => alert("Failed to copy the link!")
//     );
//   };

//   return (
//     <div>
//       <h2>My Profile</h2>
//       <button onClick={() => handleShare("facebook")}>Share on Facebook</button>
//       <button onClick={() => handleShare("twitter")}>Share on Twitter</button>
//       <button onClick={() => handleShare("linkedin")}>Share on LinkedIn</button>
//       <button onClick={() => handleShare("email")}>Share via Email</button>
//       <button onClick={copyToClipboard}>Copy Profile Link</button>
//     </div>
//   );
// };

// export default Profile;
