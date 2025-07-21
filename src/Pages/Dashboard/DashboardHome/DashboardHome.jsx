import { Col, Row } from "antd";
import React from "react";

import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { HiMiniUserGroup } from "react-icons/hi2";
import TotalEarningGoth from "./TotalEarningGrowth";
import doner from "../../../assets/doner.png";
import donation from "../../../assets/donation.png";
import earningsIcon from "../../../assets/dashboardHome/earningsIcon.png";
import totalEmployee from "../../../assets/dashboardHome/totalEmployee.png";
import totalUserIcon from "../../../assets/dashboardHome/totalUserIcon.png";
import { FiUsers } from "react-icons/fi";
import TotalEarningGrowth from "./TotalEarningGrowth";

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
            className="bg-secondary rounded-lg py-4 px-5 gap-4 bg-[#13333A]"
          >
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className="bg-[#215762] p-3 rounded-full">{icon}</div>
              <h2 className="text-lg text-[#EEEEEE] font-medium">{title}</h2>
            </div>
            <div className="flex flex-col gap-1 text-[#EEEEEE]">
              <div className="flex justify-between">
                <p>Total : {amount}</p>
                <p>Daily : {amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#13333A] rounded-lg p-4">
        <TotalEarningGrowth />
      </div>

      <div className="grid grid-cols-2 gap-x-4 mt-4">
        {data?.map((item, index) => (
          <div key={index} className="bg-[#F7F7F7] rounded-2xl shadow">
            {item?.name !== "Total Earning" && (
              <>
                <div className="bg-[#FDFDFD] m-2 rounded-lg p-2 w-[285px] h-[126px]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#EFEFEF] flex justify-center items-center">
                      {item?.icon}
                    </div>
                    <h4 className="text-lg font-medium leading-6">
                      {item?.name}
                    </h4>
                  </div>
                  <h2
                    className="text-xl font-semibold mt-2"
                    style={{
                      color: `${item?.textColor}`,
                    }}
                  >
                    ${item?.total}
                  </h2>
                  <div className="flex items-center gap-4 mt-1 text-base">
                    <p className="text-[#333333]">{item?.title1}</p>
                    <p className="text-[#767676]">{item?.daily}</p>
                  </div>
                </div>
                <div className="p-4 -mt-12">
                  <TotalSellerChart barColor={item?.barColor} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
