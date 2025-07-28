import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import { FiEdit } from "react-icons/fi";

const data = [
  {
    key: 1,
    className: "Dribbling Basics",
    date: "2025-07-01",
    time: "10:00 AM - 11:00 AM",
    homeWork: "Practice cone dribbling",
  },
  {
    key: 2,
    className: "Ball Control",
    date: "2025-07-02",
    time: "11:30 AM - 12:30 PM",
    homeWork: "Juggle for 5 mins",
  },
  {
    key: 3,
    className: "Shooting Techniques",
    date: "2025-07-03",
    time: "02:00 PM - 03:00 PM",
    homeWork: "Shoot 20 times with each foot",
  },
  {
    key: 4,
    className: "Passing Drill",
    date: "2025-07-04",
    time: "09:00 AM - 10:00 AM",
    homeWork: "Wall pass 50 times",
  },
  {
    key: 5,
    className: "Defensive Tactics",
    date: "2025-07-05",
    time: "04:00 PM - 05:00 PM",
    homeWork: "Watch 2 defensive videos",
  },
  {
    key: 6,
    className: "Speed & Agility",
    date: "2025-07-06",
    time: "08:00 AM - 09:00 AM",
    homeWork: "5 sets of ladder drills",
  },
  {
    key: 7,
    className: "Corner Kicks",
    date: "2025-07-07",
    time: "03:00 PM - 04:00 PM",
    homeWork: "10 left + 10 right foot kicks",
  },
  {
    key: 8,
    className: "Free Kick Skills",
    date: "2025-07-08",
    time: "10:30 AM - 11:30 AM",
    homeWork: "Watch Beckham free kicks",
  },
  {
    key: 9,
    className: "Header Practice",
    date: "2025-07-09",
    time: "01:00 PM - 02:00 PM",
    homeWork: "Do 15 header jumps",
  },
  {
    key: 10,
    className: "Goalkeeping Intro",
    date: "2025-07-10",
    time: "02:30 PM - 03:30 PM",
    homeWork: "Stretch and catch drills",
  },
  {
    key: 11,
    className: "Team Coordination",
    date: "2025-07-11",
    time: "04:30 PM - 05:30 PM",
    homeWork: "Discuss with your team",
  },
  {
    key: 12,
    className: "Fitness Training",
    date: "2025-07-12",
    time: "07:00 AM - 08:00 AM",
    homeWork: "20 push-ups, 30 squats",
  },
  {
    key: 13,
    className: "Tactical Awareness",
    date: "2025-07-13",
    time: "01:30 PM - 02:30 PM",
    homeWork: "Sketch 2 formations",
  },
  {
    key: 14,
    className: "Midfield Control",
    date: "2025-07-14",
    time: "09:30 AM - 10:30 AM",
    homeWork: "Pass in triangle drill",
  },
  {
    key: 15,
    className: "Striker Finishing",
    date: "2025-07-15",
    time: "11:00 AM - 12:00 PM",
    homeWork: "Shoot from 3 angles",
  },
  {
    key: 16,
    className: "Wing Play",
    date: "2025-07-16",
    time: "03:00 PM - 04:00 PM",
    homeWork: "Run 3 crosses each side",
  },
  {
    key: 17,
    className: "Throw-in Technique",
    date: "2025-07-17",
    time: "10:00 AM - 11:00 AM",
    homeWork: "Practice 10 throw-ins",
  },
  {
    key: 18,
    className: "1v1 Attacks",
    date: "2025-07-18",
    time: "01:00 PM - 02:00 PM",
    homeWork: "2 sets of shadow dribbling",
  },
  {
    key: 19,
    className: "Zonal Defense",
    date: "2025-07-19",
    time: "04:00 PM - 05:00 PM",
    homeWork: "Draw your zone strategy",
  },
  {
    key: 20,
    className: "Final Scrimmage",
    date: "2025-07-20",
    time: "08:00 AM - 09:30 AM",
    homeWork: "Prepare mentally & hydrate",
  },
];

const itemsPerPage = 15;
const total = 20;

const ClassSchedule = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });

  const columns = [
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Home Work",
      dataIndex: "homeWork",
      key: "homeWork",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
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
              Wishlist
            </h3>
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
    </div>
  );
};

export default ClassSchedule;
