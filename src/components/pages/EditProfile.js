import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function EditProfile() {
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [contact,setContact]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const id = sessionStorage.getItem('userId');
    const [load,setLoad]=useState(true)
    const nav=useNavigate()
  const handleForm = async (e) => {
    e.preventDefault();
    try {
        const data = {
          name: name || "",
          contact: contact || "",
          address: address || "",
          city: city || "",
        //   description: description || "",
          status: true,
          createdAt: Timestamp.now()
        };        
        const docRef = doc(db, "users", id);
        console.log("Data to be updated:", data); // Inspect data before updating
        await updateDoc(docRef, data);
        toast.success("Profile updated successfully");
        setLoad(true);
        setTimeout(() => {
          toast.dismiss(); // Dismiss any active toasts before navigating
        //   nav('/editProfile');
        }, 2000);
        
    } catch (err) {
        toast.error("Something went wrong");
    } finally {
        setLoad(true);
    }
    setTimeout(() => {
        setLoad(false)
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            let docRef = doc(db, "users", id);
            let data = await getDoc(docRef);
            if (data.exists()) {
                let finalData = data.data();
                setName(finalData.name || "");
                setEmail(finalData.email || "");
                setContact(finalData.contact || "");
                setAddress(finalData.address || "");
                setCity(finalData.city || "");
               
                setLoad(false);
            } else {
                toast.error("No data found");
            }
        } catch (error) {
            toast.error("Error fetching data: " + error.message);
        } finally {
            setLoad(false);
        }
    };
    fetchData();
  }, [id]);

  return (
    <>
     <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">Edit Profile</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript:void(0);">Pages</a></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Profile</li>
            </ol>
          </nav>
        </div>
      </div>
      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load} />
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
                       disabled
                     />
                     <label htmlFor="gmail">Your Email</label>
                   </div>
                 </div>

                 <div className="col-sm-12">
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
                     Update Now
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
    </>
  );
}
