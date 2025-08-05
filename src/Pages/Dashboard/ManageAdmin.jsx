import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import provider from "../../assets/serviceProvider.png";
import { CiLock, CiUnlock } from "react-icons/ci";
import { PlusOutlined } from "@ant-design/icons";
import AddAdminModal from "../../Components/Dashboard/AddAdminModal";
import {
  useGetAdminQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";
import { imageUrl } from "../../redux/api/baseApi";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const limit = 10;

const ManageAdmin = () => {
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const {
    data: adminData,
    isLoading,
    refetch,
  } = useGetAdminQuery({ searchTerm, page });
  const [lockUser, { isLoading: updating }] = useLockUserMutation();

  const [showActive, setShowActive] = useState(false);
  const [selectAdmin, setSelectAdmin] = useState("");

  const UserType = [
    { value: "Normal User", label: "Normal User" },
    { value: "Subscribed User", label: "Subscribed User" },
  ];

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
      title: "Admin Name",
      key: "adminName",
      dataIndex: "adminName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div style={{ height: 48, width: 48 }}>
            <img
              src={
                record?.image && record?.image?.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/default-avatar.jpg"
              }
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <span style={{ color: "#FDFDFD" }}>{record?.name}</span>
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "role",
      key: "role",
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
          <div>
            <button
              className="flex justify-center items-center rounded-md"
              onClick={() => {
                setShowActive(true);
                setSelectAdmin(record?._id);
              }}
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

  // ----------------------- Action -------------------

  // Handle search input change
  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set("searchTerm", newValue);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
  };

  const handleLockAdmin = async () => {
    try {
      const res = await lockUser({ id: selectAdmin });

      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setShowActive(false);
      }
    } catch (error) {
      setShowActive(false);
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
              rowKey="_id"
              columns={columns}
              dataSource={adminData?.data}
              loading={isLoading || updating}
              pagination={{
                total: adminData?.pagination?.total,
                current: page,
                pageSize: adminData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#13333A",
          },
        }}
      >
        <AddAdminModal
          openAddModel={openAddModel}
          setOpenAddModel={setOpenAddModel}
          refetch={refetch}
        />
      </ConfigProvider>

      <Modal
        centered
        open={showActive}
        onCancel={() => setShowActive(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleLockAdmin}
            className="bg-action py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAdmin;
