import { EDITLAYOUT, GETLAYOUTTYPE } from "@/config/layout.endpoints";
import { useQueryWrapper } from "./useQueryWrapper";
import {
  BannerContent,
  CategoriesContent,
  FAQsContent,
} from "@/types/content.types";
import { useServerStatus } from "./useServerStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "./useApi";
import toast from "react-hot-toast";

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

export const useContentMutations = () => {
  const queryClient = useQueryClient();

  // edit categories
  const { mutate: updateCategories, isPending: updateCategoriesPending } =
    useMutateData<
      null,
      { type: "Categories"; categories: { title: string }[] }
    >({
      method: "PUT",
      mutationKey: [`update-categories-content`],
      url: EDITLAYOUT,
      skipAuthRefresh: false,
      onSuccess: (response) => {
        if (!response.success) return;

        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["layout", "categories"],
        });
      },
      onError: (error) => {
        toast.error(`${error.message}`);
      },
    });

  // edit faqs
  const { mutate: updateFaqs, isPending: updateFaqsPending } = useMutateData<
    null,
    { type: "FAQ"; faqs: { question: string; answer: string }[] }
  >({
    method: "PUT",
    mutationKey: [`update-faqs-content`],
    url: EDITLAYOUT,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["layout", "faq"],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // edit hero
  const { mutate: updateHero, isPending: updateHeroPending } = useMutateData<
    null,
    { type: "Banner"; image: string; title: string; subTitle: string }
  >({
    method: "PUT",
    mutationKey: [`update-hero-content`],
    url: EDITLAYOUT,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["layout", "hero"],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return {
    updateCategoriesDomain: {
      updateCategories,
      updateCategoriesPending,
    },
    updateFaqsDomain: {
      updateFaqs,
      updateFaqsPending,
    },
    updateHeroDomain: {
      updateHero,
      updateHeroPending,
    },
  };
};
