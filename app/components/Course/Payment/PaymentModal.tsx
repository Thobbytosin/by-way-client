import React, { FC, useState } from "react";
import { CancelIcon } from "../../../icons/icons";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Lottie from "lottie-react";
import successAnimation from "../../../utils/successCheck.json";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  stripePromise: any;
  clientSecret: string;
  course: any;
  user: any;
  setLoading: (value: boolean) => void;
};

const PaymentModal: FC<Props> = ({
  open,
  setOpen,
  clientSecret,
  stripePromise,
  course,
  user,
  setLoading,
}) => {
  const router = useRouter();
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);

  return (
    <div className=" fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-[99]">
      <div
        onClick={() => {
          setLoading(false);
          setOpen(!open);
        }}
        className=" w-full h-full bg-transparent fixed left-0 top-0 "
      />
      {/* Payment modal */}
      {!orderSuccessModal && (
        <div className=" min-w-[30%] min-h-fit p-4 bg-white  rounded-lg z-[99] m-auto">
          <div className=" w-full flex justify-end ">
            <div className=" text-black rounded-full">
              <CancelIcon
                fontSize="large"
                color="inherit"
                onClick={() => {
                  setLoading(false);
                  setOpen(false);
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
          {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                course={course}
                user={user}
                setOrderSuccessModal={setOrderSuccessModal}
              />
            </Elements>
          )}
        </div>
      )}

      {/* payment success modal */}
      {orderSuccessModal && (
        <div className=" w-[85%] h-fit sm:w-[70%] p-5 sm:p-8 bg-white dark:bg-dimDark  rounded-lg z-[100] mx-auto absolute flex flex-col justify-start items-center ">
          <div className=" w-[60%] h-[60%] sm:w-[40%] sm:h-[40%] flex justify-center items-center">
            <Lottie animationData={successAnimation} loop={true} />
          </div>
          <h1 className="text-[1.8rem] sm:text-[2.4rem] lg:text-[3.4rem] font-semibold">
            Order Completed
          </h1>
          <p className="text-[1rem] sm:text-[1.4rem] lg:text-[2rem] font-medium mt-3 text-center">
            You Will Receive a confirmation email soon!{" "}
          </p>
          {/* button */}
          <button
            onClick={() => router.push(`/course-class/${course?._id}`)}
            className="mt-3 sm:mt-6 px-8 sm:py-3 py-2 text-base lg:text-lg font-medium text-white bg-success rounded-3xl transition duration-300 hover:opacity-85"
          >
            Proceed to Course
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
