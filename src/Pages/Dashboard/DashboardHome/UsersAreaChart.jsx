import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const UsersAreaChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      tv: "12k",
      amt: 10,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      tv: 1200,
      amt: 20,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      tv: 1200,
      amt: 30,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      tv: 1200,
      amt: 40,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      tv: 1200,
      amt: 50,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      tv: 1200,
      amt: 60,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 70,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 80,
    },
    {
      name: "Sep",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 90,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 100,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 110,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      tv: 1200,
      amt: 120,
    },
  ];

  const [year, setYear] = useState(2024);

  const items = [
    {
      label: 2023,
      key: "2023",
    },
    {
      label: 2024,
      key: "2024",
    },
    {
      label: 2025,
      key: "2025",
    },
    {
      label: 2026,
      key: "2026",
    },
  ];

  const onClick = ({ key }) => {
    setYear(key);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "25px"
        }}
      >
        <h3 className="text-xl font-medium text-[#EEEEEE]">User Statistics</h3>
        <Dropdown menu={{ items, onClick }}>
          <p className="rounded-full"
            style={{
              cursor: "pointer",
              backgroundColor: "#F4E6FF",
              padding: "6px 12px",
              fontSize: "14px",
              color: "#121212",
            }}
            onClick={(e) => e.preventDefault()}
          >
            {year}
            <DownOutlined style={{ paddingLeft: "18px" }} color="#717171" />
          </p>
        </Dropdown>
      </div>
      
      <ResponsiveContainer width={"100%"} height={270}>
        <AreaChart data={data} barGap={100}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC107" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFC107" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="name"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <YAxis
            tickCount={11}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="uv"
            stroke="#FFC107"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersAreaChart;
