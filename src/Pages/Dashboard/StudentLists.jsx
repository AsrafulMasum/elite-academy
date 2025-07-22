import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Input, Pagination, Rate, Select, Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo.png";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import providerIcon from "../../assets/providerIcon.png";
import { CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const data = [
  {
    key: "#1239",

    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mr101@mail.ru",
    contact: "(+33)7 00 55 59 27",
    location: "Corona, Michigan",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1238",

    user: {
      name: "Lily",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "xterris@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Great Falls, Maryland ",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1237",

    user: {
      name: "Kathry",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "irnabela@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Syracuse, Connecticut ",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1236",

    user: {
      name: "Priscilla",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "codence@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Lafayette, California",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1235",

    user: {
      name: "Claire",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "quasiah@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Pasadena, Oklahoma",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1234",

    user: {
      name: "Irmar",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "xeno@yandex.ru",
    contact: "(+33)7 00 55 59 27",
    location: "Lansing, Illinois",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1233",

    user: {
      name: "Gloria",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "redaniel@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Coppell, Virginia",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1233",

    user: {
      name: "Gloria",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "redaniel@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Coppell, Virginia",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1233",

    user: {
      name: "Gloria",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "redaniel@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Coppell, Virginia",
    courses: "Under 20 summer 25",
  },
  {
    key: "#1233",

    user: {
      name: "Gloria",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "redaniel@gmail.com",
    contact: "(+33)7 00 55 59 27",
    location: "Coppell, Virginia",
    courses: "Under 20 summer 25",
  },

  {
    key: "#4",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#5",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#6",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#7",
    name: "Nadir",
    user: {
      name: "Ashutosh",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#8",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "tushar@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#9",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "rahman@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#10",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} />,
    },
    email: "rafsan@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
  {
    key: "#11",

    user: {
      name: "Gloria",
      img: <img src={Logo} height={46} width={46} className="rounded-full" />,
    },
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
    courses: "Under 20 summer 25",
  },
];

const itemsPerPage = 10;
const total = 50;

const StudentLists = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRating, setSelectedRating] = useState("Rating");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  const dropdownRef = useRef();

  const locations = [
    { value: "London", label: "London" },
    { value: "Dhaka", label: "Dhaka" },
    { value: "Washington DC", label: "Washington DC" },
    { value: "Virginia", label: "Virginia" },
    { value: "California", label: "California" },
    { value: "Oklahoma", label: "Oklahoma" },
  ];

  const ratings = [
    { value: "Above 4", label: "Above 4" },
    { value: "Below 4", label: "Below 4" },
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
      title: "Student Id",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <p>{user?.img} </p>

            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
                color: "#FDFDFD",
              }}
            >
              {user?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Courses",
      dataIndex: "courses",
      key: "courses",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          <button
            className="flex justify-center items-center rounded-md"
            onClick={() => setOpen(true)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              backgroundColor: "#121212",
              width: "40px",
              height: "32px",
            }}
          >
            <GoArrowUpRight size={26} className="text-secondary" />
          </button>

          <div>
            <button
              className="flex justify-center items-center rounded-md"
              onClick={() => setOpen(true)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "#121212",
                width: "40px",
                height: "32px",
              }}
            >
              <CiUnlock size={26} className="text-secondary" />
            </button>
          </div>
        </div>
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

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  return (
    <div className="w-full h-full bg-[#13333A]">
      <div
        style={{
          borderRadius: "8px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 16px",
            padding: "16px 0px",
          }}
        >
          <div>
            <h3
              style={{
                color: "#FDFDFD",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Student Lists
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
                value={selectedRating}
                onChange={handleRatingChange}
                style={{
                  width: 115,
                  height: 40,
                }}
                options={ratings}
              />
            </div>

            <div>
              <Select
                value={selectedLocation}
                onChange={handleLocationChange}
                style={{
                  width: 115,
                  height: 40,
                }}
                options={locations}
              />
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#FFC107",
                  borderRadius: "100%",
                  colorText: "white",
                  colorTextDisabled: "#6C6C6C",
                },
                Table: {
                  rowHoverBg: "#13333A",
                },
              },
              token: {
                colorPrimary: "#13333A",
              },
            }}
          >
            <Table
              size="small"
              columns={columns}
              dataSource={paginatedData}
              pagination={{
                total: total,
                current: page,
                pageSize: itemsPerPage,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <UserDetailsModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default StudentLists;
