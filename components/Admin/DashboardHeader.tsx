import { NotificationsNoneIcon } from "../../icons/icons";
import ThemeSwitcher from "../../utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../redux/notification/notificationApi";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

import socketID from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"] });

type Props = {};

const DashboardHeader = (props: Props) => {
  const [close, setClose] = useState(false);
  const [hover, setHover] = useState(false);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess, isLoading }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dgtvvo8lo/video/upload/v1731815246/message-notification-103496_xucqxd.mp3"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      playNotificationSound();
      refetch(); // refetch all notifications
    });
  }, [refetch]);

  return (
    <div className=" flex gap-2 items-center justify-end fixed top-2 right-0 p-8 z-[99]  ">
      <ThemeSwitcher />
      <div
        // onMouseLeave={() => setHover(false)}
        onClick={() => {
          setHover((prev) => !prev);
        }}
        className=" relative cursor-pointer text-[26px]"
      >
        <div className=" hover:text-primary duration-500 transition text-[34px]">
          <NotificationsNoneIcon fontSize="inherit" />
        </div>
        <span className=" bg-green-500 text-white w-8 h-8 rounded-full absolute -top-[6px] -right-[10px] flex justify-center items-center text-[12px]">
          {notifications?.length}
        </span>
      </div>

      {hover && (
        <div>
          {/* <div className=" absolute top-0 left-10 w-screen h-screen bg-red-500" /> */}
          <div className="absolute top-[7.2rem] right-10 w-[350px] h-[50vh] overflow-y-scroll rounded-lg bg-[#0F172A] text-white dark:text-black dark:bg-slate-50 z-[99] ">
            {notifications?.map((item: any, index: number) => (
              <div key={index} className=" dark:bg-gray-300 p-4 border-b-2 ">
                <div className=" w-full flex items-center justify-between mb-2">
                  <p className=" font-semibold my-2">{item.title}</p>
                  <p
                    onClick={() => handleNotificationStatusChange(item._id)}
                    className=" cursor-pointer text-sm text-success font-medium"
                  >
                    Mark as read
                  </p>
                </div>
                <p className=" font-medium text-sm">{item.message}</p>
                <p className=" text-sm text-primary font-medium my-2">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
