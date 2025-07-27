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
    courseName: "Beginner Football Skills",
    courseId: "FTB101",
    startTime: "2025-08-01T08:00:00",
    endTime: "2025-08-01T09:30:00",
  },
  {
    _id: "2",
    serial: 2,
    courseName: "Intermediate Dribbling Techniques",
    courseId: "FTB102",
    startTime: "2025-08-02T10:00:00",
    endTime: "2025-08-02T11:30:00",
  },
  {
    _id: "3",
    serial: 3,
    courseName: "Advanced Striker Training",
    courseId: "FTB103",
    startTime: "2025-08-03T12:00:00",
    endTime: "2025-08-03T13:30:00",
  },
  {
    _id: "4",
    serial: 4,
    courseName: "Goalkeeper Masterclass",
    courseId: "FTB104",
    startTime: "2025-08-04T14:00:00",
    endTime: "2025-08-04T15:30:00",
  },
  {
    _id: "5",
    serial: 5,
    courseName: "Defensive Tactics & Positioning",
    courseId: "FTB105",
    startTime: "2025-08-05T16:00:00",
    endTime: "2025-08-05T17:30:00",
  },
  {
    _id: "6",
    serial: 6,
    courseName: "Passing and Ball Control",
    courseId: "FTB106",
    startTime: "2025-08-06T09:00:00",
    endTime: "2025-08-06T10:30:00",
  },
  {
    _id: "7",
    serial: 7,
    courseName: "Speed and Agility Training",
    courseId: "FTB107",
    startTime: "2025-08-07T06:00:00",
    endTime: "2025-08-07T07:30:00",
  },
  {
    _id: "8",
    serial: 8,
    courseName: "Tactical Awareness for Midfielders",
    courseId: "FTB108",
    startTime: "2025-08-08T11:00:00",
    endTime: "2025-08-08T12:30:00",
  },
  {
    _id: "9",
    serial: 9,
    courseName: "Teamwork and Communication",
    courseId: "FTB109",
    startTime: "2025-08-09T13:00:00",
    endTime: "2025-08-09T14:30:00",
  },
  {
    _id: "10",
    serial: 10,
    courseName: "Football Fitness Bootcamp",
    courseId: "FTB110",
    startTime: "2025-08-10T15:00:00",
    endTime: "2025-08-10T16:30:00",
  },
  {
    _id: "11",
    serial: 11,
    courseName: "Set Piece Mastery",
    courseId: "FTB111",
    startTime: "2025-08-11T17:00:00",
    endTime: "2025-08-11T18:30:00",
  },
  {
    _id: "12",
    serial: 12,
    courseName: "Crossing and Finishing",
    courseId: "FTB112",
    startTime: "2025-08-12T08:00:00",
    endTime: "2025-08-12T09:30:00",
  },
  {
    _id: "13",
    serial: 13,
    courseName: "One-on-One Defense",
    courseId: "FTB113",
    startTime: "2025-08-13T10:00:00",
    endTime: "2025-08-13T11:30:00",
  },
  {
    _id: "14",
    serial: 14,
    courseName: "Vision and Game Intelligence",
    courseId: "FTB114",
    startTime: "2025-08-14T12:00:00",
    endTime: "2025-08-14T13:30:00",
  },
  {
    _id: "15",
    serial: 15,
    courseName: "Strength & Conditioning for Football",
    courseId: "FTB115",
    startTime: "2025-08-15T14:00:00",
    endTime: "2025-08-15T15:30:00",
  },
  {
    _id: "16",
    serial: 16,
    courseName: "Youth Football Academy",
    courseId: "FTB116",
    startTime: "2025-08-16T16:00:00",
    endTime: "2025-08-16T17:30:00",
  },
  {
    _id: "17",
    serial: 17,
    courseName: "Pro Level Tryout Prep",
    courseId: "FTB117",
    startTime: "2025-08-17T18:00:00",
    endTime: "2025-08-17T19:30:00",
  },
  {
    _id: "18",
    serial: 18,
    courseName: "Elite Footwork Techniques",
    courseId: "FTB118",
    startTime: "2025-08-18T09:00:00",
    endTime: "2025-08-18T10:30:00",
  },
  {
    _id: "19",
    serial: 19,
    courseName: "Off-the-Ball Movement",
    courseId: "FTB119",
    startTime: "2025-08-19T11:00:00",
    endTime: "2025-08-19T12:30:00",
  },
  {
    _id: "20",
    serial: 20,
    courseName: "Leadership for Team Captains",
    courseId: "FTB120",
    startTime: "2025-08-20T13:00:00",
    endTime: "2025-08-20T14:30:00",
  },
];

const Courses = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editID, seteditID] = useState("");

  const dropdownRef = useRef();
  const [form] = Form.useForm();

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
      dataIndex: "courseName",
      key: "courseName",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Course Id",
      dataIndex: "courseId",
      key: "courseId",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
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
