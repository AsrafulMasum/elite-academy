import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Input, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiUnlock } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import AddAdminModal from "../../Components/Dashboard/AddAdminModal";

const data = [
  {
    key: "1",
    adminName: {
      name: "Masum Kabir",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM001",
    designation: "Super Admin",
    email: "masum.kabir@example.com",
    contact: "+8801711001100",
  },
  {
    key: "2",
    adminName: {
      name: "Ayesha Sultana",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM002",
    designation: "HR Admin",
    email: "ayesha.s@example.com",
    contact: "+8801788002211",
  },
  {
    key: "3",
    adminName: {
      name: "Tanvir Hasan",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM003",
    designation: "Finance Admin",
    email: "tanvir.h@example.com",
    contact: "+8801999003311",
  },
  {
    key: "4",
    adminName: {
      name: "Nusrat Jahan",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM004",
    designation: "Support Admin",
    email: "nusrat.j@example.com",
    contact: "+8801600004455",
  },
  {
    key: "5",
    adminName: {
      name: "Farhan Ahmed",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM005",
    designation: "Marketing Admin",
    email: "farhan.a@example.com",
    contact: "+8801900005566",
  },
  {
    key: "6",
    adminName: {
      name: "Rimi Akter",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM006",
    designation: "Content Admin",
    email: "rimi.a@example.com",
    contact: "+8801777006677",
  },
  {
    key: "7",
    adminName: {
      name: "Imran Hossain",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM007",
    designation: "IT Admin",
    email: "imran.h@example.com",
    contact: "+8801300007788",
  },
  {
    key: "8",
    adminName: {
      name: "Shamima Sultana",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM008",
    designation: "Training Admin",
    email: "shamima.s@example.com",
    contact: "+8801766008899",
  },
  {
    key: "9",
    adminName: {
      name: "Jahidul Islam",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM009",
    designation: "Audit Admin",
    email: "jahidul.i@example.com",
    contact: "+8801555009900",
  },
  {
    key: "10",
    adminName: {
      name: "Moumi Akter",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM010",
    designation: "Compliance Admin",
    email: "moumi.a@example.com",
    contact: "+8801888000011",
  },
  {
    key: "11",
    adminName: {
      name: "Hasan Chowdhury",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM011",
    designation: "Operations Admin",
    email: "hasan.c@example.com",
    contact: "+8801200001122",
  },
  {
    key: "12",
    adminName: {
      name: "Sadia Karim",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM012",
    designation: "Legal Admin",
    email: "sadia.k@example.com",
    contact: "+8801788123456",
  },
  {
    key: "13",
    adminName: {
      name: "Nahid Hasan",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM013",
    designation: "QA Admin",
    email: "nahid.h@example.com",
    contact: "+8801999123123",
  },
  {
    key: "14",
    adminName: {
      name: "Nadia Rahman",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM014",
    designation: "Design Admin",
    email: "nadia.r@example.com",
    contact: "+8801766789012",
  },
  {
    key: "15",
    adminName: {
      name: "Sajid Khan",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM015",
    designation: "Event Admin",
    email: "sajid.k@example.com",
    contact: "+8801777011223",
  },
  {
    key: "16",
    adminName: {
      name: "Tania Islam",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM016",
    designation: "Community Admin",
    email: "tania.i@example.com",
    contact: "+8801555667788",
  },
  {
    key: "17",
    adminName: {
      name: "Rakibul Hasan",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM017",
    designation: "Support Admin",
    email: "rakibul.h@example.com",
    contact: "+8801800123456",
  },
  {
    key: "18",
    adminName: {
      name: "Mitu Sultana",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM018",
    designation: "Social Media Admin",
    email: "mitu.s@example.com",
    contact: "+8801700987654",
  },
  {
    key: "19",
    adminName: {
      name: "Aminul Islam",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM019",
    designation: "Analytics Admin",
    email: "aminul.i@example.com",
    contact: "+8801300456789",
  },
  {
    key: "20",
    adminName: {
      name: "Mahira Chowdhury",
      img: <img src={provider} height={46} width={46} />,
    },
    adminId: "ADM020",
    designation: "Feedback Admin",
    email: "mahira.c@example.com",
    contact: "+8801900345678",
  },
];

const itemsPerPage = 10;
const total = 20;

const ManageAdmin = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
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
      title: "Admin Name",
      dataIndex: "adminName",
      key: "adminName",
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
      title: "Admin Id",
      dataIndex: "adminId",
      key: "adminId",
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
            Admin Lists
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
              <Button
                onClick={() => {
                  setOpenAddModel(true);
                }}
                style={{
                  width: "177px",
                  height: "40px",
                  boxShadow: "0px 2px 4px 0px #0000001A",
                  backgroundColor: "#2E7A8A",
                  border: "none",
                  transition: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <PlusOutlined />
                <span style={{ margin: 0 }}>Add Admin</span>
              </Button>
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
      <AddAdminModal
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
      />
    </div>
  );
};

export default ManageAdmin;
