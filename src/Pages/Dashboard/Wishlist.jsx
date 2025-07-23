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
    userId: "USR1001",
    userName: "Ayesha Siddiqua",
    email: "ayesha.siddiqua@example.com",
    contact: "+8801700000001",
    productId: "P1001",
    productName: "Wireless Mouse",
  },
  {
    key: 2,
    userId: "USR1002",
    userName: "Hasan Mahmud",
    email: "hasan.mahmud@example.com",
    contact: "+8801700000002",
    productId: "P1002",
    productName: "Mechanical Keyboard",
  },
  {
    key: 3,
    userId: "USR1003",
    userName: "Fatima Khatun",
    email: "fatima.khatun@example.com",
    contact: "+8801700000003",
    productId: "P1003",
    productName: "Laptop Stand",
  },
  {
    key: 4,
    userId: "USR1004",
    userName: "Rafiul Islam",
    email: "rafiul.islam@example.com",
    contact: "+8801700000004",
    productId: "P1004",
    productName: "Bluetooth Speaker",
  },
  {
    key: 5,
    userId: "USR1005",
    userName: "Sadia Jahan",
    email: "sadia.jahan@example.com",
    contact: "+8801700000005",
    productId: "P1005",
    productName: "USB-C Hub",
  },
  {
    key: 6,
    userId: "USR1006",
    userName: "Nahid Hossain",
    email: "nahid.hossain@example.com",
    contact: "+8801700000006",
    productId: "P1006",
    productName: "Smart Watch",
  },
  {
    key: 7,
    userId: "USR1007",
    userName: "Meherun Nesa",
    email: "meherun.nesa@example.com",
    contact: "+8801700000007",
    productId: "P1007",
    productName: "Graphic Tablet",
  },
  {
    key: 8,
    userId: "USR1008",
    userName: "Tanvir Rahman",
    email: "tanvir.rahman@example.com",
    contact: "+8801700000008",
    productId: "P1008",
    productName: "Noise Cancelling Headphones",
  },
  {
    key: 9,
    userId: "USR1009",
    userName: "Jannatul Ferdous",
    email: "jannatul.ferdous@example.com",
    contact: "+8801700000009",
    productId: "P1009",
    productName: "4K Monitor",
  },
  {
    key: 10,
    userId: "USR1010",
    userName: "Md. Imran Hossain",
    email: "imran.hossain@example.com",
    contact: "+8801700000010",
    productId: "P1010",
    productName: "Portable SSD",
  },
  {
    key: 11,
    userId: "USR1011",
    userName: "Shamima Akter",
    email: "shamima.akter@example.com",
    contact: "+8801700000011",
    productId: "P1011",
    productName: "Smartphone Gimbal",
  },
  {
    key: 12,
    userId: "USR1012",
    userName: "Rakibul Hasan",
    email: "rakibul.hasan@example.com",
    contact: "+8801700000012",
    productId: "P1012",
    productName: "Wireless Charger",
  },
  {
    key: 13,
    userId: "USR1013",
    userName: "Rumana Hoque",
    email: "rumana.hoque@example.com",
    contact: "+8801700000013",
    productId: "P1013",
    productName: "LED Desk Lamp",
  },
  {
    key: 14,
    userId: "USR1014",
    userName: "Adnan Karim",
    email: "adnan.karim@example.com",
    contact: "+8801700000014",
    productId: "P1014",
    productName: "Laptop Cooling Pad",
  },
  {
    key: 15,
    userId: "USR1015",
    userName: "Farzana Yesmin",
    email: "farzana.yesmin@example.com",
    contact: "+8801700000015",
    productId: "P1015",
    productName: "Portable Projector",
  },
  {
    key: 16,
    userId: "USR1016",
    userName: "Aminul Islam",
    email: "aminul.islam@example.com",
    contact: "+8801700000016",
    productId: "P1016",
    productName: "Gaming Mousepad",
  },
  {
    key: 17,
    userId: "USR1017",
    userName: "Mim Akter",
    email: "mim.akter@example.com",
    contact: "+8801700000017",
    productId: "P1017",
    productName: "Tripod Stand",
  },
  {
    key: 18,
    userId: "USR1018",
    userName: "Mahfuzur Rahman",
    email: "mahfuzur.rahman@example.com",
    contact: "+8801700000018",
    productId: "P1018",
    productName: "Smart Light Bulb",
  },
  {
    key: 19,
    userId: "USR1019",
    userName: "Tanjina Akter",
    email: "tanjina.akter@example.com",
    contact: "+8801700000019",
    productId: "P1019",
    productName: "VR Headset",
  },
  {
    key: 20,
    userId: "USR1020",
    userName: "Sakib Al Hasan",
    email: "sakib.hasan@example.com",
    contact: "+8801700000020",
    productId: "P1020",
    productName: "Wireless Earbuds",
  },
];

const itemsPerPage = 15;
const total = 20;

const Wishlist = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Contact No.",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
  ];


  const pageSize = 15;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

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
          <div>
            <h3
              style={{
                color: "#FDFDFD",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Wishlist
            </h3>
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
    </div>
  );
};

export default Wishlist;
