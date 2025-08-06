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
import Category from "./Pages/Dashboard/Category";
import AboutUs from "./Pages/Dashboard/AboutUs";
import FAQ from "./Pages/Dashboard/FAQ";
import PrivacyPolicy from "./Pages/Dashboard/PrivacyPolicy";
import Terms from "./Pages/Dashboard/Terms";
import Notification from "./Pages/Dashboard/Notification";
import StudentLists from "./Pages/Dashboard/StudentLists";
import UserLists from "./Pages/Dashboard/UserLists";
import SellingsDetails from "./Pages/Dashboard/SellingsDetails";
import EnrollmentFees from "./Pages/Dashboard/EnrollmentFees";
import Wishlist from "./Pages/Dashboard/Wishlist";
import InterestedUser from "./Pages/Dashboard/InterestedUser";
import Products from "./Pages/Dashboard/Products";
import CoachLists from "./Pages/Dashboard/CoachList";
import Subscription from "./Pages/Dashboard/Subscription";
import ManageAdmin from "./Pages/Dashboard/ManageAdmin";
import Courses from "./Pages/Dashboard/Courses";
import Tutorials from "./Pages/Dashboard/Tutorials";
import ClassSchedule from "./Pages/Dashboard/ClassSchedule";
import Coupon from "./Pages/Dashboard/Coupon";
import Topics from "./Pages/Dashboard/Topics";
import Support from "./Pages/Dashboard/Support";

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
            <Route path="/student-lists" element={<StudentLists />} />
            <Route path="/user-lists" element={<UserLists />} />

            <Route path="/sellings-details" element={<SellingsDetails />} />
            <Route path="/enrollment-fees" element={<EnrollmentFees />} />

            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/interestedUser" element={<InterestedUser />} />

            <Route path="/products" element={<Products />} />
            <Route path="/addCategory" element={<Category />} />
            <Route path="/coupon" element={<Coupon />} />

            <Route path="/coach" element={<CoachLists />} />
            <Route path="/manage-admin" element={<ManageAdmin />} />
            <Route path="/subscription" element={<Subscription />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/classSchedule" element={<ClassSchedule />} />
            <Route path="/settings/about-us" element={<AboutUs />} />
            <Route path="/make-admin" element={<MakeAdmin />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/notification" element={<Notification />} />

            <Route
              path="/setting-change-password"
              element={<ChangePassword />}
            />
            <Route path="/settings/faq" element={<FAQ />} />
            <Route
              path="/settings/privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route path="/settings/terms-conditions" element={<Terms />} />
            <Route path="/settings/support" element={<Support />} />
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
