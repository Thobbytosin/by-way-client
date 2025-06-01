import React from "react";
import InLineLoader from "../Loader/InlineLoader";

type Props = {
  errorMessage: string | null;
};

const ServerErrorUI = ({ errorMessage }: Props) => {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-4xl font-bold text-center">
        Network is temporarily unavailable
      </h1>
      <p className=" text-primary font-semibold text-xl mt-2">
        {errorMessage && errorMessage}
      </p>
      <p className=" mt-8 mb-4 font-medium text-lg">Retrying...</p>
      <InLineLoader />
    </div>
  );
};

export default ServerErrorUI;
