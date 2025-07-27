import { useState } from "react";
import { ConfigProvider, Input, Modal, Table } from "antd";
import Logo from "../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiLock, CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useGetStudentsQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";

const itemsPerPage = 10;
const total = 50;

const StudentLists = () => {
  const [page, setPage] = useState(1);
  const [lock, setLock] = useState("");
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { data: userData } = useGetStudentsQuery(searchText);
  const [lockUser] = useLockUserMutation();

  const columns = [
    {
      title: "Student Id",
      dataIndex: "studentId",
      key: "studentId",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "user",
      key: "user",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={
                record?.image && record?.image.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/default-avatar.png"
              }
              className="w-10 h-10 object-cover rounded-full"
            />

            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
                color: "#FDFDFD",
              }}
            >
              {record?.name}
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
      title: "Contact No.",
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
          <button
            className="flex justify-center items-center rounded-md"
            onClick={() => setValue(record)}
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
              onClick={() => setLock(record?._id)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "#121212",
                width: "40px",
                height: "32px",
              }}
            >
              {record?.status === "active" ? (
                <CiUnlock size={26} className="text-secondary" />
              ) : (
                <CiLock size={26} className="text-[#FF0000]" />
              )}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const res = await lockUser({ id });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
              Student Lists
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
              dataSource={userData?.data}
              rowKey="_id"
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
      <UserDetailsModal value={value} setValue={setValue} />
      <Modal
        centered
        open={lock}
        onCancel={() => setLock(null)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentLists;
