import React from "react";
import Support from "../../components/Support/Support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support - ByWay Learning Management System",
  description:
    "This is the support contact page of online e-learning platform where people can have access to 24/7 customer support",
  keywords:
    "Programming, MERN, TypeScript, ReactJs, NextJs, Support, Faqs, Cutomer Support",
};

export default async function SupportPage() {
  return <Support />;
}
