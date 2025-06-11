import { useEffect, useMemo } from "react";
import { useAuth } from "./api/auth.api";
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
  const router = useRouter();

  const shouldRedirect = useMemo(() => {
    if (loading) return false;

    if (!user?.data) return true;

    if (requireAdmin && user.data.role !== "admin") return true;

    if (
      requireCoursePurchase &&
      !user.data.courses?.some((c) => c.courseId === requireCoursePurchase)
    )
      return true;

    return false;
  }, [loading, user?.data, requireAdmin, requireCoursePurchase]);

  useEffect(() => {
    if (!loading && shouldRedirect) {
      router.push(redirectPath);
    }
  }, [loading, router, redirectPath, shouldRedirect]);

  return {
    user: user?.data,
    loading,
    allowedToRender: !shouldRedirect && !loading,
  };
};
