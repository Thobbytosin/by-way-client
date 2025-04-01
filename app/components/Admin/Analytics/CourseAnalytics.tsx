import { useGetCoursesAnalyticsQuery } from "../../../../redux/analytics/analyticsApi";
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

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  // const [analyticsData, setAnalyticsData] = useState([])

  // const analyticsData = [
  //   { name: "June 2023", uv: 3 },
  //   { name: "July 2023", uv: 2 },
  //   { name: "August 2023", uv: 5 },
  //   { name: "September 2023", uv: 7 },
  //   { name: "October 2023", uv: 2 },
  //   { name: "November 2023", uv: 5 },
  //   { name: "December 2023", uv: 7 },
  // ];

  const analyticsData: any = [];

  if (data) {
    data?.courses?.last12Months.forEach((d: any) => {
      analyticsData?.push({ name: d.month, uv: d.count });
    });
  }

  const minValue = 0;

  return (
    <div className=" h-full p-10">
      <div className=" mt-[50px]">
        <h1 className=" font-medium text-3xl">Course Analytics</h1>
        <p className=" text-lg">Last 12 months analytics data</p>
      </div>

      {!isLoading && data && (
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

      {isLoading && <Loader />}
    </div>
  );
};

export default CourseAnalytics;
