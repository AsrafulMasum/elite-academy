import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { FiEdit } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "../../redux/features/courseApi";
import moment from "moment";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import AddCourseModal from "../../Components/Dashboard/AddCourseModal";

const Courses = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const {
    data: courseData,
    isLoading,
    refetch,
  } = useGetCoursesQuery({ searchTerm, page });
  const [deleteCourse, { isLoading: deleting }] = useDeleteCourseMutation();

  const dropdownRef = useRef();

  // ----------------------- Action -------------------
  useEffect(() => {
    refetch();
  }, [searchParams]);

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

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCourse(deleteId).unwrap();

      if (res?.data) {
        toast.success("Course Delete successfully");
        setDeleteId("");
        setShowDelete(false);
        refetch();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // --------------------------- Table  Column -----------------------------
  const columns = [
    {
      title: "Sl. No",
      dataIndex: "serial",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Couch",
      key: "_id",
      align: "left",
      render: (record) => (
        <div className="flex items-center gap-3">
          <div style={{ height: 48, width: 48 }}>
            <img
              src={
                record?.couch?.image && record?.couch?.image?.startsWith("http")
                  ? record?.couch?.image
                  : record?.couch?.image
                  ? `${imageUrl}${record?.couch?.image}`
                  : "/default-avatar.jpg"
              }
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <span style={{ color: "#FDFDFD" }}>{record?.couch?.name}</span>
        </div>
      ),
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
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   align: "left",
    //   render: (text) => (
    //     <span style={{ color: "#FDFDFD" }}>
    //       {text?.length > 60 ? `${text?.slice(0, 30)}...` : text}
    //     </span>
    //   ),
    // },
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
              setOpenAddModel(true);
              setEditData(record);
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

          <div className="flex items-center gap-3">
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
            </div>
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
              rowKey="_id"
              dataSource={courseData?.data}
              loading={isLoading || deleting}
              pagination={{
                total: courseData?.pagination?.total,
                current: page,
                pageSize: courseData?.pagination?.limit,
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
        <AddCourseModal
          open={openAddModel}
          setOpenAddModel={setOpenAddModel}
          editData={editData}
          setEditData={setEditData}
          refetch={refetch}
        />
      </ConfigProvider>

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
            Do you want to delete this Course ?
          </p>
          <button
            onClick={handleDeleteCategory}
            className="bg-action py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;
