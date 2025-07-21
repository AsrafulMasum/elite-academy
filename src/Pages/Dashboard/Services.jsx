import { useEffect, useRef, useState } from "react";
import { Avatar, Input, Pagination, Select, Table } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo.png";
import { FiArrowUpRight, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import providerIcon from "../../assets/providerIcon.png";

const data = [
  {
    key: "1",
    serial: "500",
    name: "Nguyen, Shane",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 4, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    key: "2",
    serial: "499",
    name: "Flores, Juanita",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 5, 2024 (10:00am–4:00pm)",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    key: "3",
    serial: "498",
    name: "Nguyen, Shane",
    occupation: "Dental Assistant",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 6, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    key: "4",
    serial: "497",
    name: "Henry, Arthur",
    occupation: "Dental Hygienist",
    bookingSystem: "Confirm Booking System",
    price: 20,
    dayTime: "Aug 7, 2024 (11:00am–5:00pm)",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    key: "5",
    serial: "496",
    name: "Black, Marvin",
    occupation: "Dental Hygienist",
    bookingSystem: "Confirm Booking System",
    price: 20,
    dayTime: "Aug 8, 2024 (8:00am–2:00pm)",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    key: "6",
    serial: "495",
    name: "Cooper, Kristin",
    occupation: "Dental Assistant",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 9, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    key: "7",
    serial: "494",
    name: "Miles, Esther",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 10, 2024 (10:00am–4:00pm)",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    key: "8",
    serial: "493",
    name: "Smith, John",
    occupation: "Dental Assistant",
    bookingSystem: "Confirm Booking System",
    price: 25,
    dayTime: "Aug 11, 2024 (8:30am–2:30pm)",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    key: "9",
    serial: "492",
    name: "Johnson, Mary",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 22,
    dayTime: "Aug 12, 2024 (9:30am–3:30pm)",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
  },
  {
    key: "10",
    serial: "491",
    name: "Williams, James",
    occupation: "Dental Assistant",
    bookingSystem: "Confirm Booking System",
    price: 20,
    dayTime: "Aug 13, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    key: "11",
    serial: "490",
    name: "Brown, Patricia",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 23,
    dayTime: "Aug 14, 2024 (10:00am–4:00pm)",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    key: "12",
    serial: "489",
    name: "Jones, Robert",
    occupation: "Dental Assistant",
    bookingSystem: "Instant Booking System",
    price: 21,
    dayTime: "Aug 15, 2024 (8:00am–2:00pm)",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
  },
  {
    key: "13",
    serial: "488",
    name: "Garcia, Linda",
    occupation: "Dental Hygienist",
    bookingSystem: "Confirm Booking System",
    price: 24,
    dayTime: "Aug 16, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
  },
  {
    key: "14",
    serial: "487",
    name: "Miller, Michael",
    occupation: "Dental Assistant",
    bookingSystem: "Instant Booking System",
    price: 20,
    dayTime: "Aug 17, 2024 (10:00am–4:00pm)",
    image: "https://randomuser.me/api/portraits/men/82.jpg",
  },
  {
    key: "15",
    serial: "486",
    name: "Davis, Barbara",
    occupation: "Dental Hygienist",
    bookingSystem: "Confirm Booking System",
    price: 22,
    dayTime: "Aug 18, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
  },
  {
    key: "16",
    serial: "485",
    name: "Rodriguez, William",
    occupation: "Dental Assistant",
    bookingSystem: "Instant Booking System",
    price: 21,
    dayTime: "Aug 19, 2024 (8:00am–2:00pm)",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
  },
  {
    key: "17",
    serial: "484",
    name: "Martinez, Elizabeth",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 23,
    dayTime: "Aug 20, 2024 (9:30am–3:30pm)",
    image: "https://randomuser.me/api/portraits/women/92.jpg",
  },
  {
    key: "18",
    serial: "483",
    name: "Hernandez, Charles",
    occupation: "Dental Assistant",
    bookingSystem: "Confirm Booking System",
    price: 20,
    dayTime: "Aug 21, 2024 (10:00am–4:00pm)",
    image: "https://randomuser.me/api/portraits/men/95.jpg",
  },
  {
    key: "19",
    serial: "482",
    name: "Lopez, Jennifer",
    occupation: "Dental Hygienist",
    bookingSystem: "Instant Booking System",
    price: 24,
    dayTime: "Aug 22, 2024 (9:00am–3:00pm)",
    image: "https://randomuser.me/api/portraits/women/98.jpg",
  },
  {
    key: "20",
    serial: "481",
    name: "Gonzalez, Thomas",
    occupation: "Dental Assistant",
    bookingSystem: "Confirm Booking System",
    price: 22,
    dayTime: "Aug 23, 2024 (8:00am–2:00pm)",
    image: "https://randomuser.me/api/portraits/men/99.jpg",
  },
];

const Services = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
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
      title: "Providers Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={record.image} size={40} shape="square" />
          <span className="text-[#636363]">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      render: (text) => <span style={{ color: "#636363" }}>{text}</span>,
    },
    {
      title: "Booking System",
      dataIndex: "bookingSystem",
      key: "bookingSystem",
      render: (text) => <span style={{ color: "#636363" }}>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span style={{ color: "#636363" }}>{price}$/hour</span>
      ),
    },
    {
      title: "Day & time",
      dataIndex: "dayTime",
      key: "dayTime",
      render: (text) => (
        <span
          style={{
            color: "#A1A1A1",
            backgroundColor: "#F4F4F4",
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          {text}
        </span>
      ),
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
              All Services
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

export default Services;
