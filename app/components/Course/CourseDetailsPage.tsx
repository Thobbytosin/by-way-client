import Heading from "../../utils/Heading";
import React, { useEffect, useState, FC } from "react";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Loader from "../Loader/Loader";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../../redux/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useCourseQueries } from "@/app/hooks/api/course.api";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { courseFreeDomain } = useCourseQueries(id, true, false);
  const { data: course, loading } = courseFreeDomain;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${course?.name}`}
            description="This is an online e-learning platform where people can have access to resources for learning"
            keywords={`${course?.tags}`}
          />

          <Header />

          {/* course details */}

          <CourseDetails course={course} />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
