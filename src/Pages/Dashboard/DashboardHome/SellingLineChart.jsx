import { ConfigProvider, DatePicker, Dropdown, Select } from "antd";
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
import { FaChevronDown } from "react-icons/fa";

const { Option } = Select;

const earnChartData = [
  { name: "Jan", totalSale: 70, profit: 54, enrollment: 64 },
  { name: "Feb", totalSale: 85, profit: 60, enrollment: 63 },
  { name: "Mar", totalSale: 90, profit: 75, enrollment: 67 },
  { name: "Apr", totalSale: 75, profit: 58, enrollment: 68 },
  { name: "May", totalSale: 100, profit: 80, enrollment: 52 },
  { name: "Jun", totalSale: 95, profit: 68, enrollment: 75 },
  { name: "Jul", totalSale: 110, profit: 88, enrollment: 80 },
  { name: "Aug", totalSale: 120, profit: 60, enrollment: 69 },
  { name: "Sep", totalSale: 105, profit: 72, enrollment: 42 },
  { name: "Oct", totalSale: 115, profit: 68, enrollment: 49 },
  { name: "Nov", totalSale: 98, profit: 77, enrollment: 39 },
  { name: "Dec", totalSale: 130, profit: 95, enrollment: 70 },
];

const CustomLegend = () => {
  return (
    <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#1E90FF] rounded-sm " />
        Sale
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#FFC107] rounded-sm " />
        Enrollment
      </div>
    </div>
  );
};

const SellingLineChart = ({setSellerYear, sellingStats}) => {
  
  return (
    <div className="bg-[#13333A] py-6 rounded-xl w-full">
      <div className="flex items-center justify-between px-10 mb-4">
        <h1 className="text-xl font-medium text-[#EEEEEE]">
          Selling Statistics
        </h1>
        <div className="flex items-center gap-6">
          <CustomLegend />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#2E7A8A",
              },
            }}
          >
            <DatePicker
              className="!cursor-pointer"
              picker="year"
              suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
              onChange={(_, dateString) => {
                setSellerYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={sellingStats}
          margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="enrollment"
            name="Enrollment Fees"
            stroke="#FFC107"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="count"
            name="Total Sold"
            stroke="#1E90FF"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingLineChart;
