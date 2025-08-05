import { useState } from "react";
import { Button, ConfigProvider, Input, Select, Table, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import {
  useChangeOrderStatusMutation,
  useGetSellingListQuery,
} from "../../redux/features/paymentApi";
import { imageUrl } from "../../redux/api/baseApi";
import { IoDownloadOutline } from "react-icons/io5";
import moment from "moment";
import toast from "react-hot-toast";

const limit = 10;

const SellingsDetails = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const {
    data: sellingList,
    refetch,
    isLoading,
  } = useGetSellingListQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "packing", label: "Packing" },
    { value: "shipping", label: "Shipping" },
    { value: "cancelled", label: "Cancelled" },
    { value: "delivered", label: "Delivered" },
  ];

  const statusColorMap = {
    pending: { color: "#D48806", bg: "#F7F1CC" },
    packing: { color: "#1890FF", bg: "#D9EEFF" },
    shipping: { color: "#13C2C2", bg: "#CCFAF9" },
    cancelled: { color: "#FF4D4F", bg: "#FFD8D7" },
    delivered: { color: "#52C41A", bg: "#D9F2CD" },
  };

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
                className="w-10 h-10 object-cover rounded border border-[#3F857B]"
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
      render: (status, record) => {
        const currentStyle = statusColorMap[status] || {
          color: "#595959",
          bg: "#FAFAFA",
        };

        return (
          <select
            value={status}
            onChange={async (e) => {
              const newStatus = e.target.value;

              const data = {
                orderId: record._id,
                status: { status: newStatus },
              };
              try {
                const res = await changeOrderStatus({ data }).unwrap();
                if (res?.success) {
                  refetch();
                  toast.success(res?.message);
                }
              } catch (error) {
                console.error("Failed to update status", error);
                toast.error(error?.data?.message);
              }
            }}
            style={{
              backgroundColor: currentStyle.bg,
              color: currentStyle.color,
              fontWeight: 500,
              borderRadius: 6,
              fontSize: 13,
              width: 120,
              height: 28,
              padding: "0 8px",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              outline: "none",
            }}
          >
            {statusOptions.map(({ value, label }) => (
              <option key={value} value={value} style={{ textAlign: "center" }}>
                {label}
              </option>
            ))}
          </select>
        );
      },
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
              loading={isLoading}
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
