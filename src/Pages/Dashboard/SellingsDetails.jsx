import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { useGetSellingListQuery } from "../../redux/features/paymentApi";
import { imageUrl } from "../../redux/api/baseApi";
import { IoDownloadOutline } from "react-icons/io5";
import moment from "moment";

const limit = 12;

const SellingsDetails = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { data: sellingList } = useGetSellingListQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDownload = (record) => {
    if (record?.invoice) {
      const link = document.createElement("a");
      link.href = record.invoice;
      link.setAttribute("download", "");
      link.click();
    } else {
      toast.error("Invoice not available.");
    }
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Order Id",
      dataIndex: "orderid",
      key: "orderid",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Product Images",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => {
        return (
          <div className="flex gap-1">
            {record?.orderItems?.map((item) => (
              <img
                key={item?._id}
                src={
                  item?.image && item?.image.startsWith("http")
                    ? item?.image
                    : item?.image
                    ? `${imageUrl}${item?.image}`
                    : "/default-avatar.jpg"
                }
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
      title: "Contact No.",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
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
            onClick={() => handleDownload(record)}
            className="flex justify-center items-center rounded-md pb-1"
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              backgroundColor: "#121212",
              width: "40px",
              height: "32px",
            }}
          >
            <IoDownloadOutline size={26} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-[#13333A]">
      <div
        style={{
          borderRadius: "8px",
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
            Sellings Details
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "353px",
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
              rowKey="_id"
              columns={columns}
              dataSource={sellingList?.data}
              pagination={{
                total: sellingList?.pagination?.total,
                current: page,
                pageSize: limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default SellingsDetails;
