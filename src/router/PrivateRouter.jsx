import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  //? Global state'den user bilgisini useSelector aldık.
  const { user } = useSelector((state) => state.auth);

  return user?.email ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
