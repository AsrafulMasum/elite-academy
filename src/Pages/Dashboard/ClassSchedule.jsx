import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import { FiEdit } from "react-icons/fi";
import {
  useDeleteSessionMutation,
  useGetSessionsQuery,
} from "../../redux/features/courseApi";
import moment from "moment";
import { Button, Modal } from "antd/es";
import { PlusOutlined } from "@ant-design/icons";
import AddSessionModal from "../../Components/Dashboard/AddSessionModal";
import EditSessionModal from "../../Components/Dashboard/EditSessionModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

const ClassSchedule = () => {
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [value, setValue] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const limit = 12;
  const { data: sessionsData, refetch, isLoading } = useGetSessionsQuery({ page, limit });
  const sessions = sessionsData?.data;

  const [deleteSession] = useDeleteSessionMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteSession({ id: deleteId }).unwrap();
      if(res?.success) {
        toast.success(res?.message);
        refetch();
        setOpenDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      render: (_, record) => (
        <span className="text-[#FDFDFD]">{record?.title}</span>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (_, record) => (
        <span className="text-[#FDFDFD]">{record?.course?.name}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <span className="text-[#FDFDFD]">
          {moment(record?.date).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{`${moment(record?.startTime).format(
          "HH:mm"
        )} - ${moment(record?.endTime).format("HH:mm")}`}</span>
      ),
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
            onClick={() => {
              setValue(record);
              setOpenEditModal(true);
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
            <FiEdit size={16} className="text-secondary" />
          </button>
          <button
            className="flex justify-center items-center rounded-md"
            onClick={() => {
              {
                setDeleteId(record?._id);
                setOpenDeleteModal(true);
              }
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
            <RiDeleteBin6Line size={16} className="text-secondary" />
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
              Class Schedule
            </h3>
          </div>
          <div>
            <Button
              onClick={() => {
                setOpenAddModal(true);
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
              <span style={{ margin: 0 }}>Add Session</span>
            </Button>
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
              dataSource={sessions}
              rowKey="_id"
              loading={isLoading}
              pagination={{
                total: sessionsData?.pagination?.total,
                current: page,
                pageSize: limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <AddSessionModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        refetch={refetch}
      />
      <EditSessionModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        refetch={refetch}
        sessionData={value}
      />
      {/* delete modal */}
      <Modal
        centered
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this Session?
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

export default ClassSchedule;
