import { Dropdown } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesChartData = [
  {
    name: "Jan",
    students: 70,
    profit: "45",
  },
  {
    name: "Feb",
    students: 40,
    profit: "26",
  },
  {
    name: "Mar",
    students: 55,
    profit: "30",
  },
  {
    name: "Apr",
    students: 35,
    profit: "20",
  },
  {
    name: "May",
    students: 52,
    profit: "46",
  },
  {
    name: "Jun",
    students: 42,
    profit: "38",
  },
  {
    name: "Jul",
    students: 39,
    profit: "68",
  },
  {
    name: "Aug",
    students: 46,
    profit: "45",
  },
  {
    name: "Aug",
    students: 68,
    profit: "35",
  },
  {
    name: "Sep",
    students: 60,
    profit: "5",
  },
  {
    name: "Oct",
    students: 70,
    profit: "5",
  },
  {
    name: "Nov",
    students: 70,
    profit: "5",
  },
  {
    name: "Dec",
    students: 70,
    profit: "5",
  },
];

const StudentsBarChart = () => {
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

  const CustomLegend = () => {
    return (
      <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#FFC107] rounded-sm " />
          Students
        </div>
      </div>
    );
  };

  return (
    <div className=" py-6 rounded-xl w-full  bg-[#13333A]">
      <div className="flex items-center justify-between px-10 mb-4">
        <h1 className="text-xl font-medium text-[#EEEEEE]">
          Students Statistics
        </h1>
        <div className="flex items-center gap-2 2xl:gap-6">
          <CustomLegend />
          <Dropdown menu={{ items, onClick }}>
            <p
              className="rounded-full"
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
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={salesChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Bar barSize={10} radius={50} dataKey="saleTotal" fill="#EAF2F3" /> */}
          <Bar barSize={10} radius={50} dataKey="students" fill="#FFC107" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentsBarChart;
