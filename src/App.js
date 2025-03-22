// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Master from "./components/pages/Master";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Feature from "./components/pages/Feature";
import Project from "./components/pages/Project";
import Quote from "./components/pages/Quote";
import Team from "./components/pages/Team";
import Services from "./components/pages/Services";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import Video_Zoom from "./components/pages/Video_Zoom";
import Login from "./components/authors/Login";
import Register from "./components/authors/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMaster from "./components/pages/AdminMaster";
import Questions from "./components/pages/Questions";
import Videos from "./components/pages/Videos/Videos";
import BoxCard from "./components/Others/BoxCard";
import UserMeeting from "./components/pages/UserMeeting";

import AddProduct from "./components/Admin/product/AddProduct";
import UpdateProblem from "./components/Admin/problem/UpdateProblem";
import ManageFarmers from "./components/Admin/ManageFarmers";
import ManageProduct from "./components/Admin/product/ManageProduct";
import EditProduct from "./components/Admin/product/EditProduct";
import AddAnnoucement from "./components/Admin/Annoucement/AddAnnoucement";
import ManageAnnoucements from "./components/Admin/Annoucement/ManageAnnoucement";
import UpdateAnnoucement from "./components/Admin/Annoucement/UpdateAnnoucement";
import Annoucememts from "./components/pages/ViewAnnoucements";
import AddRecord from "./components/pages/Record/AddRecord";
import ManageRecord from "./components/pages/Record/ManageRecord";
import UpdateRecord from "./components/pages/Record/UpdateRecord";
import SendRequest from "./components/pages/SendRequest";
import RequestHistory from "./components/pages/RequestHistory";
import ViewRequests from "./components/Admin/Requests/ViewRequests";
import ViewFullDetails from "./components/Admin/Requests/ViewFullDetails";
import SendRevert from "./components/pages/sendrevert";
import EditProfile from "./components/pages/EditProfile";
import ViewRecords from "./components/Admin/ViewRecords";
import ViewAllRequests from "./components/Admin/Requests/ViewAllRequests";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/project" element={<Project />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/team" element={<Team />} />
            <Route path="/Annoucememts" element={<Annoucememts/>} />
            <Route path="/AddRecord" element={<AddRecord/>} />
            <Route path="/ManageRecord" element={<ManageRecord/>} />
            <Route path="/UpdateRecord/:id" element={<UpdateRecord/>} />
            <Route path="/sendRequest" element={<SendRequest/>} />
            <Route path="/RequestHistory" element={<RequestHistory/>} />
            <Route path="/SendRevert/:id" element={<SendRevert/>} />
            <Route path="/editProfile" element={<EditProfile/>} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* <Route path="/services" element={<Services />} />
            <Route path="/error" element={<Error />} />
            <Route path="/video" element={<Videos />} />
            <Route path="/Video_Zoom" element={<Video_Zoom />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/UserMeeting" element={<UserMeeting />} /> */}
          </Route>

          <Route path="/AdminMaster" element={<AdminMaster />}>
            <Route path="/AdminMaster" element={<BoxCard />} />
            <Route path="/AdminMaster/AddProduct" element={<AddProduct />} />
            <Route path="/AdminMaster/ManageProduct" element={<ManageProduct/>} />
            <Route path="/AdminMaster/UpdateProduct/:id" element={<EditProduct/>} />
            <Route path="/AdminMaster/AddAnnoucement" element={<AddAnnoucement />} />
            <Route path="/AdminMaster/ManageAnnoucement" element={<ManageAnnoucements />} />
            <Route path="/AdminMaster/UpdateAnnoucement/:id" element={<UpdateAnnoucement />} />
            <Route path="/AdminMaster/ManageFarmers" element={<ManageFarmers />} />
            <Route path="/AdminMaster/ViewRequests/:id" element={<ViewRequests />} />
            <Route path="/AdminMaster/ViewAllRequests" element={<ViewAllRequests />} />
            <Route path="/AdminMaster/ViewRecords/:id" element={<ViewRecords />} />
            <Route path="/AdminMaster/ViewFullDetails/:id" element={<ViewFullDetails />} />
            <Route
              path="/AdminMaster/UpdateProduct"
              element={<UpdateProblem />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
