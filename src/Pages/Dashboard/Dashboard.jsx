import { Layout } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logoutIcon from "../../assets/logoutIcon.png";
import logoutActiveIcon from "../../assets/logoutActiveIcon.png";
import adminImg from "../../assets/adminImg.png";
import notificationIcon from "../../assets/notificationIcon.png";
import logo from "../../assets/logo.svg";
import faqIcon from "../../assets/faqIcon.png";
import faqActiveIcon from "../../assets/faqActiveIcon.png";
import aboutUsIcon from "../../assets/aboutUsIcon.png";
import aboutUsActiveIcon from "../../assets/aboutUsActiveIcon.png";
import addCategoryIcon from "../../assets/addCategoryIcon.png";
import addCategoryActiveIcon from "../../assets/addCategoryActiveIcon.png";
import employeeDetailsIcon from "../../assets/employeeDetailsIcon.png";
import employeeDetailsActiveIcon from "../../assets/employeeDetailsActiveIcon.png";
import serviceListIcon from "../../assets/serviceListIcon.png";
import serviceListActiveIcon from "../../assets/serviceListActiveIcon.png";
import serviceProviderIcon from "../../assets/serviceProviderIcon.png";
import serviceProvidersActiveIcon from "../../assets/serviceProvidersActiveIcon.png";
import transectionDetailsIcon from "../../assets/transectionDetailsIcon.png";
import transectionDetailsActiveIcon from "../../assets/transectionDetailsActiveIcon.png";
import addSubCategoryIcon from "../../assets/addSubCategoryIcon.png";
import addSubCategoryActiveIcon from "../../assets/addSubCategoryActiveIcon.png";
import addAdminIcon from "../../assets/addAdminIcon.png";
import addAdminActiveIcon from "../../assets/addAdminActiveIcon.png";
import privacyPolicyIcon from "../../assets/privacyPolicyIcon.png";
import privacyActiveIcon from "../../assets/privacyActiveIcon.png";
import termsConditionIcon from "../../assets/termsConditionIcon.png";
import termsActiveIcon from "../../assets/termsActiveIcon.png";
import reportsIcon from "../../assets/reportsIcon.png";
import reportsActiveIcon from "../../assets/reportsActiveIcon.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import dashboardActiveIcon from "../../assets/dashboardActiveIcon.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosNotifications } from "react-icons/io";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
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
      title: "Service Providers",
      path: "/service-provider-list",
      icon: (pathname) => (
        <img
          src={
            pathname === "/service-provider-list"
              ? serviceProvidersActiveIcon
              : serviceProviderIcon
          }
          alt="dashboard"
        />
      ),
    },
    // {
    //   title: "Employee Deatils",
    //   path: "/employee-list",
    //   icon: (pathname) => (
    //     <img
    //       src={
    //         pathname === "/employee-list"
    //           ? employeeDetailsActiveIcon
    //           : employeeDetailsIcon
    //       }
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Service List",
    //   path: "/service-list",
    //   icon: (pathname) => (
    //     <img
    //       src={
    //         pathname === "/service-list"
    //           ? serviceListActiveIcon
    //           : serviceListIcon
    //       }
    //       alt="dashboard"
    //     />
    //   ),
    // },

    // {
    //   title: "Transection Details",
    //   path: "/transection-list",
    //   icon: (pathname) => (
    //     <img
    //       src={
    //         pathname === "/transection-list"
    //           ? transectionDetailsActiveIcon
    //           : transectionDetailsIcon
    //       }
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Add Category",
    //   path: "/add-category",
    //   icon: (pathname) => (
    //     <img
    //       src={
    //         pathname === "/add-category"
    //           ? addCategoryActiveIcon
    //           : addCategoryIcon
    //       }
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Add Sub-category",
    //   path: "/add-sub-category",
    //   icon: (pathname) => (
    //     <img
    //       src={
    //         pathname === "/add-sub-category"
    //           ? addSubCategoryActiveIcon
    //           : addSubCategoryIcon
    //       }
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "About Us",
    //   path: "/aboutUs",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/aboutUs" ? aboutUsActiveIcon : aboutUsIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "FAQ",
    //   path: "/faq",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/faq" ? faqActiveIcon : faqIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Privacy Policy",
    //   path: "/privacy",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/privacy" ? privacyActiveIcon : privacyPolicyIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Terms & Condition",
    //   path: "/terms",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/terms" ? termsActiveIcon : termsConditionIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },
    // {
    //   title: "Reports",
    //   path: "/feedback",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/feedback" ? reportsActiveIcon : reportsIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },

    // {
    //   title: "Add admin",
    //   path: "/make-admin",
    //   icon: (pathname) => (
    //     <img
    //       src={pathname === "/make-admin" ? addAdminActiveIcon : addAdminIcon}
    //       alt="dashboard"
    //     />
    //   ),
    // },
    {
      title: "Log out",
      path: "/login",
      icon: (pathname) => (
        <img
          src={pathname === "/login" ? logoutActiveIcon : logoutIcon}
          alt="dashboard"
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
            gap: "8px",
            height: "90%",
            marginTop: 16,
          }}
        >
          {linkItems.map((item, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                position: "relative",
              }}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  justifyItems: "center",
                  color: item.path === pathname ? "#EEEEEE" : "#A3A3A3",
                  alignItems: "center",
                  margin: "auto  0 auto 0",
                  gap: "8px",
                  background: item.path === pathname ? "#2E7A8A" : "none",
                  width: "100%",
                  padding: "12px 8px 12px 35px",
                }}
              >
                <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                <div
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    height: "fit-content",
                  }}
                >
                  {item.title}
                </div>
              </Link>
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
