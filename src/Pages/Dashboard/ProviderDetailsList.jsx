import { useEffect, useRef, useState } from "react";
import { Input, Pagination, Rate, Select, Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo.png";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import providerIcon from "../../assets/providerIcon.png";

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
  },
];

const ProviderDetailsList = () => {
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
      title: "S.No",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#636363]">{text}</span>,
    },
    {
      title: "Providers Name",
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
                color: "#636363",
              }}
            >
              {user?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: () => {
        return (
          <Rate
            disabled
            allowHalf
            defaultValue={4.5}
            style={{
              fontSize: "14px",
              color: "#FEA500",
            }}
          />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#636363" }}>{text}</span>,
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span style={{ color: "#636363" }}>{text}</span>,
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <span style={{ color: "#636363" }}>{text}</span>,
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
              backgroundColor: "#F9F9F9",
              width: "40px",
              height: "32px",
            }}
          >
            <FiArrowUpRight size={26} className="text-[#A1A1A1]" />
          </button>

          <div>
            <button className="bg-[#F9F9F9] w-10 h-8 flex justify-center items-center rounded-md pl-2">
              <img src={providerIcon} alt="" />
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

  const pageSize = 9;
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

export default ProviderDetailsList;
