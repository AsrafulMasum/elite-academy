import { Layout } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import adminImg from "../../assets/admin.jpg";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosNotifications, IoMdPaper } from "react-icons/io";
import {
  TbPlayFootball,
  TbUserHeart,
  TbUsers,
  TbUsersGroup,
} from "react-icons/tb";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiBookmark, CiLogout, CiSettings } from "react-icons/ci";
import { IoDocumentLockOutline, IoFootballOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { PiInfoThin } from "react-icons/pi";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    window.location.reload();
  };

  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: (pathname) => (
        <LuLayoutDashboard
          className={`text-xl ${
            pathname === "/" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Student Lists",
      path: "/student-lists",
      icon: (pathname) => (
        <TbUsersGroup
          className={`text-xl ${
            pathname === "/student-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "User Lists",
      path: "/user-lists",
      icon: (pathname) => (
        <TbUsers
          className={`text-xl ${
            pathname === "/user-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Sellings Details",
      path: "/sellings-details",
      icon: (pathname) => (
        <LiaHandHoldingUsdSolid
          className={`text-xl ${
            pathname === "/sellings-details"
              ? "text-[#EEEEEE]"
              : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Enrollment Fees",
      path: "/enrollment-fees",
      icon: (pathname) => (
        <GiTakeMyMoney
          className={`text-xl ${
            pathname === "/enrollment-fees"
              ? "text-[#EEEEEE]"
              : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Wishlist",
      path: "/wishlist",
      icon: (pathname) => (
        <CiBookmark
          className={`text-xl ${
            pathname === "/wishlist" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Interested User",
      path: "/interestedUser",
      icon: (pathname) => (
        <TbUserHeart
          className={`text-xl ${
            pathname === "/interestedUser" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Products",
      path: "/products",
      icon: (pathname) => (
        <IoFootballOutline
          className={`text-xl ${
            pathname === "/products" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Add Category",
      path: "/addCategory",
      icon: (pathname) => (
        <MdOutlineCategory
          className={`text-xl ${
            pathname === "/addCategory" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Coach",
      path: "/coach",
      icon: (pathname) => (
        <TbPlayFootball
          className={`text-xl ${
            pathname === "/coach" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Manage Admin",
      path: "/manage-admin",
      icon: (pathname) => (
        <RiAdminLine
          className={`text-xl ${
            pathname === "/manage-admin" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Subscription",
      path: "/subscription",
      icon: (pathname) => (
        <GiMoneyStack
          className={`text-xl ${
            pathname === "/subscription" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Settings",
      path: "/settings",
      icon: (pathname) => (
        <CiSettings
          className={`text-xl ${
            pathname === "/subscription" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
      submenu: [
        {
          title: "FAQ",
          path: "/settings/faq",
          icon: (pathname) => (
            <GoQuestion
              className={`text-xl ${
                pathname === "/settings/faq"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "About Us",
          path: "/settings/about-us",
          icon: (pathname) => (
            <BsExclamationCircle
              className={`text-xl ${
                pathname === "/settings/about-us"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Privacy & Policy",
          path: "/settings/privacy-policy",
          icon: (pathname) => (
            <IoDocumentLockOutline
              className={`text-xl ${
                pathname === "/settings/privacy-policy"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Terms & Conditions",
          path: "/settings/terms-conditions",
          icon: (pathname) => (
            <IoMdPaper
              className={`text-xl ${
                pathname === "/settings/terms-conditions"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
      ],
    },

    {
      title: "Log out",
      path: "/login",
      icon: (pathname) => (
        <CiLogout
          className={`text-xl ${
            pathname === "/subscription" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="250"
        style={{
          overflow: "auto",
          position: "fixed",
          top: "80px",
          bottom: "16px",
          height: "auto",
          paddingBottom: "60px",
          overflowX: "hidden",
          zIndex: 2,
          margin: "8px 8px 0 8px",
          borderRadius: "8px",
          backgroundColor: "#13333A",
        }}
      >
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "0px",
            height: "90%",
            marginTop: 16,
          }}
        >
          {linkItems.map((item, index) => (
            <li key={index} style={{ width: "100%", position: "relative" }}>
              {item.submenu ? (
                // Menu item with submenu
                <div
                  onClick={() => setOpenSubMenu((prev) => !prev)}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    color: "#A3A3A3",
                    gap: "8px",
                    padding: "12px 8px 12px 35px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                    <div style={{ fontSize: "14px" }}>{item.title}</div>
                  </div>
                  <div style={{ marginRight: "20px" }}>
                    {openSubMenu ? (
                      <FiChevronUp className="text-[#A3A3A3]" />
                    ) : (
                      <FiChevronDown className="text-[#A3A3A3]" />
                    )}
                  </div>
                </div>
              ) : (
                // Normal link item
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    color: item.path === pathname ? "#EEEEEE" : "#A3A3A3",
                    alignItems: "center",
                    gap: "8px",
                    background: item.path === pathname ? "#2E7A8A" : "none",
                    width: "100%",
                    padding: "12px 8px 12px 35px",
                  }}
                >
                  <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                  <div style={{ fontSize: "14px" }}>{item.title}</div>
                </Link>
              )}

              {/* Submenu rendering */}
              {item.submenu && openSubMenu && (
                <ul style={{ marginLeft: "30px", marginTop: "4px" }}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            subItem.path === pathname ? "#EEEEEE" : "#A3A3A3",
                          background:
                            subItem.path === pathname ? "#2E7A8A" : "none",
                          padding: "8px 8px 8px 20px",
                          gap: "6px",
                          fontSize: "14px",
                        }}
                      >
                        <div style={{ height: "24px" }}>
                          {subItem.icon(pathname)}
                        </div>
                        <div>{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {item.title === "User Lists" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Interested User" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
              {item.title === "Manage Admin" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            height: "80px",
            zIndex: 1,
            padding: 0,
            backgroundColor: "#13333A",
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
            paddingRight: "100px",
            paddingLeft: "69px",
          }}
        >
          <div className="flex justify-center items-center">
            {/* <img
              src={logo}
              alt="logo"
              className="w-16"
            /> */}
          </div>
          <div
            style={{
              width: "220px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/notification">
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <IoIosNotifications className="text-3xl text-[#E6E6E6]" />

                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#FFC107",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#121212",
                    position: "absolute",
                    top: 2,
                    right: 4,
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  1
                </div>
              </div>
            </Link>
            <Link
              to={"/admin-profile"}
              style={{
                height: "42px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px",
              }}
            >
              <img
                src={adminImg}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
                alt=""
              />
              <h2
                style={{
                  color: "#EEEEEE",
                  fontSize: "16px",
                  fontWeight: "500",
                  width: 200,
                  lineHeight: "24px",
                }}
              >
                Admin Niloofar
              </h2>
            </Link>
          </div>
        </Header>

        <Content
          style={{
            marginTop: "88px",
            marginBottom: "16px",
            marginLeft: "265px",
            marginRight: "16px",
            borderRadius: "8px",
            overflow: "auto",
            // backgroundColor: "#13333A",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
