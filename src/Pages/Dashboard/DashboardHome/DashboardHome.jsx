import { Col, Row } from "antd";
import React from "react";

import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { HiMiniUserGroup } from "react-icons/hi2";
import TotalEarningGoth from "./UsersAreaChart";
import doner from "../../../assets/doner.png";
import donation from "../../../assets/donation.png";
import earningsIcon from "../../../assets/dashboardHome/earningsIcon.png";
import totalEmployee from "../../../assets/dashboardHome/totalEmployee.png";
import totalUserIcon from "../../../assets/dashboardHome/totalUserIcon.png";
import { FiUsers } from "react-icons/fi";
import { FaArrowUpLong } from "react-icons/fa6";
import UsersAreaChart from "./UsersAreaChart";
import EarningsBarChart from "./EarningsBarChart";
import SellingLineChart from "./SellingLineChart";

function DashboardHome() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  const data = [
    {
      name: "Total Service Providers",
      total: "20.10K",
      title1: "Daily progress",
      daily: "100",
      icon: <img src={totalUserIcon} />,
      textColor: "#BB6D42",
      barColor: "#EAD2C4",
    },
    {
      name: "Total Employer",
      total: "10.10k",
      title1: " Daily progress",
      daily: "50",
      icon: <img src={totalEmployee} />,
      textColor: "#68817F",
      barColor: "#CAEEEC",
    },
    {
      name: "Total Earning",
      total: "150.10K",
      title1: " Daily Earning",
      daily: "$10,000",
      icon: <img src={earningsIcon} />,
      textColor: "#00AA46",
      barColor: "#87DF50",
    },
  ];

  const statistics = [
    {
      title: "Total Users",
      amount: 502,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Sold",
      amount: "10k",
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Earnings",
      amount: "30k",
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Orders",
      amount: 905,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
  ];

  return (
    <div className="flex flex-col bg-[#121212]">
      <div className="grid grid-cols-4 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon }) => (
          <div
            key={title}
            className="rounded-lg py-4 px-5 gap-4 bg-green"
          >
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className="bg-action p-3 rounded-full">{icon}</div>
              <h2 className="text-lg text-[#EEEEEE] font-medium">{title}</h2>
            </div>
            <div className="flex flex-col gap-1 text-[#EEEEEE]">
              <div className="flex justify-between">
                <p>Total : {amount}</p>
                <p className="flex gap-1">
                  Daily :{" "}
                  <span
                    className={`text-[#1E90FF] ${
                      title === "Total Users" && "text-[#008000]"
                    } flex items-center gap-1`}
                  >
                    {amount}{" "}
                    {title === "Total Users" && (
                      <FaArrowUpLong className="text-xs" />
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13333A] rounded-lg p-4">
        <UsersAreaChart />
      </div>

      <div className="grid grid-cols-2 gap-x-4 mt-2">
        <SellingLineChart />
        <EarningsBarChart />
      </div>
    </div>
  );
}

export default DashboardHome;
