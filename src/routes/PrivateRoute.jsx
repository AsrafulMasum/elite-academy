import { Navigate, useLocation } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import { useProfileQuery } from "../redux/features/authApi";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data: profile, isLoading, isError, isFetching } = useProfileQuery();

  if (isLoading || isFetching) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-green text-secondary">
        <BiLoaderCircle className="text-7xl animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (
    profile?.data?.role &&
    (profile?.data?.role === "ADMIN" || profile?.data?.role === "SUPER_ADMIN")
  ) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
