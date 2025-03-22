import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { app, auth, db } from "../../Firebase";
import { ClipLoader } from "react-spinners";

export default function Register() {
  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [contact,setContact]=useState("")
  const [address,setAddress]=useState("")
  const [city,setCity]=useState("")
  const [load,setLoad]=useState(false)
  const nav=useNavigate()
  const handleForm=(e)=>{
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        setLoad(false);
        return;
      }
      // Contact validation
      const contactRegex = /^[0-9]{10}$/;
      if (!contactRegex.test(contact)) {
        toast.error("Please enter a valid 10-digit contact number");
        setLoad(false);
        return;
      }
      setLoad(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then(
          (userCredentials)=>{
              let userId=userCredentials.user.uid
              saveData(userId)
          }
      ).catch(
          (error)=>{
              toast.error(error.message)
              setTimeout(()=>{
              setLoad(false)
              },500)
          }
      )
  }
  const saveData=async (userId)=>{
      try{
      let data={
          name:name,
          contact:contact,
          address:address,
          city:city,
          email:email,
          userType:2,
          userId:userId,
          status:true,
          createdAt:Timestamp.now()
          //admin-1, user-2
      }
      await setDoc(doc(db,"users",userId),data)
      toast.success("User Register")
      sessionStorage.setItem("userId",userId)
      sessionStorage.setItem("email", data.email)
      sessionStorage.setItem("city",data.city)
      sessionStorage.setItem("userType", data.userType)
      sessionStorage.setItem("name",data.name)
      sessionStorage.setItem("address",data.address)
      sessionStorage.setItem("contact",data.contact)
 
      setTimeout(()=>{
          nav("/")
      },500)
  }
  catch(err){
      toast.success("something went wrong")
      setTimeout(()=>{
      setLoad(false)
      },500)
  }
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
            Sign Up Page
          </h1>
        </div>
      </div>
      {/* Page Header End */}

      {/* Quote Start */}


      <ClipLoader
                        cssOverride={{ display: "block", margin: "10vh auto" }}
                        loading={load}
                    />
                      {!load && (
                      <div className="container-fluid py-3">
                        <div className="container">
                          <div
                            className="text-center mx-auto wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ maxWidth: 500 }}
                          >
                            {/* <h1 className="display-5 mb-5">Get a Easy Registration</h1> */}
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-lg-7">
                              <div
                                className="bg-light rounded p-4 p-sm-5 wow fadeInUp"
                                data-wow-delay="0.1s"
                              >
                                <form onSubmit={handleForm} method="post">
                                  <div className="row g-3">
                                    <h1 className="fs-15 fw-bold text-primary text-center">
                                      Sign Up
                                    </h1>
                                    <div className="col-sm-6">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control border-0"
                                          id="gname"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          placeholder="Gurdian Name"
                                        />
                                        <label htmlFor="gname">First Name</label>
                                      </div>
                                    </div>

                                  

                                    <div className="col-sm-6">
                                      <div className="form-floating">
                                        <input
                                          type="email"
                                          className="form-control border-0"
                                          id="gmail"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          placeholder="Gurdian Email"
                                        />
                                        <label htmlFor="gmail">Your Email</label>
                                      </div>
                                    </div>

                                    <div className="col-sm-6">
                                      <div className="form-floating">
                                        <input
                                          type="password"
                                          className="form-control border-0"
                                          id="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          placeholder="Gurdian Name"
                                        />
                                        <label htmlFor="gname">Enter Password</label>
                                      </div>
                                    </div>

                                    <div className="col-sm-6">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control border-0"
                                          id="cname"
                                          value={contact}
                                          onChange={(e) => setContact(e.target.value)}
                                          placeholder="Child Name"
                                        />
                                        <label htmlFor="cname">Your Mobile</label>
                                      </div>
                                    </div>
                                    <div className="col-sm-12">
                                      <div className="form-floating">
                                      <textarea  value={address}  className="form-control border-0"
                                          onChange={(e) => setAddress(e.target.value)}  id="address"></textarea>
                                        <label htmlFor="address">Address</label>
                                      </div>
                                    </div>
                                    <div className="col-sm-12">
                                      <div className="form-floating">
                                      <input  value={city}  className="form-control border-0"
                                          onChange={(e) => setCity(e.target.value)}  id="city"/>
                                        <label htmlFor="city">City</label>
                                      </div>
                                    </div>
                                    <div className="col-12 text-center">
                                      <button
                                        className="btn btn-primary py-3 px-4"
                                        type="submit"
                                      >
                                        Submit Now
                                      </button>
                                    </div>
                                  </div>
                                </form>
                          
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        )}
      {/* Quote End */}
    </>
  );
}
