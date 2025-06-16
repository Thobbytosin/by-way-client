"use client";

import { useAuth } from "@/hooks/api/auth.api";

const AuthIntializer = () => {
  const { error, data } = useAuth();

  if (error) {
    console.log("Auth initialization failed:", error.message);
  }

  return null;
};

export default AuthIntializer;
