import React, { FC } from "react";
import {
  FolderCopyIcon,
  MoreHorizIcon,
  PersonIcon,
  ShoppingCartCheckoutIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  VerifiedIcon,
} from "@/icons/icons";
import { styles } from "@/styles/style";
import Analytics from "./Analytics";
import { TUser } from "@/types/user.types";

type Props = {
  user: TUser | null;
};

const DashboardHero: FC<Props> = ({ user }) => {
  return (
    <div className=" w-full  h-full py-8 pr-8 ">
      {/* hero content */}
      <div>
        <h1 className="text-3xl font-medium">Welcome back, {user?.name} </h1>
        <p>Measure your advertising ROI and report website traffic.</p>
      </div>

      {/*   CARDS */}
      <div className=" flex gap-8 mt-8">
        {/* registered users */}
        <div className={styles.dashCardStyle}>
          {/* icon header */}
          <div className={styles.cardIconHeader}>
            <div className="text-sm flex gap-1 items-center ">
              <PersonIcon fontSize="inherit" />
              <span>Registered Users</span>
            </div>
            <MoreHorizIcon fontSize="small" />
          </div>

          {/* details */}
          <div className=" flex gap-4 items-center mt-4">
            <p className="text-[2.6rem] font-medium">34.8K</p>
            <span className={styles.cardTrendUp}>
              +20% <TrendingUpIcon fontSize="inherit" />
            </span>
          </div>
        </div>

        {/* live courses */}
        <div className={styles.dashCardStyle}>
          {/* icon header */}
          <div className={styles.cardIconHeader}>
            <div className="text-sm flex gap-1 items-center ">
              <FolderCopyIcon fontSize="inherit" />
              <span>Live Courses</span>
            </div>
            <MoreHorizIcon fontSize="small" />
          </div>

          {/* details */}
          <div className=" flex gap-4 items-center mt-4">
            <p className="text-[2.6rem] font-medium">114</p>
            <span className={styles.cardTrendUp}>
              +2.4% <TrendingDownIcon fontSize="inherit" />
            </span>
          </div>
        </div>

        {/* orders */}
        <div className={styles.dashCardStyle}>
          {/* icon header */}
          <div className={styles.cardIconHeader}>
            <div className="text-sm flex gap-1 items-center ">
              <ShoppingCartCheckoutIcon fontSize="inherit" />
              <span>Total Orders</span>
            </div>
            <MoreHorizIcon fontSize="small" />
          </div>

          {/* details */}
          <div className=" flex gap-4 items-center mt-4">
            <p className="text-[2.6rem] font-medium">1.8k</p>
            <span className={styles.cardTrendUp}>
              +46.9% <TrendingDownIcon fontSize="inherit" />
            </span>
          </div>
        </div>

        {/* subscribed users */}
        <div className={styles.dashCardStyle}>
          {/* icon header */}
          <div className={styles.cardIconHeader}>
            <div className="text-sm flex gap-1 items-center ">
              <VerifiedIcon fontSize="inherit" />
              <span>Subscriptions</span>
            </div>
            <MoreHorizIcon fontSize="small" />
          </div>

          {/* details */}
          <div className=" flex gap-4 items-center mt-4">
            <p className="text-[2.6rem] font-medium">5.8k</p>
            <span className={styles.cardTrendDown}>
              -8.6% <TrendingDownIcon fontSize="inherit" />
            </span>
          </div>
        </div>
      </div>

      {/* ANALYTICS */}
      <Analytics />
    </div>
  );
};

export default DashboardHero;
