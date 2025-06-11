/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import DashboardHeader from "@/components/Admin/DashboardHeader";
import ServerErrorUI from "@/components/Home/ServerErrorUI";
import Loader from "@/components/Loader/Loader";
import { useServerStatus } from "@/hooks/api/useServerStatus";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useRouteLoader } from "@/providers/RouteLoadingProvider";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, allowedToRender } = useProtectedRoute({
    requireAdmin: true,
  });
  const [collapse, setCollapse] = useState(false);
  const { error: serverError, isLoading: serverLoading } = useServerStatus({
    checkInterval: 10000,
  });

  if (loading || !allowedToRender || serverLoading) {
    return <Loader key="loading" />;
  }

  if (serverError) return <ServerErrorUI errorMessage={serverError} />;

  return (
    <div className="flex min-h-[100vh]">
      <div
        className={`${
          collapse ? "w-[4%]" : "w-[15%]"
        } fixed left-0 top-0 h-[100vh] p-3 z-[99] text-white dark:text-black bg-[#0F172A] dark:bg-slate-50`}
      >
        <AdminSidebar
          user={user}
          collapse={collapse}
          setCollapse={setCollapse}
        />
      </div>

      {/* Main content */}
      <div
        className={`w-full min-h-[100vh] pr-8 ${
          collapse ? "ml-[8rem]" : "ml-[14rem]"
        }`}
      >
        <DashboardHeader />

        <main>{children}</main>
      </div>
    </div>
  );
}
