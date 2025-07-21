import { Dropdown, Select } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Option } = Select;

const earnChartData = [
  { name: "Jan", saleTotal: 70, profit: 54 },
  { name: "Feb", saleTotal: 85, profit: 60 },
  { name: "Mar", saleTotal: 90, profit: 75 },
  { name: "Apr", saleTotal: 75, profit: 58 },
  { name: "May", saleTotal: 100, profit: 80 },
  { name: "Jun", saleTotal: 95, profit: 68 },
  { name: "Jul", saleTotal: 110, profit: 88 },
  { name: "Aug", saleTotal: 120, profit: 60 },
  { name: "Sep", saleTotal: 105, profit: 72 },
  { name: "Oct", saleTotal: 115, profit: 68 },
  { name: "Nov", saleTotal: 98, profit: 77 },
  { name: "Dec", saleTotal: 130, profit: 95 },
];

const CustomLegend = () => {
  return (
    <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#EAF2F3] rounded-sm " />
          Products
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#FFC107] rounded-sm " />
          Device
        </div>
      </div>
  );
};

const SellingLineChart = () => {
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
    <div className="bg-[#13333A] py-6 rounded-xl w-full">
      <div className="flex items-center justify-between px-10 mb-4">
        <h1 className="text-xl font-medium text-[#EEEEEE]">
          Selling Statistics
        </h1>
        <div className="flex items-center gap-6">
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
        <LineChart
          data={earnChartData}
          margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="saleTotal"
            stroke="#EAF2F3"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#FFC107"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingLineChart;
