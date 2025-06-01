// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from "react";
// import { useFetchData } from "./useApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/auth/authSlice";
// import { useServerStatus } from "./useServerStatus";
// import { FETCHUSER } from "@/app/config/user.endpoints";
// import { AppDispatch } from "@/redux/store";

// export const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const canFetchUser: boolean = useServerStatus();

//   const {
//     data: userData,
//     error,
//     isSuccess,
//     isLoading,
//   } = useFetchData<any>({
//     method: "GET",
//     url: FETCHUSER,
//     queryKey: ["user"],
//     enabled: canFetchUser, // auto-fetch only if server is online and user is online
//   });

//   useEffect(() => {
//     if (isSuccess && userData) {
//       console.log(userData);
//       dispatch(setUser(userData.data.user));
//     }
//   }, [isSuccess, userData]);

//   return { userData, error, userLoading: isLoading };
// };
