import { LOGIN, SOCIALLOGIN } from "@/app/config/auth.endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { ApiResponse, User } from "@/app/types/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useMutateData } from "./useApi";
import { AppDispatch } from "@/redux/store";
import { useQueryWrapper } from "./useQueryWrapper";
import { useEffect } from "react";
import { FETCHUSER } from "@/app/config/user.endpoints";
import { useServerStatus } from "./useServerStatus";

// AUTH GET REQUEST
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isLoading } = useServerStatus();
  const isUserSignedIn =
    typeof document !== "undefined" &&
    document.cookie.includes("_can_logged_t");

  const { data, error, loading, isSuccess } = useQueryWrapper<
    ApiResponse<User>
  >({
    endpoint: FETCHUSER,
    queryKey: ["auth-user"],
    requiresAuth: true,
    enabled: !isLoading && isOnline && isUserSignedIn,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.data)); // Update Redux store
    }
  }, [isSuccess, data, dispatch]);

  return {
    error,
    loading,
  };
};

// AUTH POST/PUT REQUESTS
export const useAuthMutations = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  // login user
  const { mutate: loginUser } = useMutateData<
    {
      user: User;
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

      toast.success("Login successfully");

      dispatch(setUser(response.data?.user));

      router.push("/");

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
    { user: User; expiresAt: number },
    { name: string; email: string; avatar?: string }
  >({
    method: "POST",
    mutationKey: ["socialLoginUser"],
    url: SOCIALLOGIN,
    skipAuthRefresh: true,
    onSuccess: (response) => {
      toast.success("Login successfully");

      dispatch(setUser(response));

      router.push("/");

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

  return { loginUser, socialLoginUser };
};
