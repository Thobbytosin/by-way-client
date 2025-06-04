import React, { useState, FC, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "../../../redux/order/orderApi";
import { useLoadUserQuery } from "../../../redux/api/apiSlice";
import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import SimpleLoader from "../../SimpleLoader/SimpleLoader";
import toast from "react-hot-toast";
import socketID from "socket.io-client";

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
  const [createOrder, { data, error }] = useCreateOrderMutation();
  // const [loadUser, setLoadUser] = useState(false);
  const { refetch: userRefetch } = useLoadUserQuery(undefined, {});
  const [isLoading, setIsLoading] = useState(false);

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

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error) {
      setMessage(error?.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      toast.success("Payment Success");
      await createOrder({ payment_info: paymentIntent, courseId: course._id });
    }
  };

  // if the order is successfully created
  useEffect(() => {
    if (data) {
      userRefetch();
      // setLoadUser(data);
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${course.name}`,
        userId: user?._id,
      });
      setOrderSuccessModal(true);
      // redirect(`/order-completed/${course._id}/${data.order._id}`);
    }
  }, [data]);

  return (
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
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
