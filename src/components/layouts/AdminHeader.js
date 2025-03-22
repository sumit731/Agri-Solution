import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Firebase";
export default function AdminHeader() {
  const nav = useNavigate();
  const userId = sessionStorage.getItem("email");

  const logout = () => {
    if (window.confirm("Do you really want to logout?")) {
      auth.signOut();
      sessionStorage.clear();
      toast.success("Logout successfully");
        nav("/");
    }
  };
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-dark text-light px-0 py-2">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <span className="fa fa-phone-alt me-2" />
              <span>+012 345 6789</span>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <span className="far fa-envelope me-2" />
              <span>info@example.com</span>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center mx-n2">
              <span>Follow Us:</span>
              <a className="btn btn-link text-light" href="">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="btn btn-link text-light" href="">
                <i className="fab fa-twitter" />
              </a>
              <a className="btn btn-link text-light" href="">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="btn btn-link text-light" href="">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <Link
         to={"/AdminMaster"}
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h1 className="m-0">Agro-Solution</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/AdminMaster" className="nav-item nav-link ">
              Dashboard
            </Link>
            <Link to="/AdminMaster/ManageFarmers" className="nav-item nav-link">
              Manage Farmers
            </Link>
            <Link to="/AdminMaster/ViewAllRequests" className="nav-item nav-link ">
              All Requests
            </Link>
            {/* <Link to="/AdminMaster/ViewRequests" className="nav-item nav-link">
              Requests
            </Link> */}
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown">Products</Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/AdminMaster/AddProduct" className="dropdown-item">Add</Link>
                <Link to="/AdminMaster/ManageProduct" className="dropdown-item">Manage</Link>
              </div>
            </div>
{/* 
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Manage <br />
                Reviews
              </Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/" className="dropdown-item">
                  Manage Review Request
                </Link>
                <Link to="/" className="dropdown-item">
                  Manage Review Request Detail
                </Link>
              </div>
            </div> */}

            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              > Announcements
              </Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/AdminMaster/AddAnnoucement" className="dropdown-item">
                  Add 
                </Link>
                <Link to="/AdminMaster/ManageAnnoucement" className="dropdown-item">
                  Manage 
                </Link>
              </div>
            </div>

            {/* <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Manage <br />
                Problem
              </Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/" className="dropdown-item">
                  Add Problem
                </Link>
                <Link to="/AdminMaster/UpdateProduct" className="dropdown-item">
                  Update Problem
                </Link>
              </div>
            </div> */}

           
              <Link onClick={logout} className="nav-item nav-link ">
                Logout
              </Link>
       
            {/* <a href="/" className="nav-item nav-link" onClick={logout}>
              Sign Out
            </a> */}
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
