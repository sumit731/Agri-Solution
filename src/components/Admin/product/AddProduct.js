import { addDoc, collection, doc, onSnapshot, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
export default function AddProduct() {
  
  //states to store input data
  const [name, setName] = useState("");
  const [quantity, setquantity] = useState("");
  const [company, setcompany] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");
 const[load,setLoad] = useState(false);
 const nav = useNavigate();
 const handleForm = async (e) => {
  e.preventDefault();
  try {
      const newProductRef = collection(db, "products");
      const data = {
        name:name,
        quantity:quantity,
        company:company,
        type:type,
        description:description,
        status:true,
        createdAt:Timestamp.now()
      };
      await addDoc(newProductRef, data);
      toast.success("Data added Successfully!!");
      setName("")
      setdescription("")
      setquantity("")
      settype("")
      setcompany("")
      setLoad("true");
      setTimeout(() => {
        nav('/AdminMaster/ManageProduct ')
      }, 1000);
      
  } catch (error) {
      toast.error("Error adding data: " + error.message);
  }
};

  return (
    <>
     <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Add Product
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
                Add Product
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* Quote Start */}
      <ClipLoader
                        cssOverride={{ display: "block", margin: "10vh auto" }}
                        loading={load}
                    />
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
            <div className="col-lg-7">
              <div
                className="bg-light rounded p-4 p-sm-5 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <form onSubmit={handleForm} method="post">
                  <div className="row g-3">
                    <h1 className="fs-15 fw-bold text-primary text-center">
                       Add Product
                    </h1>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Name
                        </label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={quantity}
                          onChange={(e) => setquantity(e.target.value)}
                          
                        />
                        <label htmlFor="gmail">Quantity</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={company}
                          onChange={(e) => setcompany(e.target.value)}
                          
                        />
                        <label htmlFor="gmail">Company</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <select  className="form-control border-0"   
                          onChange={(e) => settype(e.target.value)}>
                          <option disabled selected>Select Type</option>
                          <option value="pesticide">pesticide</option>
                          <option value="fertilizer">fertilizer</option>
                          <option value="manure">manure</option>
                        </select>
                        <label htmlFor="gmail">Type</label>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-floating">
                        <textarea
                          
                          className="form-control border-0"
                          id="gmail"
                          value={description}
                          onChange={(e) => setdescription(e.target.value)}
                          
                        />
                        <label htmlFor="gmail">Description</label>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary py-3 px-4"
                        type="submit"
                      >
                        ADD 
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
