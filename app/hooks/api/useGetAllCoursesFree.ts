import { useEffect, useState } from "react";
import { useFetchData } from "./useApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isServerOnline } from "@/app/utils/isServerOnline";
import { ALLCOURSESFREE } from "@/app/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";

interface BackendSuccessResponse {
  success: boolean;
  message: string;
  doctors: any;
  totalPages: number;
}

export const useGetAllCoursesFree = () => {
  const hasBeenAuthenticated = typeof document !== "undefined";
  const dispatch = useDispatch<AppDispatch>();
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

  //   const setDoctors = useDoctorsStore((state) => state.setDoctors);

  const { data, error, isLoading } = useFetchData<any>({
    method: "GET",
    queryKey: ["getAllCoursesFree"],
    url: ALLCOURSESFREE,
    skipAuthRefresh: true, //token not needed
    enabled: hasBeenAuthenticated && isOnline,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCoursesFree(data.courses));
    }
  }, [data, dispatch]);

  return { error, loading: isLoading, data };
};
