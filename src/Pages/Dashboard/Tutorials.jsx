import { useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { useGetTutorialsQuery } from "../../redux/features/courseApi";
import { PlusOutlined } from "@ant-design/icons";
import AddTutorialsModal from "../../Components/Dashboard/AddTutorialsModal";
import { imageUrl } from "../../redux/api/baseApi";

const itemsPerPage = 4;

const Tutorials = () => {
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data: tutorialsData } = useGetTutorialsQuery({
    page,
    limit: itemsPerPage,
  });
  console.log(tutorialsData);

  const columns = [
    {
      title: "Tutorials Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (_, record) => (
        <span className="text-[#FDFDFD]">{record?.course?.name}</span>
      ),
    },
    // {
    //   title: "Course Thumbnail",
    //   dataIndex: "courseThumbnail",
    //   key: "courseThumbnail",
    //   render: (_, record) => (
    //     <img
    //       src={
    //         record?.thumbnail && record?.thumbnail.startsWith("http")
    //           ? record?.thumbnail
    //           : record?.thumbnail
    //           ? `${imageUrl}${record?.thumbnail}`
    //           : "/default-avatar.png"
    //       }
    //       className="w-16 h-16 object-cover rounded-lg"
    //     />
    //   ),
    // },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (_, record) => (
        <video
          className="h-30 w-60"
          controls
          src={`${imageUrl}/video/${record?.video}`}
        />
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
              Tutorials
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
              <span style={{ margin: 0 }}>Add Tutorial</span>
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
              dataSource={tutorialsData?.data}
              pagination={{
                showSizeChanger: false,
                total: tutorialsData?.pagination?.total,
                current: page,
                pageSize: itemsPerPage,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <AddTutorialsModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
    </div>
  );
};

export default Tutorials;
