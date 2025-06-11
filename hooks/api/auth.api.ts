import {
  ACTIVATEUSER,
  LOGIN,
  LOGOUT,
  SIGNUP,
  SOCIALLOGIN,
} from "@/config/auth.endpoints";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useMutateData } from "./useApi";
import { AppDispatch } from "@/redux/store";
import { useQueryWrapper } from "./useQueryWrapper";
import { useEffect, useState } from "react";
import { FETCHUSER } from "@/config/user.endpoints";
import { useServerStatus } from "./useServerStatus";
import { TUser } from "@/types/user.types";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";

// AUTH GET REQUEST
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isLoading: serverStatusLoading } = useServerStatus();

  const { data, error, loading, isSuccess } = useQueryWrapper<TUser>({
    endpoint: FETCHUSER,
    queryKey: ["user"],
    requiresAuth: true,
    enabled: !serverStatusLoading && isOnline,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.data));
    }
  }, [isSuccess, data, dispatch]);

  return {
    error,
    loading,
    data,
  };
};

// AUTH POST/PUT REQUESTS
export const useAuthMutations = () => {
  const dispatch = useDispatch();
  const { navigate } = useRouteLoader();
  const queryClient = useQueryClient();

  // login user
  const { mutate: loginUser, isPending: loginUserLoading } = useMutateData<
    {
      user: TUser;
      expiresAt: number;
    },
    { email: string; password: string }
  >({
    method: "POST",
    mutationKey: ["loginUser"],
    url: LOGIN,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      dispatch(setUser(response.data?.user));

      navigate("/");

      localStorage.setItem(
        "access_token_expiry",
        JSON.stringify(response.data?.expiresAt)
      );

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // login via google, github
  const { mutate: socialLoginUser } = useMutateData<
    { user: TUser; expiresAt: number },
    { name: string; email: string; avatar?: string }
  >({
    method: "POST",
    mutationKey: ["socialLoginUser"],
    url: SOCIALLOGIN,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      toast.success(response.message);

      dispatch(setUser(response.data?.user));

      navigate("/");

      localStorage.setItem(
        "access_token_expiry",
        JSON.stringify(response.data?.expiresAt)
      );

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // logout user
  const { mutate: logoutUser } = useMutateData<null, null>({
    method: "POST",
    mutationKey: ["logoutUser"],
    url: LOGOUT,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      dispatch(setUser(null));

      navigate("/");

      toast.success(response.message);

      localStorage.removeItem("access_token_expiry");

      queryClient.removeQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      // console.log("LOGOUT ERROR", error);
      toast.error(`${error.message}`);
    },
  });

  // sign up user
  const {
    mutate: registerUser,
    isSuccess: registerUserSuccess,
    isError: registerUserError,
    isPending: registerUserLoading,
  } = useMutateData<null, { name: string; email: string; password: string }>({
    method: "POST",
    mutationKey: ["registerUser"],
    url: SIGNUP,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // account activation
  const {
    mutate: activateUser,
    isSuccess: activateUserSuccess,
    isError: activateUserError,
    isPending: activateUserLoading,
  } = useMutateData<null, { activationCode: string }>({
    method: "POST",
    mutationKey: ["activate-user"],
    url: ACTIVATEUSER,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return {
    loginDomain: {
      loginUser,
      loginUserLoading,
    },
    socialLoginUser,
    logoutUser,
    registerDomain: {
      registerUser,
      registerUserSuccess,
      registerUserError,
      registerUserLoading,
    },
    activationDomain: {
      activateUser,
      activateUserSuccess,
      activateUserError,
      activateUserLoading,
    },
  };
};
