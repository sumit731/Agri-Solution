import { Outlet, Navigate } from "react-router-dom";
import AdminHeader from "../layouts/AdminHeader";
import Footer from "../layouts/Footer";
import { toast, ToastContainer } from "react-toastify";

export default function AdminMaster() {
  const email = sessionStorage.getItem("email");

  if (!email) {
    toast.error("Please login");
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}
