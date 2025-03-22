import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function EditProduct() {
  
  // States to store input data
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [company, setCompany] = useState("");
  const { id } = useParams();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(true);
  const nav = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
        const data = {
          name: name || "",
          quantity: quantity || "",
          company: company || "",
          type: type || "",
          description: description || "",
          status: true,
          createdAt: Timestamp.now()
        };        
        const docRef = doc(db, "products", id);
        console.log("Data to be updated:", data); // Inspect data before updating
        await updateDoc(docRef, data);
        setLoad(true);
        toast.success("Product updated successfully");
        setTimeout(() => {
          nav('/AdminMaster/ManageProduct')
        }, 2000);
    } catch (err) {
        toast.error("Something went wrong: " + err.message);
    } finally {
        setLoad(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            let docRef = doc(db, "products", id);
            let data = await getDoc(docRef);
            if (data.exists()) {
                let finalData = data.data();
                setName(finalData.name || "");
                setDescription(finalData.description || "");
                setCompany(finalData.company || "");
                setQuantity(finalData.quantity || "");
                setType(finalData.type || "");
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
          <h1 className="display-3 text-white mb-4 animated slideInDown">Update Product</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript:void(0);">Pages</a></li>
              <li className="breadcrumb-item active" aria-current="page">Update Product</li>
            </ol>
          </nav>
        </div>
      </div>
      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load} />
      {!load && (
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}></div>
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="bg-light rounded p-4 p-sm-5 wow fadeInUp" data-wow-delay="0.1s">
                <form onSubmit={handleForm} method="post">
                  <div className="row g-3">
                    <h1 className="fs-15 fw-bold text-primary text-center">Update Product</h1>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="name">Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <label htmlFor="quantity">Quantity</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                        <label htmlFor="company">Company</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <select className="form-control border-0" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                          <option value="" disabled>Select Type</option>
                          <option value="pesticide">Pesticide</option>
                          <option value="fertilizer">Fertilizer</option>
                          <option value="manure">Manure</option>
                        </select>
                        <label htmlFor="type">Type</label>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-floating">
                        <textarea className="form-control border-0" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor="description">Description</label>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button className="btn btn-primary py-3 px-4" type="submit">UPDATE</button>
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
