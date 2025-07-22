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
    orderId: "ORD-1001",
    items: [
      {
        _id: "p1",
        product: {
          image: "https://images.unsplash.com/photo-1606813902914-9439ec3b3c4a", // Sneakers
        },
      },
      {
        _id: "p2",
        product: {
          image: "https://images.unsplash.com/photo-1580910051070-dc9f66fdb9f0", // Sunglasses
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud1@example.com",
    orderDate: "2025-07-01",
    deliveryDate: "2025-07-05",
    status: "Pending",
  },
  {
    key: 2,
    orderId: "ORD-1002",
    items: [
      {
        _id: "p3",
        product: {
          image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", // Apple
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud2@example.com",
    orderDate: "2025-07-02",
    deliveryDate: "2025-07-06",
    status: "Delivered",
  },
  {
    key: 3,
    orderId: "ORD-1003",
    items: [
      {
        _id: "p4",
        product: {
          image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642", // Headphones
        },
      },
      {
        _id: "p5",
        product: {
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", // Smartwatch
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud3@example.com",
    orderDate: "2025-07-03",
    deliveryDate: "2025-07-07",
    status: "Cancelled",
  },
  {
    key: 4,
    orderId: "ORD-1004",
    items: [
      {
        _id: "p6",
        product: {
          image: "https://images.unsplash.com/photo-1616627987230-5ecb7be11b20", // Camera
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud4@example.com",
    orderDate: "2025-07-04",
    deliveryDate: "2025-07-08",
    status: "Delivered",
  },
  {
    key: 5,
    orderId: "ORD-1005",
    items: [
      {
        _id: "p7",
        product: {
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", // Watch
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud5@example.com",
    orderDate: "2025-07-05",
    deliveryDate: "2025-07-09",
    status: "Pending",
  },
  {
    key: 6,
    orderId: "ORD-1006",
    items: [
      {
        _id: "p8",
        product: {
          image: "https://images.unsplash.com/photo-1539874754764-5a965591ceb3", // Backpack
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud6@example.com",
    orderDate: "2025-07-06",
    deliveryDate: "2025-07-10",
    status: "Pending",
  },
  {
    key: 7,
    orderId: "ORD-1007",
    items: [
      {
        _id: "p9",
        product: {
          image: "https://images.unsplash.com/photo-1542293787938-c9e299b880ed", // Perfume
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud7@example.com",
    orderDate: "2025-07-07",
    deliveryDate: "2025-07-11",
    status: "Delivered",
  },
  {
    key: 8,
    orderId: "ORD-1008",
    items: [
      {
        _id: "p10",
        product: {
          image: "https://images.unsplash.com/photo-1614285737453-0668abfa869c", // Laptop
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud8@example.com",
    orderDate: "2025-07-08",
    deliveryDate: "2025-07-12",
    status: "Pending",
  },
  {
    key: 9,
    orderId: "ORD-1009",
    items: [
      {
        _id: "p11",
        product: {
          image: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622", // Shoes
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud9@example.com",
    orderDate: "2025-07-09",
    deliveryDate: "2025-07-13",
    status: "Delivered",
  },
  {
    key: 10,
    orderId: "ORD-1010",
    items: [
      {
        _id: "p12",
        product: {
          image: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5", // Clothes
        },
      },
    ],
    user: {
      name: "Mr. Mahmud",
      img: <img src={provider} height={46} width={46} />,
    },
    email: "mahmud10@example.com",
    orderDate: "2025-07-10",
    deliveryDate: "2025-07-14",
    status: "Cancelled",
  },
];



const itemsPerPage = 10;
const total = 20;

const SellingsDetails = () => {
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
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Product Images",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => {
        return (
          <div className="flex gap-1">
            {record?.items?.map((item) => (
              <img
                key={item?._id}
                src={item?.product?.image}
                // src={
                //   item?.product?.image &&
                //   item?.product?.image.startsWith("http")
                //     ? item?.product?.image
                //     : item?.product?.image
                //     ? `${imageUrl}${item?.product?.image}`
                //     : "/default-avatar.png"
                // }
                alt={`Product ${item?._id}`}
                className="w-8 h-8 object-cover rounded border border-[#3F857B]"
              />
            ))}
          </div>
        );
      },
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
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
              User Lists
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

export default SellingsDetails;
