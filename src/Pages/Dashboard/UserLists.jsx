import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Input, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const data = [
  {
    key: "U1001",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud1@example.com",
    type: "Subscribed User",
    createdAt: "2024-12-01",
  },
  {
    key: "U1002",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud2@example.com",
    type: "Normal User",
    createdAt: "2025-01-05",
  },
  {
    key: "U1003",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud3@example.com",
    type: "Subscribed User",
    createdAt: "2025-01-12",
  },
  {
    key: "U1004",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud4@example.com",
    type: "Normal User",
    createdAt: "2025-02-01",
  },
  {
    key: "U1005",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud5@example.com",
    type: "Subscribed User",
    createdAt: "2025-02-14",
  },
  {
    key: "U1006",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud6@example.com",
    type: "Normal User",
    createdAt: "2025-02-20",
  },
  {
    key: "U1007",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud7@example.com",
    type: "Subscribed User",
    createdAt: "2025-03-01",
  },
  {
    key: "U1008",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud8@example.com",
    type: "Normal User",
    createdAt: "2025-03-15",
  },
  {
    key: "U1009",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud9@example.com",
    type: "Subscribed User",
    createdAt: "2025-03-22",
  },
  {
    key: "U1010",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud10@example.com",
    type: "Normal User",
    createdAt: "2025-03-29",
  },
  {
    key: "U1011",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud11@example.com",
    type: "Subscribed User",
    createdAt: "2025-04-05",
  },
  {
    key: "U1012",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud12@example.com",
    type: "Normal User",
    createdAt: "2025-04-11",
  },
  {
    key: "U1013",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud13@example.com",
    type: "Subscribed User",
    createdAt: "2025-04-17",
  },
  {
    key: "U1014",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud14@example.com",
    type: "Normal User",
    createdAt: "2025-04-23",
  },
  {
    key: "U1015",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud15@example.com",
    type: "Subscribed User",
    createdAt: "2025-04-30",
  },
  {
    key: "U1016",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud16@example.com",
    type: "Normal User",
    createdAt: "2025-05-08",
  },
  {
    key: "U1017",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud17@example.com",
    type: "Subscribed User",
    createdAt: "2025-05-15",
  },
  {
    key: "U1018",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud18@example.com",
    type: "Normal User",
    createdAt: "2025-05-22",
  },
  {
    key: "U1019",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud19@example.com",
    type: "Subscribed User",
    createdAt: "2025-05-28",
  },
  {
    key: "U1020",
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud20@example.com",
    type: "Normal User",
    createdAt: "2025-06-03",
  },
];

const itemsPerPage = 10;
const total = 20;

const UserLists = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userType, setUserType] = useState("User Type");

  const UserType = [
    { value: "Normal User", label: "Normal User" },
    { value: "Subscribed User", label: "Subscribed User" },
  ];

  const columns = [
    {
      title: "User Id",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "User Name",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "createdAt",
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

  const pageSize = 10;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleUserType = (value) => {
    setUserType(value);
  };

  return (
    <div className="w-full  bg-[#13333A]">
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
          <h3
            style={{
              color: "#FDFDFD",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            User Lists
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "350px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#13333A",
                  },
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
              </ConfigProvider>
            </div>

            <div>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#13333A",
                  },
                  components: {
                    Select: {
                      optionSelectedBg: "#2E7A8A",
                    },
                  },
                }}
              >
                <Select
                  value={userType}
                  onChange={handleUserType}
                  style={{
                    width: 150,
                    height: 40,
                  }}
                  options={UserType}
                />
              </ConfigProvider>
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

export default UserLists;
