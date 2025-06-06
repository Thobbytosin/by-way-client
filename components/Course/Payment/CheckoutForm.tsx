/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, FC, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import socketID from "socket.io-client";
import { useOrderMutations } from "@/hooks/api/order.api";
import { useQueryClient } from "@tanstack/react-query";
import InLineLoader from "@/components/Loader/InlineLoader";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"] });

type Props = {
  course: any;
  user: any;
  setOrderSuccessModal: (value: boolean) => void;
};

const CheckoutForm: FC<Props> = ({ course, user, setOrderSuccessModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const { createOrderDomain } = useOrderMutations();
  const { createOrder, createOrderSuccess, createOrderPending } =
    createOrderDomain;
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error?.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      createOrder({ payment_info: paymentIntent, courseId: course._id });
    }
  };

  // if the order is successfully created
  useEffect(() => {
    if (createOrderSuccess) {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setOrderSuccessModal(true);
      // setLoadUser(data);
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${course.name}`,
        userId: user?._id,
      });
    }
  }, [createOrderSuccess]);

  return (
    <>
      {createOrderPending ? (
        <InLineLoader />
      ) : (
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            id="link-authentication-element"
            options={{ defaultValues: { email: user.email } }}
          />
          <PaymentElement id="payment-element" />
          {isLoading ? (
            <div className=" my-6">
              <SimpleLoader isAdmin />
            </div>
          ) : (
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="bg-success text-white text-center py-2 mt-6 px-6 rounded-full"
            >
              <span id="button-text">Pay now</span>
            </button>
          )}
          {/* Show any error  messages */}
          {message && (
            <div
              id="payment-message"
              className=" text-red-500 my-2 text-sm font-medium"
            >
              {message}
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
