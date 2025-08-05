import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const data = [
  {
    _id: "1",
    serial: 1,
    category: "Dental care",
  },
  {
    _id: "2",
    serial: 2,
    category: "Dental care",
  },
  {
    _id: "3",
    serial: 3,
    category: "Dental care",
  },
  {
    _id: "4",
    serial: 4,
    category: "Dental care",
  },
  {
    _id: "5",
    serial: 5,
    category: "Dental care",
  },
  {
    _id: "6",
    serial: 6,
    category: "Dental care",
  },
  {
    _id: "7",
    serial: 7,
    category: "Dental care",
  },
  {
    _id: "8",
    serial: 8,
    category: "Dental care",
  },
  {
    _id: "9",
    serial: 9,
    category: "Dental care",
  },
  {
    _id: "10",
    serial: 10,
    category: "Dental care",
  },
  {
    _id: "11",
    serial: 11,
    category: "Dental care",
  },
  {
    _id: "12",
    serial: 12,
    category: "Dental care",
  },
  {
    _id: "13",
    serial: 13,
    category: "Dental care",
  },
  {
    _id: "14",
    serial: 14,
    category: "Dental care",
  },
  {
    _id: "15",
    serial: 1,
    category: "Dental care",
  },
];

const SubCategory = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editID, setEditID] = useState("");

  const dropdownRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      setOpenEditModal(false);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleDelete = () => {
    console.log(deleteId);
    setShowDelete(false);
  };

  const columns = [
    {
      title: "Sl. No",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      width: "100px",
      render: (text) => <span style={{ color: "#FDFDFD" }}>#{text}</span>,
    },
    {
      title: "Sub Category Name",
      dataIndex: "category",
      key: "category",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "right",
      className: "action-column",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            paddingRight: "46px",
          }}
        >
          <button
            onClick={() => {
              setOpenEditModal(true);
              setEditID(record?._id);
            }}
            className="bg-[#000000] w-10 h-8 flex justify-center items-center rounded-md"
          >
            <FiEdit size={20} className="text-secondary" />
          </button>

          <button
            onClick={() => {
              setShowDelete(true);
              setDeleteId(record?._id);
            }}
            className="bg-[#000000] w-10 h-8 flex justify-center items-center rounded-md"
          >
            <RiDeleteBin6Line size={20} className="text-secondary" />
          </button>
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

  const pageSize = 12;
  const total = 20;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="h-full">
      <div
        style={{
          background: "#13333A",
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px",
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
            Add Sub Category
          </h3>

          <div>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "200px",
                height: "40px",
                boxShadow: "0px 2px 4px 0px #0000001A",
                backgroundColor: "#2E7A8A",
                border: "none",
                transition: "none",
                color: "#FDFDFD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span style={{ margin: 0 }}>Add Sub Category</span>
            </Button>
          </div>
        </div>
        <div className="relative">
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
                pageSize: pageSize,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <UserDetailsModal open={open} setOpen={setOpen} />

      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          setOpenAddModel(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-black text-xl"
            style={{ marginBottom: "12px" }}
          >
            {`Add Category`}
          </h1>

          <Form form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleAddCategory}
                className="bg-[#BB6D42] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                Add Category
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        centered
        open={openEditModal}
        onCancel={() => {
          setOpenEditModal(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-black text-xl"
            style={{ marginBottom: "12px" }}
          >
            {`Edit Category`}
          </h1>

          <Form form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleUpdate}
                className="bg-[#BB6D42] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                Edit Category
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
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
            onClick={handleDelete}
            className="bg-[#BB6D42] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SubCategory;
