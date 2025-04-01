import Heading from "../../utils/Heading";
import {
  useLoadUserQuery,
  useRefreshTokenQuery,
} from "../../../redux/api/apiSlice";
import React, { useEffect, useState, FC } from "react";
import Header from "../Header";
import { useGetCourseDetailsQuery } from "../../../redux/course/courseApi";
import CourseDetails from "./CourseDetails";
import Loader from "../Loader/Loader";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../../redux/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data: userData, refetch: userRefetch } = useLoadUserQuery(
    undefined,
    {}
  );

  const { refetch } = useRefreshTokenQuery(undefined, { skip: false });

  const {
    data,
    isLoading,
    refetch: courseRefetch,
  } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  // refresh the token
  useEffect(() => {
    refetch();
    courseRefetch();
    userRefetch();
  }, [data, userData]);

  // stripe
  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }

    // create payment
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [data, config]);

  // response from stripe
  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title="ByWay Learning Management System"
            description="This is an online e-learning platform where people can have access to resources for learning"
            keywords={`${data?.course?.tags}`}
          />

          <Header />

          {/* course details */}
          {stripePromise && (
            <CourseDetails
              course={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
