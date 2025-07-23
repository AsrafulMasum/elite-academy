import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Input, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const data = [
  {
    key: 1,
    coachId: "C1001",
    coachName: {
      name: "John Peterson",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Head Coach",
    email: "john.peterson@footballpro.com",
    contact: "+1 555-432-1123",
  },
  {
    key: 2,
    coachId: "C1002",
    coachName: {
      name: "Maria Gomez",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Goalkeeping Coach",
    email: "maria.gomez@footballpro.com",
    contact: "+1 555-934-8743",
  },
  {
    key: 3,
    coachId: "C1003",
    coachName: {
      name: "Samuel Adams",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Fitness Coach",
    email: "samuel.adams@footballpro.com",
    contact: "+1 555-211-3212",
  },
  {
    key: 4,
    coachId: "C1004",
    coachName: {
      name: "Linda Tran",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Tactical Coach",
    email: "linda.tran@footballpro.com",
    contact: "+1 555-874-8933",
  },
  {
    key: 5,
    coachId: "C1005",
    coachName: {
      name: "Brian Foster",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Assistant Coach",
    email: "brian.foster@footballpro.com",
    contact: "+1 555-238-1123",
  },
  {
    key: 6,
    coachId: "C1006",
    coachName: {
      name: "Jessica Clark",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Youth Coach",
    email: "jessica.clark@footballpro.com",
    contact: "+1 555-872-7722",
  },
  {
    key: 7,
    coachId: "C1007",
    coachName: {
      name: "David Kim",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Defensive Coach",
    email: "david.kim@footballpro.com",
    contact: "+1 555-224-8832",
  },
  {
    key: 8,
    coachId: "C1008",
    coachName: {
      name: "Sophia Lee",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Midfield Coach",
    email: "sophia.lee@footballpro.com",
    contact: "+1 555-722-1982",
  },
  {
    key: 9,
    coachId: "C1009",
    coachName: {
      name: "Chris Evans",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Striker Coach",
    email: "chris.evans@footballpro.com",
    contact: "+1 555-999-3312",
  },
  {
    key: 10,
    coachId: "C1010",
    coachName: {
      name: "Emily Watson",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Physio Coach",
    email: "emily.watson@footballpro.com",
    contact: "+1 555-873-1121",
  },
  {
    key: 11,
    coachId: "C1011",
    coachName: {
      name: "Kevin Blake",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Tactical Coach",
    email: "kevin.blake@footballpro.com",
    contact: "+1 555-223-6543",
  },
  {
    key: 12,
    coachId: "C1012",
    coachName: {
      name: "Natalie Moore",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Defensive Coach",
    email: "natalie.moore@footballpro.com",
    contact: "+1 555-927-8844",
  },
  {
    key: 13,
    coachId: "C1013",
    coachName: {
      name: "Robert King",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Fitness Coach",
    email: "robert.king@footballpro.com",
    contact: "+1 555-221-9900",
  },
  {
    key: 14,
    coachId: "C1014",
    coachName: {
      name: "Olivia Smith",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Goalkeeping Coach",
    email: "olivia.smith@footballpro.com",
    contact: "+1 555-762-3333",
  },
  {
    key: 15,
    coachId: "C1015",
    coachName: {
      name: "Michael Ray",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Youth Coach",
    email: "michael.ray@footballpro.com",
    contact: "+1 555-882-1100",
  },
  {
    key: 16,
    coachId: "C1016",
    coachName: {
      name: "Ava Johnson",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Midfield Coach",
    email: "ava.johnson@footballpro.com",
    contact: "+1 555-672-1123",
  },
  {
    key: 17,
    coachId: "C1017",
    coachName: {
      name: "Daniel White",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Assistant Coach",
    email: "daniel.white@footballpro.com",
    contact: "+1 555-332-7771",
  },
  {
    key: 18,
    coachId: "C1018",
    coachName: {
      name: "Grace Brooks",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Physio Coach",
    email: "grace.brooks@footballpro.com",
    contact: "+1 555-123-3312",
  },
  {
    key: 19,
    coachId: "C1019",
    coachName: {
      name: "Jason Bell",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Tactical Coach",
    email: "jason.bell@footballpro.com",
    contact: "+1 555-789-6541",
  },
  {
    key: 20,
    coachId: "C1020",
    coachName: {
      name: "Chloe Martin",
      img: <img src={provider} height={46} width={46} />,
    },
    designation: "Head Coach",
    email: "chloe.martin@footballpro.com",
    contact: "+1 555-985-1122",
  },
];

const itemsPerPage = 10;
const total = 20;

const CoachLists = () => {
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
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Coach Name",
      dataIndex: "coachName",
      key: "coachName",
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
      title: "Coach Id",
      dataIndex: "coachId",
      key: "coachId",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
          {/* <button
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
          </button> */}

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

export default CoachLists;
