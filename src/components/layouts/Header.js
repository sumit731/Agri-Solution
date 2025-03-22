import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
export default function Header() {
  const nav = useNavigate();
  const userId  = sessionStorage.getItem("email");

  const login = (e) => {
    e.preventDefault();
    nav("/login");
  };
 
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
        <a
          href="index.html"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <img src="/assets/img/logo.png" height={80} width={80} />
          <h1 className="m-0">Agro-Solution</h1>
        </a>
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
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/Annoucememts" className="nav-item nav-link">
              Annoucements
            </Link>
            <Link to="/project" className="nav-item nav-link">
              Products
            </Link>
         
            {/* <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link> */}
              {
                !userId?(
                  <>
                   <Link to="/login" className="nav-item nav-link">
                       Login
                      </Link>
                   <Link to="/registration" className="nav-item nav-link">
                      Register
                      </Link>
                  </>
                ):<>
                     <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Request
              </Link>
              <div className="dropdown-menu bg-light m-0"> 
                <Link to="/sendRequest" className="dropdown-item">
                  Send Request
                </Link>
                <Link to="/RequestHistory" className="dropdown-item">
                  Request History
                </Link>
              </div>
            </div>
                   <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Record
              </Link>
              <div className="dropdown-menu bg-light m-0"> 
                <Link to="/AddRecord" className="dropdown-item">
                  Add
                </Link>
                <Link to="/ManageRecord" className="dropdown-item">
                  Manage
                </Link>
              </div>
            </div>
            <Link to="/editProfile">
            <img
                  src="/assets/img/userLogo.png"
                  height={"30"}
                  width={"30"}
                  className="mt-4 me-4"
                  alt="User Logo"
                />
            </Link>
               
            <Link  onClick={logout}   className="nav-item nav-link">
              Logout
              </Link>

            </>
                  
              }
            {/* <div className="nav-item dropdown">
              <Link
                to="/profile"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                onClick={login}
              >
              
              </Link>
              <div className="dropdown-menu bg-light m-0">
                <Link to="/login" className="dropdown-item">
                  Sign In
                </Link>
                <Link to="/registration" className="dropdown-item">
                  Sign Up
                </Link>
                <Link to="/UserMeeting" className="dropdown-item">
                  Zoom Meeting
                </Link>
                <Link to="/" className="dropdown-item" onClick={LogOut}>
                  Sign Out
                </Link>
              </div>
            </div> */}
          </div>
       
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
