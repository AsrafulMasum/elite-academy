import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { CiLock, CiUnlock } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useGetStudentsQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";
import toast from "react-hot-toast";
import { IoInformationCircleOutline } from "react-icons/io5";
import {
  useEnrollStudentMutation,
  useGetCoursesQuery,
} from "../../redux/features/courseApi";

const StudentLists = () => {
  const [page, setPage] = useState(1);
  const [lock, setLock] = useState("");
  const [value, setValue] = useState(null);
  const [student, setStudent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const {
    data: userData,
    refetch,
    isLoading,
  } = useGetStudentsQuery({ searchText, page });
  const { data: courses } = useGetCoursesQuery({});

  const [lockUser] = useLockUserMutation();
  const [enrollStudent] = useEnrollStudentMutation();

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
                  : "/default-avatar.jpg"
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
      title: "Enroll",
      dataIndex: "enroll",
      key: "enroll",
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
              setStudent(record);
              setShowEnrollModal(true);
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
            <GoArrowUpRight size={26} className="text-secondary" />
          </button>
        </div>
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
            <IoInformationCircleOutline size={26} className="text-secondary" />
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

  const handleDelete = async () => {
    try {
      const res = await lockUser({ id: lock });
      if (res?.data?.success) {
        refetch();
        setLock("");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async () => {
    if (!selectedCourse || !student?._id) {
      toast.error("Please select a course");
      return;
    }
    const data = {
      user: student._id,
      course: selectedCourse,
    };
    try {
      const res = await enrollStudent({ data });
      if (res?.data?.success) {
        toast.success("Student enrolled successfully");
        setShowEnrollModal(false);
        setSelectedCourse(null);
        setValue(null);
      } else {
        toast.error(res?.error?.data?.message || "Enrollment failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
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
              loading={isLoading}
              pagination={{
                total: userData?.pagination?.total,
                current: page,
                pageSize: userData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <UserDetailsModal value={value} setValue={setValue} />

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#13333A",
          },
        }}
      >
        <Modal
          centered
          open={showEnrollModal}
          onCancel={() => {
            setShowEnrollModal(false);
            setSelectedCourse(null);
            setValue(null);
          }}
          footer={false}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Enroll Student</h2>
            <p className="text-[#6D6D6D] pb-2">Select Course</p>
            <Select
              style={{ width: "100%", marginBottom: "20px", height: "52px" }}
              placeholder="Select a course"
              onChange={(val) => setSelectedCourse(val)}
              options={
                courses?.data?.map((course) => ({
                  label: course.name,
                  value: course._id,
                })) || []
              }
            />
            <button
              onClick={handleEnroll}
              className="bg-[#2E7A8A] px-5 text-white rounded-md w-full h-[44px]"
            >
              Submit
            </button>
          </div>
        </Modal>
      </ConfigProvider>

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
