import { useGetOrdersAnalyticsQuery } from "../../redux/analytics/analyticsApi";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { InventoryIcon, PaidIcon, TrendingUpIcon } from "../../icons/icons";
import { styles } from "../../styles/style";

type Props = {};

const monthDataOptions = [
  "Last 12 months",
  "Last 6 months",
  "Last 3 months",
  "1 month ago",
];

const Analytics = (props: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  const [monthData, setMonthData] = useState(monthDataOptions[0]);

  const analyticsData = [
    { name: "Jun 2023", uv: 3, pv: 7 },
    { name: "Jul 2023", uv: 2, pv: 10 },
    { name: "Aug 2023", uv: 4, pv: 4 },
    { name: "Sep 2023", uv: 5, pv: 6 },
    { name: "Oct 2023", uv: 4, pv: 10 },
    { name: "Nov 2023", uv: 5, pv: 8 },
    { name: "Dec 2024", uv: 4, pv: 8 },
    { name: "Jan 2024", uv: 3, pv: 7 },
    { name: "Feb 2024", uv: 6, pv: 10 },
    { name: "Mar 2024", uv: 5, pv: 12 },
    { name: "Apr 2024", uv: 4, pv: 6 },
    { name: "May 2024", uv: 5, pv: 7 },
  ];

  //   const analyticsData: any = [];

  //   if (data) {
  //     data?.orders?.last12Months.forEach((d: any) => {
  //       analyticsData.push({ name: d.month, uv: d.count });
  //     });
  //   }

  const minValue = 0;

  return (
    <div className=" w-full h-screen rounded-lg bg-white dark:bg-[#0B1739] mt-10 flex items-start">
      {/* left */}
      <div className="w-[70%] py-10 px-5">
        {/* top */}
        <div className=" w-full flex justify-between items-center">
          {/* total revenue */}
          <div className=" flex gap-3 items-end">
            <div>
              <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
                <PaidIcon color="inherit" fontSize="inherit" />
                Total Revenue
              </p>
              <h2 className=" text-4xl">&#8358; 3.45M</h2>
            </div>
            <span className={styles.cardTrendUp}>
              +78.9% <TrendingUpIcon fontSize="inherit" />
            </span>
          </div>

          {/* indicators */}
          <div className=" flex items-center gap-8 h-10">
            {/* courses */}
            <div className=" flex gap-3 items-center">
              <div className=" w-3 h-3 rounded-full bg-[#CB3CFF]" />
              <span className=" text-sm text-gray-700 dark:text-gray-400">
                Courses
              </span>
            </div>

            {/* users */}
            <div className=" flex gap-3 items-center">
              <div className=" w-3 h-3 rounded-full bg-[#00C2FF]" />
              <span className=" text-sm text-gray-700 dark:text-gray-400">
                Users
              </span>
            </div>

            {/*  options */}
            <select
              id="level"
              required
              value={monthData}
              onChange={(e) => setMonthData(e.target.value)}
              className={`py-2 px-1.5 text-white outline-none bg-[#0B1739] dark:bg-slate-950 `}
            >
              {monthDataOptions?.map((month: string, i: number) => (
                <option key={i} value={month} className=" text-white">
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* charts */}
        {!isLoading && (
          <div className=" w-full h-screen flex justify-center items-center my-8 py-6 ">
            <ResponsiveContainer width="100%" height="70%">
              <AreaChart width={730} height={250} data={analyticsData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CB3CFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#CB3CFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#CB3CFF"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#00C2FF"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* right */}
      <div className=" w-[30%] h-screen border-l border-gray-800 dark:border-gray-600 ">
        {/* right-top */}
        <div className=" w-full h-[50%] pt-10 py-20 px-5  border-b border-gray-800 dark:border-gray-600">
          {/* total orders */}

          {/* heading */}
          <div>
            <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
              <InventoryIcon color="inherit" fontSize="inherit" />
              Total Orders
            </p>
            <h2 className=" text-3xl flex items-center gap-3">
              2.3k
              <span className={styles.cardTrendUp}>
                +45.3% <TrendingUpIcon fontSize="inherit" />
              </span>
            </h2>
          </div>

          {/* bar charts */}
          <br />
          <br />

          <ResponsiveContainer width="100%" height="70%">
            <BarChart width={730} height={250} data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pv" fill="#CB3CFF" />
              <Bar dataKey="uv" fill="#00C2FF" />
            </BarChart>
          </ResponsiveContainer>

          <div className=" w-full flex justify-between items-center">
            {/*  options */}
            <select
              id="level"
              required
              value={monthData}
              onChange={(e) => setMonthData(e.target.value)}
              className={`py-2 px-1.5 dark:text-white text-black bg-transparent outline-none text-sm `}
            >
              {monthDataOptions?.map((month: string, i: number) => (
                <option key={i} value={month} className=" text-white bg-black">
                  {month}
                </option>
              ))}
            </select>

            <button className=" bg-transparent text-primary transition duration-300 hover:text-black hover:dark:text-white text-sm font-medium">
              View Report
            </button>
          </div>
        </div>

        {/* right-bottom */}
        <div className=" w-full h-[50%] pt-10 py-20 px-5  ">
          {/* total orders */}

          {/* heading */}
          <div>
            <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
              <InventoryIcon color="inherit" fontSize="inherit" />
              Total Orders
            </p>
            <h2 className=" text-3xl flex items-center gap-3">
              412
              <span className={styles.cardTrendUp}>
                +5.8% <TrendingUpIcon fontSize="inherit" />
              </span>
            </h2>
          </div>

          {/* bar charts */}
          <br />
          <br />

          <ResponsiveContainer width="100%" height="70%">
            <LineChart width={730} height={250} data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="pv" fill="#CB3CFF" />
              <Line dataKey="uv" fill="#00C2FF" />
            </LineChart>
          </ResponsiveContainer>

          <div className=" w-full flex justify-between items-center">
            {/*  options */}
            <select
              id="level"
              required
              value={monthData}
              onChange={(e) => setMonthData(e.target.value)}
              className={`py-2 px-1.5 dark:text-white text-black bg-transparent outline-none text-sm `}
            >
              {monthDataOptions?.map((month: string, i: number) => (
                <option key={i} value={month} className=" text-white bg-black">
                  {month}
                </option>
              ))}
            </select>

            <button className=" bg-transparent text-primary transition duration-300 hover:text-black hover:dark:text-white text-sm font-medium">
              View Report
            </button>
          </div>
        </div>
      </div>

      {/* {isLoading && <Loader />} */}
    </div>
  );
};

export default Analytics;
