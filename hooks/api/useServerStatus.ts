/* eslint-disable react-hooks/exhaustive-deps */
import { isServerOnline } from "@/utils/isServerOnline";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export const useServerStatus = (options?: { checkInterval?: number }) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const isMounted = typeof document !== "undefined";
  const wasOfflineRef = useRef(false);
  const consecutiveChecksRef = useRef(0);

  const checkStatus = async () => {
    if (!isMounted) return;
    setIsLoading(true);
    setError(null);

    const online = await isServerOnline();

    if (!online) {
      wasOfflineRef.current = true; // track offline
      setIsOnline(false);
      setError("Please check your network");
      consecutiveChecksRef.current = 0; // set to 0 when server is down
    } else {
      // show toast only if server is coming from being down
      if (wasOfflineRef.current) {
        toast.success("Connection restored!", {
          position: "bottom-right",
          duration: 5000,
        });

        wasOfflineRef.current = false;

        window.location.reload();
      }

      consecutiveChecksRef.current++; // increase consecutive success check by 1
      setError(null);
      setIsOnline(true);

      // Stop checking after 3 consecutive successes
      if (consecutiveChecksRef.current >= 3 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }
    // setIsOnline(online);
    return setIsLoading(false);
  };

  useEffect(() => {
    checkStatus();

    const interval = options?.checkInterval;

    if (interval && interval > 0) {
      checkStatus(); // Immediate check
      intervalRef.current = setInterval(checkStatus, interval);
    }

    // cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [options?.checkInterval]);

  return {
    isOnline,
    isLoading,
    error,
    checkStatus,
  };
};
