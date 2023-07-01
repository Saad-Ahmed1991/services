import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  return (
    <>
      {!token ? (
        <Navigate to={-1} />
      ) : !currentUser.role ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : currentUser.role === "admin" || currentUser.role === "superAdmin" ? (
        props.children
      ) : (
        <Navigate to={-1} />
      )}
    </>
  );
};

export default ProtectedRoute;
