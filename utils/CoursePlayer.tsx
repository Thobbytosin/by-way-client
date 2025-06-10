import React, { FC, useState } from "react";
import { PlayCircleFilledIcon } from "@/icons/icons";

type Props = {
  isClass?: boolean;
  link?: string;
};

const CoursePlayer: FC<Props> = ({ isClass, link }) => {
  const [removeBanner, setRemoveBanner] = useState(false);

  return (
    <div
      className={`${isClass ? "h-[400px] w-full" : " h-[200px]  w-full"}`}
      style={{
        // height: isClass ? "70vh" : "30vh",
        // width: "100%",
        position: "relative",
      }}
    >
      <iframe
        src={link}
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        allowFullScreen={true}
        allow="encrypted-media"
      ></iframe>

      {!removeBanner && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isClass ? "104px" : "60px",
            backgroundColor: "rgba(0, 0, 0,0.8)", // Semi-transparent black background
            fontWeight: "bold",
            zIndex: 2, // Ensure the banner is above the video
            textAlign: "center",
          }}
        >
          <PlayCircleFilledIcon
            fontSize="inherit"
            color="primary"
            onClick={() => setRemoveBanner(true)}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
