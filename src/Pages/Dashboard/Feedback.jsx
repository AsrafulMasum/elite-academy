import { useEffect, useState } from "react";
import { Input, Pagination, Select, Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";

const data = [
  {
    key: "#1",
    reportTo: "Mr. Mahmud",
    reportFor: "Claire",
    reportType: "Service Issue",
    date: "2024-04-25 3:45 PM",
    reportDetails: "Delay in service delivery.",
  },
  {
    key: "#2",
    reportTo: "Lily",
    reportFor: "Kathry",
    reportType: "Payment Issue",
    date: "2024-04-20 2:15 PM",
    reportDetails: "Refund not processed yet.",
  },
  {
    key: "#3",
    reportTo: "Priscilla",
    reportFor: "Irmar",
    reportType: "Behavioral",
    date: "2024-04-18 11:00 AM",
    reportDetails: "Rude behavior reported.",
  },
  {
    key: "#4",
    reportTo: "Sarah Khan",
    reportFor: "Jonathan",
    reportType: "Service Issue",
    date: "2024-04-15 9:30 AM",
    reportDetails: "Service not completed as promised.",
  },
  {
    key: "#5",
    reportTo: "Ahmed Karim",
    reportFor: "Sophie",
    reportType: "Payment Issue",
    date: "2024-04-13 4:10 PM",
    reportDetails: "Duplicate payment charged.",
  },
  {
    key: "#6",
    reportTo: "James",
    reportFor: "Zara",
    reportType: "Behavioral",
    date: "2024-04-12 10:05 AM",
    reportDetails: "Customer was verbally abusive.",
  },
  {
    key: "#7",
    reportTo: "Maria",
    reportFor: "Kevin",
    reportType: "Service Issue",
    date: "2024-04-10 3:00 PM",
    reportDetails: "Technician arrived late.",
  },
  {
    key: "#8",
    reportTo: "Noah",
    reportFor: "Amelia",
    reportType: "Payment Issue",
    date: "2024-04-09 2:45 PM",
    reportDetails: "Customer charged for unrequested service.",
  },
  {
    key: "#9",
    reportTo: "Sophia",
    reportFor: "Logan",
    reportType: "Behavioral",
    date: "2024-04-08 11:30 AM",
    reportDetails: "Inappropriate language during chat.",
  },
  {
    key: "#10",
    reportTo: "Elijah",
    reportFor: "Emily",
    reportType: "Service Issue",
    date: "2024-04-07 1:15 PM",
    reportDetails: "Incomplete cleaning job reported.",
  },
  {
    key: "#11",
    reportTo: "Olivia",
    reportFor: "William",
    reportType: "Payment Issue",
    date: "2024-04-06 4:50 PM",
    reportDetails: "Payment method failed multiple times.",
  },
  {
    key: "#12",
    reportTo: "Benjamin",
    reportFor: "Mia",
    reportType: "Behavioral",
    date: "2024-04-05 9:00 AM",
    reportDetails: "Rude response over call.",
  },
  {
    key: "#13",
    reportTo: "Abigail",
    reportFor: "Lucas",
    reportType: "Service Issue",
    date: "2024-04-04 3:30 PM",
    reportDetails: "Missed scheduled appointment.",
  },
  {
    key: "#14",
    reportTo: "Jacob",
    reportFor: "Isabella",
    reportType: "Payment Issue",
    date: "2024-04-03 5:15 PM",
    reportDetails: "Incorrect amount billed.",
  },
  {
    key: "#15",
    reportTo: "Charlotte",
    reportFor: "Henry",
    reportType: "Behavioral",
    date: "2024-04-02 12:45 PM",
    reportDetails: "Aggressive tone used with staff.",
  },
  {
    key: "#16",
    reportTo: "Daniel",
    reportFor: "Ava",
    reportType: "Service Issue",
    date: "2024-04-01 8:30 AM",
    reportDetails: "Unprofessional behavior by technician.",
  },
  {
    key: "#17",
    reportTo: "Harper",
    reportFor: "Sebastian",
    reportType: "Payment Issue",
    date: "2024-03-30 10:10 AM",
    reportDetails: "Coupon not applied properly.",
  },
  {
    key: "#18",
    reportTo: "Alexander",
    reportFor: "Ella",
    reportType: "Behavioral",
    date: "2024-03-29 3:05 PM",
    reportDetails: "Shouting during the call.",
  },
  {
    key: "#19",
    reportTo: "Mason",
    reportFor: "Grace",
    reportType: "Service Issue",
    date: "2024-03-28 1:40 PM",
    reportDetails: "Faulty product delivered.",
  },
  {
    key: "#20",
    reportTo: "Chloe",
    reportFor: "Leo",
    reportType: "Payment Issue",
    date: "2024-03-27 11:55 AM",
    reportDetails: "Late fee charged wrongly.",
  },
];

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState("Date");
  const [reportType, setReportType] = useState("Report Type");
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Report To",
      dataIndex: "reportTo",
      key: "reportTo",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Report For",
      dataIndex: "reportFor",
      key: "reportFor",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Report Type",
      dataIndex: "reportType",
      key: "reportType",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Report Details",
      dataIndex: "reportDetails",
      key: "reportDetails",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            style={{
              backgroundColor: "#F9F9F9",
              border: "none",
              borderRadius: "6px",
              width: "40px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FiArrowUpRight size={20} className="text-[#A1A1A1]" />
          </button>
        </div>
      ),
    },
  ];

  const dates = [
    { label: "Last 7 days", value: "last7" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
  ];

  const reportTypes = [
    { label: "Service Issue", value: "Service Issue" },
    { label: "Payment Issue", value: "Payment Issue" },
    { label: "Behavioral", value: "Behavioral" },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const pageSize = 12;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
  };

  const handleReportType = (value) => {
    setReportType(value);
  };

  return (
    <div className="h-[78vh]">
      <div
        style={{ background: "white", borderRadius: "12px", height: "100%" }}
      >
        <div className="flex justify-between items-center m-4">
          <h3 className="text-[#333] text-lg font-medium">All Reports</h3>
          <div className="flex items-center gap-4 pt-2">
            <div className="w-[353px] h-[40px]">
              <Input
                placeholder="Search..."
                onChange={handleSearchChange}
                prefix={<FiSearch size={14} color="#868FA0" />}
                style={{
                  backgroundColor: "#FAFAFA",
                  height: "100%",
                  fontSize: "14px",
                }}
              />
            </div>
            <Select
              value={dateRange}
              onChange={handleDateChange}
              style={{ width: 100, height: 40 }}
              options={dates}
            />
            <Select
              value={reportType}
              onChange={handleReportType}
              style={{ width: 130, height: 40 }}
              options={reportTypes}
            />
          </div>
        </div>

        <div className="relative h-full">
          <Table
            size="small"
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={data.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              size="small"
              itemRender={(pageNum, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <a
                      className="hover:text-[#333333]"
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <LeftOutlined />
                      <span className="mr-2">Previous</span>
                    </a>
                  );
                }
                if (type === "next") {
                  return (
                    <a
                      className="hover:text-[#333333]"
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <span className="ml-2">Next</span>
                      <RightOutlined />
                    </a>
                  );
                }
                return originalElement;
              }}
            />
          </div>
        </div>
      </div>
      <UserDetailsModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Feedback;
