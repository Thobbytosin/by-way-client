import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: any;
    expiresAt: number;
  };
}

export function useLoginMutation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: async (credentials: LoginRequest) => {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true, // Important for sending cookies
      });

      return res.data;
    },
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);
      dispatch(setUser(response.data.user));

      localStorage.setItem(
        "access_token_expiry",
        JSON.stringify(response.data.expiresAt)
      );

      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error) => {
      const message = error?.message || "Login failed";
      toast.error(message);
    },
  });
}
