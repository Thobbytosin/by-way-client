import { useEffect, useState } from "react";
import { useFetchData } from "./useApi";
import { isServerOnline } from "@/app/utils/isServerOnline";
import { GETLAYOUTTYPE } from "@/app/config/layout.endpoints";

export const useFetchHeroData = (type: string) => {
  const hasBeenAuthenticated = typeof document !== "undefined";
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      if (hasBeenAuthenticated) {
        const online = await isServerOnline();
        setIsOnline(online);
      }
    };

    checkServer();
  }, [hasBeenAuthenticated]);

  const { data, error, isLoading } = useFetchData<any>({
    method: "GET",
    queryKey: [`getHeroData-${type}`],
    url: `${GETLAYOUTTYPE}/${type}`,
    skipAuthRefresh: true, //token not needed
    enabled: hasBeenAuthenticated && isOnline,
  });

  return { error, loading: isLoading, data };
};
