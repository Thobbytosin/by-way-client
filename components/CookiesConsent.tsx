"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  setShowConsent: (value: boolean) => void;
};

const CookiesConsent = ({ setShowConsent }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger the animation on mount
    const timeout = setTimeout(() => setMounted(true), 10); // small delay ensures DOM is rendered
    return () => clearTimeout(timeout);
  }, []);

  const handleAction = (choice: "accepted" | "declined") => {
    let consentData;
    if (choice === "accepted") {
      consentData = {
        accept: true,
      };
      setShowConsent(false);
    } else {
      consentData = {
        reject: true,
      };
      setShowConsent(false);
    }
    toast.success("Cookie Preference Saved");

    // save to cookie
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60); // Expire in 60 days

    // dev
    // document.cookie = `cookie_consent=${JSON.stringify(
    //   consentData
    // )}; expires=${expiryDate.toUTCString()}; path=/;`;

    // prod
    document.cookie = `cookie_consent=${JSON.stringify(
      consentData
    )}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure`;
  };

  return (
    <section className=" fixed inset-0 z-50 flex justify-center items-center ">
      {/* Overlay */}
      <div className=" fixed inset-0 dark:bg-white/10 bg-black/50 w-screen h-screen" />
      <section
        className={` w-[80%] md:w-[60%] mx-auto h-fit bg-white dark:bg-gray-900 p-6  z-60 rounded-xl  transition-transform duration-[1500ms] ease-in-out transform  ${
          mounted ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        <h2 className=" font-semibold mb-6 text-xl md:text-2xl text-left text-black dark:text-white">
          We use cookies
        </h2>
        <p className="text-xs md:text-sm  mb-2 md:mb-0   text-black dark:text-white leading-6 text-justify md:leading-8">
          This website uses cookies and other tracking technologies to improve
          your browsing experience for the following purposes: to enable basic
          functionality of the website, to provide a better experience on the
          website, to measure your interest in our products and services and to
          personalize marketing interactions, to deliver ads that are more
          relevant to you.
        </p>
        <div className="flex my-4 md:my-8 w-full justify-between">
          <div className=" flex ">
            <button
              type="button"
              title="Accept Cookies"
              aria-label="accept cookies"
              onClick={() => handleAction("accepted")}
              className="cursor-pointer bg-primary hover:bg-primary/50 transition-all duration-400 text-white px-6 py-1.5  text-xs md:text-md"
            >
              Accept
            </button>
            <button
              type="button"
              title="Decline Cookies"
              aria-label="decline cookies"
              onClick={() => handleAction("declined")}
              className="cursor-pointer bg-red-500 hover:bg-red-300 text-white transition-all duration-400  px-6 py-1.5 text-xs md:text-md ml-2"
            >
              Decline
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CookiesConsent;
