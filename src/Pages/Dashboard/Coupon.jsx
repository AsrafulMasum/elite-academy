import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

const Coupon = () => {
  const [openAddModal, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(1);

  const coupons = [
    {
      _id: "1",
      code: "MASUM10",
      discount: "10%",
      expiresAt: "2025-12-31",
    },
    {
      _id: "2",
      code: "SAVE50",
      discount: "50%",
      expiresAt: "2025-11-01",
    },
  ];

  const handleDelete = (id) => {
    toast.success("Coupon deleted");
    setShowDelete(false);
    setDeleteId("");
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Expires Date",
      dataIndex: "expiresAt",
      key: "expiresAt",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2 pr-4">
          <button
            onClick={() => {
              setSelectedCoupon(record);
              setOpenEditModal(true);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md bg-[#121212]"
          >
            <FiEdit size={16} className="text-secondary" />
          </button>
          <button
            onClick={() => {
              setDeleteId(record._id);
              setShowDelete(true);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md bg-[#121212]"
          >
            <RiDeleteBin6Line size={20} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-[#13333A]">
      <div style={{ borderRadius: "8px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mx-4 py-4">
          <h3 className="text-[#FDFDFD] text-[18px] font-medium leading-[24px]">
            Coupons
          </h3>
          <Button
            onClick={() => setOpenAddModel(true)}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#2E7A8A",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            Add Coupon
          </Button>
        </div>

        {/* Table */}
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
            dataSource={coupons}
            columns={columns}
            pagination={{
              current: page,
              pageSize: 10,
              total: coupons.length,
              onChange: (page) => setPage(page),
            }}
          />
        </ConfigProvider>
      </div>

      {/* Delete Modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] font-semibold">Are you sure!</p>
          <p className="pt-4 pb-12">Do you want to delete this coupon?</p>
          <button
            onClick={() => handleDelete(deleteId)}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Add/Edit Coupon Modals can be added here */}
    </div>
  );
};

export default Coupon;
