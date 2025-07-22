import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";
import PrivateRoute from "./routes/PrivateRoute";

import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import Feedback from "./Pages/Dashboard/Feedback";
import Category from "./Pages/Dashboard/Category";
import TransectionDetails from "./Pages/Dashboard/TransectionDetails";
import SubCategory from "./Pages/Dashboard/SubCategory";
import AboutUs from "./Pages/Dashboard/AboutUs";
import FAQ from "./Pages/Dashboard/FAQ";
import PrivacyPolicy from "./Pages/Dashboard/PrivacyPolicy";
import Terms from "./Pages/Dashboard/Terms";
import Notification from "./Pages/Dashboard/Notification";
import StudentLists from "./Pages/Dashboard/StudentLists";
import UserLists from "./Pages/Dashboard/UserLists";
import SellingsDetails from "./Pages/Dashboard/SellingsDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<DashboardHome />} />
            <Route
              path="/student-lists"
              element={<StudentLists />}
            />
            <Route path="/user-lists" element={<UserLists />} />

            <Route path="/sellings-details" element={<SellingsDetails />} />
            <Route path="/transection-list" element={<TransectionDetails />} />

            <Route path="/add-category" element={<Category />} />
            <Route path="/add-sub-category" element={<SubCategory />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/make-admin" element={<MakeAdmin />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/notification" element={<Notification />} />

            <Route
              path="/setting-change-password"
              element={<ChangePassword />}
            />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/feedback" element={<Feedback />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
