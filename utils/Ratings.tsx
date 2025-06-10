import React, { FC } from "react";
import { StarHalfIcon, StarOutlineIcon, StarRateIcon } from "@/icons/icons";

type Props = {
  rating: number;
  color: string;
};

const Ratings: FC<Props> = ({ rating, color }) => {
  const stars = [];
  // assume rating = 4.3
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <StarRateIcon
          key={i}
          color="inherit"
          fontSize="inherit"
          className={`cursor-pointer`}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalfIcon
          key={i}
          color="inherit"
          fontSize="inherit"
          className={`cursor-pointer`}
        />
      );
    } else {
      stars.push(
        <StarOutlineIcon
          key={i}
          color="inherit"
          fontSize="inherit"
          className={`cursor-pointer`}
        />
      );
    }
  }
  return (
    <div
      className={`${color} lg:text-xl sm:text-lg text-base flex items-center`}
    >
      {stars}
    </div>
  );
};

export default Ratings;
