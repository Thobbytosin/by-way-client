import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { isServerOnline } from "../utils/isServerOnline";

type NotificationData = {
  title: string;
  message: string;
  userId: string;
};

export const useSocketNotification = () => {
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const initSocket = async () => {
      const online = await isServerOnline();
      if (!online) return;

      socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URI!, {
        autoConnect: true,
        reconnection: false, // Since only emitting
      });
    };

    initSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const emitNotification = (data: NotificationData) => {
    socketRef.current?.emit("notification", data);
  };

  return { emitNotification };
};
