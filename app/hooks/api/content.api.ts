import { useEffect, useState } from "react";
import { isServerOnline } from "@/app/utils/isServerOnline";
import { GETLAYOUTTYPE } from "@/app/config/layout.endpoints";
import { useQueryWrapper } from "./useQueryWrapper";
import {
  BannerContent,
  CategoriesContent,
  FAQsContent,
} from "@/app/types/content";
import { useServerStatus } from "./useServerStatus";

export const useContentQueries = () => {
  const { isOnline, isLoading } = useServerStatus();

  const commonOptions = {
    requiresAuth: false,
    enabled: !isLoading && isOnline,
  };

  const heroQuery = useQueryWrapper<BannerContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "banner"],
    params: "/Banner",
    ...commonOptions,
  });

  const categoriesQuery = useQueryWrapper<CategoriesContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "categories"],
    params: "/Categories",
    ...commonOptions,
  });

  const faqsQuery = useQueryWrapper<FAQsContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "faq"],
    params: "/FAQ",
    ...commonOptions,
  });

  return {
    hero: heroQuery.data?.data?.banner,
    categories: categoriesQuery.data?.data?.categories,
    faqs: faqsQuery.data?.data?.faq,
    loading: heroQuery.loading || categoriesQuery.loading || faqsQuery.loading,
    error: heroQuery.error || categoriesQuery.error || faqsQuery.error,
  };
};
