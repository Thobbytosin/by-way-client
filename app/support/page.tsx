import React from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Support from "../components/Support/Support";
import Footer from "../components/Footer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" min-h-screen">
      <Heading
        title="Support - ByWay Learning Management System"
        description="This is the contsct page of online e-learning platform where people can have access to resources for learning"
        keywords="Programming, MERN, TypeScript, ReactJs, NextJs, Support, Faqs, Cutomer SUpport"
      />
      <Header activeItem={1} />

      <Support />

      <Footer />
    </div>
  );
};

export default page;
