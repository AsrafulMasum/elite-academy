import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import SellingsDetailsModal from "../../Components/Dashboard/SellingsDetailsModal";
import { useGetEnrollmentFeeListQuery } from "../../redux/features/paymentApi";
import moment from "moment";
import { IoDownloadOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const limit = 12;

const EnrollmentFees = () => {
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: enrollmentFees, isLoading } = useGetEnrollmentFeeListQuery({
    page,
    limit,
    searchTerm: searchText,
  });

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
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Transection Id",
      dataIndex: "transectionId",
      key: "transectionId",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.trxId}</span>
      ),
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.member?.name}</span>
      ),
    },
    {
      title: "Student Id",
      dataIndex: "studentId",
      key: "studentId",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {record?.member?.studentId || "N/A"}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.member?.email}</span>
      ),
    },
    {
      title: "Fee",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span style={{ color: "#FDFDFD" }}>$ {text}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
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
              columns={columns}
              dataSource={enrollmentFees?.data}
              rowKey="_id"
              loading={isLoading}
              pagination={{
                total: enrollmentFees?.pagination?.total,
                current: page,
                pageSize: limit,
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
