import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetCoursesQuery } from "../../redux/features/courseApi";
import moment from "moment";
import { imageUrl } from "../../redux/api/baseApi";

const Courses = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editID, seteditID] = useState("");
  const { data: courseData, isLoading } = useGetCoursesQuery();

  const dropdownRef = useRef();
  const [form] = Form.useForm();

  // ----------------------- Action -------------------

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

  // --------------------------- Table  Column -----------------------------
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
      title: "Course Name",
      // dataIndex: "name",
      key: "name",
      align: "left",
      render: (record) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12">
            <img
              src={`${imageUrl}${record?.image}`}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <span style={{ color: "#FDFDFD" }}>{record?.name}</span>
        </div>
      ),
    },
    {
      title: "Couch",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startDate",
      key: "startDate",
      align: "left",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>{moment(text).format("L")}</span>
      ),
    },
    {
      title: "End Time",
      dataIndex: "endDate",
      key: "endDate",
      align: "left",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>{moment(text).format("L")}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "left",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>
          {text.length > 60 ? `${text.slice(0, 60)}...` : text}
        </span>
      ),
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
              seteditID(record?._id);
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

  console.log("courseData", courseData);

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
            Add Course
          </h3>

          <div>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "151px",
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
              <span style={{ margin: 0 }}>Add Course</span>
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
              dataSource={courseData?.data}
              loading={isLoading}
              // pagination={{
              //   total: total,
              //   current: page,
              //   pageSize: pageSize,
              //   onChange: (page) => setPage(page),
              // }}
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
                className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
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

export default Courses;
