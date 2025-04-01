import { useActivationMutation } from "../../redux/auth/authApi";
import Link from "next/link";
import React, { FC, useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import successImg from "../../public/assets/successReg.png";
import Image from "next/image";
import SimpleLoader from "../components/SimpleLoader/SimpleLoader";
import { useRouter } from "next/navigation";

type Props = {};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = () => {
  const router = useRouter();
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [secondsRedirect, setSecondsRedirect] = useState(8);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  // handle redirecting countdown
  const handleCountdownRedirecting = () => {
    if (typeof window !== "undefined") {
      const timer: any = setInterval(() => {
        setSecondsRedirect((prev) => {
          const next = prev - 1;
          if (next === 0) {
            clearInterval(timer);
            router.push("/login"); // Redirect to the home page
          }
          return next;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  };

  // to check data from register server
  useEffect(() => {
    if (isSuccess) {
      const message = "Account activation successful";

      toast.success(message);

      setTimeout(() => {
        setOpenSuccessModal(true);
      }, 2000);

      // start countdown timer when the success modal opens
      handleCountdownRedirecting();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occurred", error);
      }
    }
  }, [isSuccess, error]);

  // change input
  const handleChange = (index: number, value: string) => {
    setInvalidError(false);

    const newVerifyNumber = { ...verifyNumber, [index]: value };

    setVerifyNumber(newVerifyNumber);

    // move the focus automatic
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // submit
  const handleVerify = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activationCode: verificationNumber,
      activationToken: token,
    });
  };

  return (
    <div className="p-6">
      {openSuccessModal ? (
        <div className=" w-full flex flex-col items-center justify-center">
          <Image
            src={successImg}
            height={200}
            width={200}
            alt="account_created_success"
            className="h-50 w-50"
          />

          <h4 className=" text-center text-2xl font-medium my-6">
            Congratulations
          </h4>
          <p className=" text-center text-md mb-6">
            Your Account is ready for use. You will be redirected to the Login
            page in <span className=" text-primary">{secondsRedirect}</span>{" "}
            secs
          </p>

          <SimpleLoader />
        </div>
      ) : (
        <>
          <h1 className=" text-center font-semibold text-2xl sm:text-4xl">
            Verify Your Account
          </h1>
          <br />

          <div className=" bg-primary w-20 h-20 rounded-full text-white flex justify-center items-center mx-auto ">
            <VscWorkspaceTrusted size={34} />
          </div>

          <div className="flex items-center justify-around my-8 sm:my-10">
            {Object.keys(verifyNumber).map(
              (
                key,
                index // becomes array of strings ['0 ', '1', '2', '3]
              ) => (
                <input
                  type="number"
                  key={key}
                  ref={inputRefs[index]}
                  className={`sm:w-[70px] sm:h-[70px] w-[60px] h-[60px] bg-transparent border-[2px] sm:border-[3px] text-black dark:text-white rounded-[10px] text-center ${
                    invalidError
                      ? "shake border-warning"
                      : " border-slate-800 dark:border-white"
                  }`}
                  min="0"
                  max="9"
                  value={verifyNumber[key as keyof VerifyNumber]} // binds the value to the corresponding key in the verifyNumber state
                  onInput={(e: any) =>
                    (e.target.value = e.target.value.slice(0, 1))
                  }
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              )
            )}
          </div>

          {/* verify button */}
          <button
            onClick={handleVerify}
            className=" bg-primary text-white w-full rounded-full font-medium py-4 text-center text-sm sm:text-md"
          >
            Verify OTP
          </button>

          <br />
          <h5 className=" text-md text-center mt-6">
            <span>Already verified?</span>
            <span className=" ml-1 text-[16px] sm:text-[18px] text-primary font-medium">
              <Link href="/login">Sign in</Link>
            </span>
          </h5>
        </>
      )}
    </div>
  );
};

export default Verification;
