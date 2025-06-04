import { GETLAYOUTTYPE } from "@/config/layout.endpoints";
import { useQueryWrapper } from "./useQueryWrapper";
import { BannerContent, CategoriesContent, FAQsContent } from "@/types/content";
import { useServerStatus } from "./useServerStatus";

export const useContentQueries = (options: {
  hero?: boolean;
  categories?: boolean;
  faq?: boolean;
}) => {
  const { isOnline, isLoading } = useServerStatus();

  const commonOption = {
    requiresAuth: false,
  };

  const heroQuery = useQueryWrapper<BannerContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "hero"],
    params: "/Banner",
    enabled: !isLoading && isOnline && !!options.hero,
    ...commonOption,
  });

  const categoriesQuery = useQueryWrapper<CategoriesContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "categories"],
    params: "/Categories",
    enabled: !isLoading && isOnline && !!options.categories,
    ...commonOption,
  });

  const faqsQuery = useQueryWrapper<FAQsContent>({
    endpoint: GETLAYOUTTYPE,
    queryKey: ["layout", "faq"],
    params: "/FAQ",
    enabled: !isLoading && isOnline && !!options.faq,
    ...commonOption,
  });

  return {
    contentDomainData: {
      ...(options.hero && { hero: heroQuery.data?.data?.banner }),
      ...(options.categories && {
        categories: categoriesQuery.data?.data?.categories,
      }),
      ...(options.faq && { faqs: faqsQuery.data?.data?.faq }),
    },
    contentDomainLoading: {
      ...(options.hero && { heroLoading: heroQuery.loading }),
      ...(options.categories && {
        categoriesLoading: categoriesQuery.loading,
      }),
      ...(options.faq && { faqsLoading: faqsQuery.loading }),
    },
    contentDomainError: {
      ...(options.hero && { heroError: heroQuery.error }),
      ...(options.categories && {
        categoriesError: categoriesQuery.error,
      }),
      ...(options.faq && { faqsError: faqsQuery.error }),
    },
  };
};
