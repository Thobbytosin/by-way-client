import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useAnalyticsQueries } from "@/hooks/api/analytics.api";

const UsersAnalytics = () => {
  const { usersAnalyticsDomain } = useAnalyticsQueries({ type: "users" });
  const { usersAnalytics, usersAnalyticsError, usersAnalyticsLoading } =
    usersAnalyticsDomain;

  const analyticsData: any = [];

  if (usersAnalytics) {
    usersAnalytics.last12Months.forEach((d: any) => {
      analyticsData.push({ name: d.month, uv: d.count });
    });
  }

  const minValue = 0;

  if (usersAnalyticsError)
    return (
      <>
        <h2>No data found</h2>
      </>
    );

  return (
    <div className=" h-full py-10">
      <div className=" mt-[50px]">
        <h1 className=" font-medium text-3xl">Users Analytics</h1>
        <p className=" text-lg">Last 12 months analytics data</p>
      </div>

      {usersAnalyticsLoading ? (
        <Loader />
      ) : (
        <div className=" w-full h-[80vh] flex justify-center items-center my-8 py-6 bg-slate-100 dark:bg-black">
          <ResponsiveContainer width="90%" height="90%" minHeight="90%">
            <AreaChart width={730} height={250} data={analyticsData}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <XAxis dataKey="name" />
              <YAxis />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default UsersAnalytics;
