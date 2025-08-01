import { FiUsers } from "react-icons/fi";
import UsersAreaChart from "./UsersAreaChart";
import SellingLineChart from "./SellingLineChart";
import StudentsBarChart from "./StudentsBarChart";
import { useStatisticsQuery } from "../../../redux/features/statisticsApi";
import { useState } from "react";

function DashboardHome() {
  const [userYear, setUserYear] = useState("");
  const [sellerYear, setSellerYear] = useState("");
  const [studentYear, setStudentYear] = useState("");

  const { data } = useStatisticsQuery({ userYear, sellerYear, studentYear });
  const overView = data?.data?.overView;

  const statistics = [
    {
      title: "Total Users",
      amount: overView?.totalUsers,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Sold",
      amount: overView?.totalSold,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Earnings",
      amount: overView?.totalEarning,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Orders",
      amount: overView?.totalOrder,
      icon: <FiUsers className="text-2xl text-[#EEEEEE]" />,
    },
  ];

  return (
    <div className="flex flex-col bg-[#121212]">
      <div className="grid grid-cols-4 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon }) => (
          <div key={title} className="rounded-lg py-4 px-5 gap-4 bg-green">
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className="bg-action p-3 rounded-full">{icon}</div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg text-[#EEEEEE] font-medium">{title}</h2>
                <p className="text-[#EEEEEE]">Total : {amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13333A] rounded-lg p-4">
        <UsersAreaChart setUserYear={setUserYear} userStats={data?.data?.userListByMonthsData} />
      </div>

      <div className="grid grid-cols-2 gap-x-2 mt-2">
        <SellingLineChart setSellerYear={setSellerYear} sellingStats={data?.data?.orderListByMonthsData} />
        <StudentsBarChart setStudentYear={setStudentYear} studentStats={data?.data?.studentListByMonthsData} />
      </div>
    </div>
  );
}

export default DashboardHome;
