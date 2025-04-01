import React, { useEffect, useState, FC } from "react";
import "./simpleLoader.css";

type Props = {
  isAdmin?: boolean;
};

const SimpleLoader: FC<Props> = ({ isAdmin }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`${
        isAdmin ? " inline-block" : "flex justify-center items-center w-full"
      }`}
    >
      <div className="loaderr"></div>
    </div>
  );
};

export default SimpleLoader;
