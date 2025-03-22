import React, { useState } from "react";
import AdminMeeting from "../Admin/AdminMeeting";

import { Link } from "react-router-dom";
import {ClipLoader} from "react-spinners"
import { useEffect } from "react";
import { collection, getCountFromServer, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../Firebase";

export default function BoxCard() {
  const [load,setLoad]=useState(true)   
const [projects , setprojects] = useState([])
  const [,setCat]=useState(0)
  const [review,setreview]=useState(0)
  const [Blogs,setBlogs]=useState(0)
  const [Enquiry,setEnquiry]=useState(0)
  const [placeOrder,setPlaceOrder]=useState(0)
  const [user,setUser]=useState(0)
  useEffect(()=>{
      getCount1()
      getCount2()
      getCount3()
      getCount4()
      getCount5()
  },[])
const getCount1=async ()=>{
  const coll = collection(db, "products");
  const snapshot = await getCountFromServer(coll);
  setprojects(snapshot.data().count);
  setTimeout(()=>{
      setLoad(false)
  },700)
}
const getCount2 = async () => {
  const q = query(collection(db, "users"), where("userType", "==", 2));
  const snapshot1 = await getCountFromServer(q);
  setUser(snapshot1.data().count);
};

const getCount3 = async () => {
  const q = query(collection(db, "users"), where("userType", "==", 1));
  const snapshot2 = await getCountFromServer(q);
  setUser(snapshot2.data().count);
};

  const getCount4=async ()=>{
    const coll3 = collection(db, "reviewRequest");
    const snapshot3 = await getCountFromServer(coll3);
    setreview(snapshot3.data().count);
}
  const getCount5=async ()=>{
    const coll3 = collection(db, "annoucements");
    const snapshot3 = await getCountFromServer(coll3);
    setBlogs(snapshot3.data().count);
}
  return (
    <>
      {/* Page Header Start */}
     
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Dashboard
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Header End */}
      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load} />

  {!load && (
      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 500 }}
          >
          </div>
          <div className="row justify-content-center">   
                        
                        <div className="col-md-4 p-3">
                            <div className="card shadow rounded text-center p-3">
                                <h3 className="dispay-4"> Total Projects</h3>
                                <h1>{projects}</h1>
                            </div>
                        </div>    
                        <div className="col-md-4 p-3">
                            <div className="card shadow rounded text-center p-3">
                                <h3>Total Users</h3>
                                <h1>{user}</h1>
                            </div>
                        </div>    
                        <div className="col-md-4 p-3">
                            <div className="card shadow rounded text-center p-3">
                                <h3>Total Review Requests</h3>
                                <h1>{review}</h1>
                            </div>
                        </div>    
                        <div className="col-md-4 p-3">
                            <div className="card shadow rounded text-center p-3">
                                <h3>Total Annoucements</h3>
                                <h1>{Blogs}</h1>
                            </div>
                        </div>    
                    </div>
        </div>
      </div>
)}
    </>
  );
}
