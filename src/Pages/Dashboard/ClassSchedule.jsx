import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { useGetSessionsQuery } from "../../redux/features/courseApi";
import moment from "moment";
import { Button } from "antd/es";
import { PlusOutlined } from "@ant-design/icons";
import AddSessionModal from "../../Components/Dashboard/AddSessionModal";

const ClassSchedule = () => {
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const limit = 15;
  const { data: sessionsData } = useGetSessionsQuery({ page, limit });
  const sessions = sessionsData?.data;

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
              setOpenEditModel(true);
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
      />
    </div>
  );
};

export default ClassSchedule;
