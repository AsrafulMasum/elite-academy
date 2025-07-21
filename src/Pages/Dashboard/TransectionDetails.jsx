import { useEffect, useRef, useState } from "react";
import { Avatar, Input, Pagination, Select, Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";

const data = [
  {
    key: 1,
    serial: 500,
    employerName: "Pásztor Kíra",
    providerName: "Takács Bianka",
    date: "12/06/2020",
    priceSystem: "Request to Book",
    bookingPrice: 100,
    earning: 20,
    status: "Pending",
  },
  {
    key: 2,
    serial: 499,
    employerName: "Novák Réka",
    providerName: "Novák Réka",
    date: "12/06/2020",
    priceSystem: "Request to Book",
    bookingPrice: 100,
    earning: 20,
    status: "Upcoming",
  },
  {
    key: 3,
    serial: 498,
    employerName: "Török Melinda",
    providerName: "Kende Lili",
    date: "15/08/2017",
    priceSystem: "Request to Book",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 4,
    serial: 497,
    employerName: "Molnár Fruzsina",
    providerName: "Katona Beatrix",
    date: "15/08/2017",
    priceSystem: "Request to Book",
    bookingPrice: 100,
    earning: 20,
    status: "Cancelled",
  },
  {
    key: 5,
    serial: 496,
    employerName: "László Cintia",
    providerName: "Varga Boglárka",
    date: "16/08/2013",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Upcoming",
  },
  {
    key: 6,
    serial: 495,
    employerName: "Tóth Kamilla",
    providerName: "Mezei Ágnes",
    date: "28/10/2012",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 7,
    serial: 494,
    employerName: "Surány Izabella",
    providerName: "Somogyi Adél",
    date: "15/08/2017",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Cancelled",
  },
  {
    key: 8,
    serial: 494,
    employerName: "Gáspár Gréta",
    providerName: "Halász Emese",
    date: "07/05/2016",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 9,
    serial: 493,
    employerName: "Dudás Nikolett",
    providerName: "Szűts Gabriella",
    date: "28/10/2012",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 10,
    serial: 492,
    employerName: "Szűts Gabriella",
    providerName: "Pásztor Kíra",
    date: "18/09/2016",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 11,
    serial: 491,
    employerName: "Miksa Fruzsina",
    providerName: "László Barbara",
    date: "18/09/2016",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 12,
    serial: 490,
    employerName: "Kiss Laura",
    providerName: "Szekeres Dalma",
    date: "28/10/2012",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Completed",
  },
  {
    key: 13,
    serial: 489,
    employerName: "Borbála Petra",
    providerName: "Varga Lilla",
    date: "10/11/2015",
    priceSystem: "Instant Booking",
    bookingPrice: 120,
    earning: 25,
    status: "Upcoming",
  },
  {
    key: 14,
    serial: 488,
    employerName: "Tóth Bence",
    providerName: "Kovács Luca",
    date: "22/03/2017",
    priceSystem: "Request to Book",
    bookingPrice: 110,
    earning: 22,
    status: "Pending",
  },
  {
    key: 15,
    serial: 487,
    employerName: "Mészáros Anna",
    providerName: "Nagy Emma",
    date: "19/07/2018",
    priceSystem: "Instant Booking",
    bookingPrice: 130,
    earning: 30,
    status: "Completed",
  },
  {
    key: 16,
    serial: 486,
    employerName: "Horváth Dániel",
    providerName: "Tóth László",
    date: "11/04/2019",
    priceSystem: "Request to Book",
    bookingPrice: 90,
    earning: 18,
    status: "Cancelled",
  },
  {
    key: 17,
    serial: 485,
    employerName: "Szabó Ádám",
    providerName: "Pintér Anett",
    date: "06/01/2020",
    priceSystem: "Instant Booking",
    bookingPrice: 100,
    earning: 20,
    status: "Upcoming",
  },
  {
    key: 18,
    serial: 484,
    employerName: "Kovács Réka",
    providerName: "Sárközi Áron",
    date: "05/05/2020",
    priceSystem: "Instant Booking",
    bookingPrice: 105,
    earning: 21,
    status: "Completed",
  },
  {
    key: 19,
    serial: 483,
    employerName: "Balogh Vivien",
    providerName: "Varga Viktor",
    date: "09/09/2015",
    priceSystem: "Request to Book",
    bookingPrice: 95,
    earning: 19,
    status: "Pending",
  },
  {
    key: 20,
    serial: 482,
    employerName: "Kiss Tamás",
    providerName: "Simon Judit",
    date: "01/12/2018",
    priceSystem: "Instant Booking",
    bookingPrice: 110,
    earning: 22,
    status: "Completed",
  },
];

const TransectionDetails = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState("Date");
  const [selectedPriceSystem, setSelectedPriceSystem] =
    useState("Price System");

  const dropdownRef = useRef();

  const dates = [
    { label: "Last 7 days", value: "last7" },
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
  ];

  const paymentSystems = [
    { value: "bkash", label: "Bkash" },
    { value: "nagad", label: "Nagad" },
    { value: "rocket", label: "Rocket" },
    { value: "bank", label: "Bank Transfer" },
    { value: "paypal", label: "PayPal" },
    { value: "visa", label: "Visa/Mastercard" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const columns = [
    {
      title: "S.no",
      dataIndex: "serial",
      key: "serial",
      render: (text) => <span className="text-[#636363]">#{text}</span>,
    },
    {
      title: "Employer Name",
      dataIndex: "employerName",
      key: "employerName",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Providers Name",
      dataIndex: "providerName",
      key: "providerName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={provider} size={40} shape="square" />
          <span className="text-[#636363]">{record?.providerName}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Price System",
      dataIndex: "priceSystem",
      key: "priceSystem",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Booking Price",
      dataIndex: "bookingPrice",
      key: "bookingPrice",
      render: (price) => <span className="text-[#636363]">{price}$/hour</span>,
    },
    {
      title: "Spitzer Earning",
      dataIndex: "earning",
      key: "earning",
      render: (earning) => (
        <span className="text-[#636363]">{earning}$/hour</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "#00C853";
        if (status === "Pending") color = "#FFA726";
        else if (status === "Cancelled") color = "#FF5252";
        else if (status === "Upcoming") color = "#42A5F5";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          className="flex justify-center items-center rounded-md"
          onClick={() => setOpen(true)}
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            backgroundColor: "#F9F9F9",
            width: "40px",
            height: "32px",
          }}
        >
          <FiArrowUpRight size={26} className="text-[#A1A1A1]" />
        </button>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const pageSize = 10;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDateChange = (value) => {
    setDateRange(value);
  };

  const handlePriceSystem = (value) => {
    setSelectedPriceSystem(value);
  };

  return (
    <div className="h-[77vh]">
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "24px 16px",
          }}
        >
          <div>
            <h3
              style={{
                color: "#333333",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              All Service Providers
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "353px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <Input
                placeholder="Search..."
                onChange={handleSearchChange}
                prefix={<FiSearch size={14} color="#868FA0" />}
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "14px",
                  backgroundColor: "#FAFAFA",
                }}
                size="middle"
              />
            </div>

            <div>
              <Select
                value={dateRange}
                onChange={handleDateChange}
                style={{ width: 100, height: 40 }}
                options={dates}
              />
            </div>

            <div>
              <Select
                value={selectedPriceSystem}
                onChange={handlePriceSystem}
                style={{
                  width: 146,
                  height: 40,
                }}
                options={paymentSystems}
              />
            </div>
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

export default TransectionDetails;
