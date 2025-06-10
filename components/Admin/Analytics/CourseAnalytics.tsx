import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useAnalyticsQueries } from "@/hooks/api/analytics.api";

const CourseAnalytics = () => {
  const { coursesAnalyticsDomain } = useAnalyticsQueries({ type: "courses" });
  const { coursesAnalytics, coursesAnalyticsLoading, coursesAnalyticsError } =
    coursesAnalyticsDomain;

  const analyticsData: any = [];

  if (coursesAnalytics) {
    coursesAnalytics.last12Months.forEach((d: any) => {
      analyticsData.push({ name: d.month, uv: d.count });
    });
  }

  const minValue = 0;

  if (coursesAnalyticsError)
    return (
      <>
        <h2>No data found</h2>
      </>
    );

  return (
    <div className=" h-full py-10">
      <div className=" mt-[50px]">
        <h1 className=" font-medium text-3xl">Course Analytics</h1>
        <p className=" text-lg">Last 12 months analytics data</p>
      </div>

      {coursesAnalyticsLoading ? (
        <Loader />
      ) : (
        <div className=" w-full h-[80vh] flex justify-center items-center  my-8 py-6 bg-slate-100 dark:bg-black">
          <ResponsiveContainer width="90%" height="90%" minHeight="90%">
            <BarChart width={730} height={250} data={analyticsData}>
              {/* <CartesianGrid strokeDasharray="1 1" /> */}
              <XAxis dataKey="name">
                <Label offset={0} position="insideBottom" />
              </XAxis>
              <YAxis />
              <Bar dataKey="uv" fill="#3B82F6">
                <LabelList dataKey="uv" position="top" fill="#3B82F6" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CourseAnalytics;
