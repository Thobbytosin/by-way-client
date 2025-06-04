import React, { useEffect, useState } from "react";
import "./loader.css";

const Loader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
