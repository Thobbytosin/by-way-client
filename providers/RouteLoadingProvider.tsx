/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LoadingOverlay from "@/components/Loader/LoadingOverlay";
import { useRouteLoading } from "@/hooks/useRouteLoading";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useTransition,
} from "react";

const RouteLoadingContext = createContext<{
  navigate: (url: string) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}>({
  navigate: () => {},
  setLoading: () => {},
  loading: false,
});

export const RouteLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { loading, setLoading } = useRouteLoading();
  // const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    // When pathname changes (i.e., new route), stop loading
    setLoading(false);
  }, [pathname]);

  const navigate = (url: string) => {
    setLoading(true);
    router.push(url);
    // startTransition(() => {
    //   router.push(url);
    // });
  };

  return (
    <RouteLoadingContext.Provider
      value={{ loading: loading, navigate, setLoading }}
    >
      {loading && <LoadingOverlay />}
      {children}
    </RouteLoadingContext.Provider>
  );
};

export const useRouteLoader = () => useContext(RouteLoadingContext);
