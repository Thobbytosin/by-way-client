import { useEffect } from "react";
import { useAuth } from "./api/auth.api";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";
import { useRouter } from "next/navigation";

type Options = {
  requireAdmin?: boolean;
  requireCoursePurchase?: string;
  redirectPath?: string;
};

export const useProtectedRoute = ({
  requireAdmin = false,
  requireCoursePurchase,
  redirectPath = "/",
}: Options) => {
  const { data: user, loading } = useAuth();
  const { navigate } = useRouteLoader();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const loggedInUser = user?.data;

    if (!loggedInUser) {
      router.push(redirectPath);
      return;
    }

    if (requireAdmin && loggedInUser.role !== "admin") {
      router.push(redirectPath);
      return;
    }

    if (requireCoursePurchase) {
      const hasUserPurchaseCourse = loggedInUser.courses.some(
        (c) => c.courseId === requireCoursePurchase
      );

      if (!hasUserPurchaseCourse) {
        router.push(redirectPath);
        return;
      }
    }
  }, [
    loading,
    user?.data,
    router,
    redirectPath,
    requireAdmin,
    requireCoursePurchase,
  ]);

  return { user: user?.data, loading };
};
