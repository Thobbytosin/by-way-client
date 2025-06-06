import { useMutateData } from "./useApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  CREATEORDER,
  PAYMENTINTENT,
  STRIPEPUBLISHABLEKEY,
} from "@/config/order.endpoints";
import { useServerStatus } from "./useServerStatus";
import { useQueryWrapper } from "./useQueryWrapper";

export const useOrderQueries = () => {
  const { isLoading, isOnline } = useServerStatus();

  const commonOptions = {
    requiresAuth: false,
    enabled: !isLoading && isOnline,
  };

  const {
    data: stripeResponse,
    error: usersListError,
    loading: usersListLoading,
  } = useQueryWrapper<{ publishableKey: string }>({
    endpoint: STRIPEPUBLISHABLEKEY,
    queryKey: [`stripe-key`],
    enabled: commonOptions.enabled,
    requiresAuth: true,
  });

  return {
    stripeKeyDomain: { publishableKey: stripeResponse?.data?.publishableKey },
  };
};

export const useOrderMutations = () => {
  // payment intent
  const {
    mutate: createPaymentIntent,
    data: paymentIntentData,
    error: paymentIntentError,
  } = useMutateData<{ re_cur: string }, { amount: number }>({
    method: "POST",
    mutationKey: ["course-payment-intent"],
    url: PAYMENTINTENT,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;
      // toast.success(response.message);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // create order
  const {
    mutate: createOrder,
    data: createOrderData,
    isSuccess: createOrderSuccess,
    isPending: createOrderPending,
  } = useMutateData<IOrder, { payment_info: object; courseId: string }>({
    method: "POST",
    mutationKey: ["course-order"],
    url: CREATEORDER,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return {
    paymentIntentDomain: {
      data: paymentIntentData?.data?.re_cur,
      createPaymentIntent,
      paymentIntentError,
    },
    createOrderDomain: {
      createOrderData: createOrderData?.data,
      createOrder,
      createOrderSuccess,
      createOrderPending,
    },
  };
};
