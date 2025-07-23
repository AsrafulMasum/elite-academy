import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Input, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import SellingsDetailsModal from "../../Components/Dashboard/SellingsDetailsModal";

const data = [
  {
    key: 1,
    transectionId: "TXN20250723001",
    studentName: "Ayesha Siddiqua",
    studentId: "STU1001",
    email: "ayesha.siddiqua@example.com",
    fee: "4500",
    date: "2025-07-01",
  },
  {
    key: 2,
    transectionId: "TXN20250723002",
    studentName: "Hasan Mahmud",
    studentId: "STU1002",
    email: "hasan.mahmud@example.com",
    fee: "3000",
    date: "2025-07-02",
  },
  {
    key: 3,
    transectionId: "TXN20250723003",
    studentName: "Fatima Khatun",
    studentId: "STU1003",
    email: "fatima.khatun@example.com",
    fee: "5500",
    date: "2025-07-03",
  },
  {
    key: 4,
    transectionId: "TXN20250723004",
    studentName: "Rafiul Islam",
    studentId: "STU1004",
    email: "rafiul.islam@example.com",
    fee: "4200",
    date: "2025-07-04",
  },
  {
    key: 5,
    transectionId: "TXN20250723005",
    studentName: "Sadia Jahan",
    studentId: "STU1005",
    email: "sadia.jahan@example.com",
    fee: "3200",
    date: "2025-07-05",
  },
  {
    key: 6,
    transectionId: "TXN20250723006",
    studentName: "Nahid Hossain",
    studentId: "STU1006",
    email: "nahid.hossain@example.com",
    fee: "2800",
    date: "2025-07-06",
  },
  {
    key: 7,
    transectionId: "TXN20250723007",
    studentName: "Meherun Nesa",
    studentId: "STU1007",
    email: "meherun.nesa@example.com",
    fee: "3100",
    date: "2025-07-07",
  },
  {
    key: 8,
    transectionId: "TXN20250723008",
    studentName: "Tanvir Rahman",
    studentId: "STU1008",
    email: "tanvir.rahman@example.com",
    fee: "5000",
    date: "2025-07-08",
  },
  {
    key: 9,
    transectionId: "TXN20250723009",
    studentName: "Jannatul Ferdous",
    studentId: "STU1009",
    email: "jannatul.ferdous@example.com",
    fee: "3900",
    date: "2025-07-09",
  },
  {
    key: 10,
    transectionId: "TXN20250723010",
    studentName: "Md. Imran Hossain",
    studentId: "STU1010",
    email: "imran.hossain@example.com",
    fee: "4700",
    date: "2025-07-10",
  },
  {
    key: 11,
    transectionId: "TXN20250723011",
    studentName: "Shamima Akter",
    studentId: "STU1011",
    email: "shamima.akter@example.com",
    fee: "3300",
    date: "2025-07-11",
  },
  {
    key: 12,
    transectionId: "TXN20250723012",
    studentName: "Rakibul Hasan",
    studentId: "STU1012",
    email: "rakibul.hasan@example.com",
    fee: "2900",
    date: "2025-07-12",
  },
  {
    key: 13,
    transectionId: "TXN20250723013",
    studentName: "Rumana Hoque",
    studentId: "STU1013",
    email: "rumana.hoque@example.com",
    fee: "5100",
    date: "2025-07-13",
  },
  {
    key: 14,
    transectionId: "TXN20250723014",
    studentName: "Adnan Karim",
    studentId: "STU1014",
    email: "adnan.karim@example.com",
    fee: "3400",
    date: "2025-07-14",
  },
  {
    key: 15,
    transectionId: "TXN20250723015",
    studentName: "Farzana Yesmin",
    studentId: "STU1015",
    email: "farzana.yesmin@example.com",
    fee: "4300",
    date: "2025-07-15",
  },
  {
    key: 16,
    transectionId: "TXN20250723016",
    studentName: "Aminul Islam",
    studentId: "STU1016",
    email: "aminul.islam@example.com",
    fee: "3600",
    date: "2025-07-16",
  },
  {
    key: 17,
    transectionId: "TXN20250723017",
    studentName: "Mim Akter",
    studentId: "STU1017",
    email: "mim.akter@example.com",
    fee: "3800",
    date: "2025-07-17",
  },
  {
    key: 18,
    transectionId: "TXN20250723018",
    studentName: "Mahfuzur Rahman",
    studentId: "STU1018",
    email: "mahfuzur.rahman@example.com",
    fee: "4900",
    date: "2025-07-18",
  },
  {
    key: 19,
    transectionId: "TXN20250723019",
    studentName: "Tanjina Akter",
    studentId: "STU1019",
    email: "tanjina.akter@example.com",
    fee: "3700",
    date: "2025-07-19",
  },
  {
    key: 20,
    transectionId: "TXN20250723020",
    studentName: "Sakib Al Hasan",
    studentId: "STU1020",
    email: "sakib.hasan@example.com",
    fee: "5200",
    date: "2025-07-20",
  },
];

const itemsPerPage = 15;
const total = 20;

const EnrollmentFees = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");

  // console.log(value);

  const pageSize = 15;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleModalClose = () => {
    setValue(null);
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Transection Id",
      dataIndex: "transectionId",
      key: "transectionId",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Student Id",
      dataIndex: "studentId",
      key: "studentId",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: "10px",

    //         paddingRight: 10,
    //       }}
    //     >
    //       <button
    //         className="flex justify-center items-center rounded-md"
    //         onClick={() => setValue(record)}
    //         style={{
    //           cursor: "pointer",
    //           border: "none",
    //           outline: "none",
    //           backgroundColor: "#121212",
    //           width: "40px",
    //           height: "32px",
    //         }}
    //       >
    //         <GoArrowUpRight size={26} className="text-secondary" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="w-full bg-[#13333A]">
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
              Enrollment Fees
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
      <SellingsDetailsModal value={value} handleModalClose={handleModalClose} />
    </div>
  );
};

export default EnrollmentFees;
