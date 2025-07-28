import { useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import { FiEdit } from "react-icons/fi";
import ChunkedVideoUpload from "../../Components/Dashboard/ChunkedVideoUpload";
import { useGetTutorialsQuery } from "../../redux/features/courseApi";
import { PlusOutlined } from "@ant-design/icons";
import AddTutorialsModal from "../../Components/Dashboard/AddTutorialsModal";

const data = [
  {
    key: 1,
    userId: "USR1001",
    userName: "Ayesha Siddiqua",
    email: "ayesha.siddiqua@example.com",
    contact: "+8801700000001",
    courseId: "FTB1001",
    courseName: "Beginner Football Drills",
  },
  {
    key: 2,
    userId: "USR1002",
    userName: "Hasan Mahmud",
    email: "hasan.mahmud@example.com",
    contact: "+8801700000002",
    courseId: "FTB1002",
    courseName: "Ball Control & Passing",
  },
  {
    key: 3,
    userId: "USR1003",
    userName: "Fatima Khatun",
    email: "fatima.khatun@example.com",
    contact: "+8801700000003",
    courseId: "FTB1003",
    courseName: "Defensive Techniques 101",
  },
  {
    key: 4,
    userId: "USR1004",
    userName: "Rafiul Islam",
    email: "rafiul.islam@example.com",
    contact: "+8801700000004",
    courseId: "FTB1004",
    courseName: "Goalkeeping Basics",
  },
  {
    key: 5,
    userId: "USR1005",
    userName: "Sadia Jahan",
    email: "sadia.jahan@example.com",
    contact: "+8801700000005",
    courseId: "FTB1005",
    courseName: "Striker's Training Course",
  },
  {
    key: 6,
    userId: "USR1006",
    userName: "Nahid Hossain",
    email: "nahid.hossain@example.com",
    contact: "+8801700000006",
    courseId: "FTB1006",
    courseName: "Midfield Mastery",
  },
  {
    key: 7,
    userId: "USR1007",
    userName: "Meherun Nesa",
    email: "meherun.nesa@example.com",
    contact: "+8801700000007",
    courseId: "FTB1007",
    courseName: "Speed & Agility Training",
  },
  {
    key: 8,
    userId: "USR1008",
    userName: "Tanvir Rahman",
    email: "tanvir.rahman@example.com",
    contact: "+8801700000008",
    courseId: "FTB1008",
    courseName: "Tactical Play & Strategy",
  },
  {
    key: 9,
    userId: "USR1009",
    userName: "Jannatul Ferdous",
    email: "jannatul.ferdous@example.com",
    contact: "+8801700000009",
    courseId: "FTB1009",
    courseName: "Football Fitness Plan",
  },
  {
    key: 10,
    userId: "USR1010",
    userName: "Md. Imran Hossain",
    email: "imran.hossain@example.com",
    contact: "+8801700000010",
    courseId: "FTB1010",
    courseName: "Advanced Shooting Techniques",
  },
  {
    key: 11,
    userId: "USR1011",
    userName: "Sultana Rahman",
    email: "sultana.rahman@example.com",
    contact: "+8801700000011",
    courseId: "FTB1011",
    courseName: "Mastering Set Pieces",
  },
  {
    key: 12,
    userId: "USR1012",
    userName: "Shafayet Karim",
    email: "shafayet.karim@example.com",
    contact: "+8801700000012",
    courseId: "FTB1012",
    courseName: "One-on-One Attacking",
  },
  {
    key: 13,
    userId: "USR1013",
    userName: "Nusrat Tamanna",
    email: "nusrat.tamanna@example.com",
    contact: "+8801700000013",
    courseId: "FTB1013",
    courseName: "Wing Play and Crossing",
  },
  {
    key: 14,
    userId: "USR1014",
    userName: "Shakil Ahmed",
    email: "shakil.ahmed@example.com",
    contact: "+8801700000014",
    courseId: "FTB1014",
    courseName: "Dribbling Under Pressure",
  },
  {
    key: 15,
    userId: "USR1015",
    userName: "Munira Sultana",
    email: "munira.sultana@example.com",
    contact: "+8801700000015",
    courseId: "FTB1015",
    courseName: "Football Nutrition & Recovery",
  },
  {
    key: 16,
    userId: "USR1016",
    userName: "Arif Chowdhury",
    email: "arif.chowdhury@example.com",
    contact: "+8801700000016",
    courseId: "FTB1016",
    courseName: "Game Awareness & Vision",
  },
  {
    key: 17,
    userId: "USR1017",
    userName: "Sumaiya Haque",
    email: "sumaiya.haque@example.com",
    contact: "+8801700000017",
    courseId: "FTB1017",
    courseName: "Footwork for Defenders",
  },
  {
    key: 18,
    userId: "USR1018",
    userName: "Tawsif Rahman",
    email: "tawsif.rahman@example.com",
    contact: "+8801700000018",
    courseId: "FTB1018",
    courseName: "Offensive Transitions",
  },
  {
    key: 19,
    userId: "USR1019",
    userName: "Rumana Akter",
    email: "rumana.akter@example.com",
    contact: "+8801700000019",
    courseId: "FTB1019",
    courseName: "Zonal & Man-Marking",
  },
  {
    key: 20,
    userId: "USR1020",
    userName: "Asif Mahmud",
    email: "asif.mahmud@example.com",
    contact: "+8801700000020",
    courseId: "FTB1020",
    courseName: "Game Analysis & Feedback",
  },
];

const itemsPerPage = 15;
const total = 20;

const Tutorials = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data: tutorialsData } = useGetTutorialsQuery();
  console.log(tutorialsData);

  const columns = [
    {
      title: "Tutorials Name",
      dataIndex: "tutorialsName",
      key: "tutorialsName",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Video Url",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    // {
    //   title: "Upload Video",
    //   dataIndex: "uploadVideo",
    //   key: "uploadVideo",
    //   render: () => <ChunkedVideoUpload />,
    // },
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

  const pageSize = 15;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full  bg-[#13333A]">
      <div
        style={{
          borderRadius: "8px",
          height: "100%",
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
              dataSource={paginatedData}
              pagination={{
                total: total,
                current: page,
                pageSize: itemsPerPage,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <AddTutorialsModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </div>
  );
};

export default Tutorials;
