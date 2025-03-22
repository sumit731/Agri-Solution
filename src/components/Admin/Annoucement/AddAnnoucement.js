import { addDoc, collection, doc, onSnapshot, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function AddAnnoucement() {
  //states to store input data
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [Image, setImage] = useState("");
  const[load,setLoad] = useState(false);
  const [file, setFile] = useState(null); // Use null instead of {}
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const nav = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    if (!file) {
        toast.error("Please upload an image");
        return;
    }
    setLoad(true);
    const storageRef = ref(storage, 'annoucemetImages/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        },
        (error) => {
            toast.error("Upload failed: " + error.message);
            setLoad(false);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
            });
        }
    );
};

const saveData = async () => {
    try {
        const data = {
            title,
            description,
            image: url,
            status: true,
            createdAt: Timestamp.now()
        };

        await addDoc(collection(db, "annoucements"), data);
        toast.success("Annoucememt added successfully");
        setTimeout(() => {
            nav('/AdminMaster/ManageAnnoucement')
        }, 2000);
        // Reset form fields
        setTitle("");
        setdescription("");
        setFileName("");
        setFile(null);
        setUrl("");
        
    } catch (error) {
        toast.error("Error adding blog: " + error.message);
    } finally {
        setLoad(false);
    }
};
useEffect(() => {
  if (url) {
      saveData();
  }
}, [url]);
  return (
    <>
     <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Add Announcement
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
                Add Announcement
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
                       Add Annoucement
                    </h1>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Title
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                         <input
                          className="form-control border-0"
                          required
                          type="file"
                          id="gmail"
                          accept="image/*"
                          onChange={(e) => {
                              setFileName(e.target.files[0]?.name || "");
                              setFile(e.target.files[0] || null);
                          }}/>
                        <label htmlFor="gmail">Image</label>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-floating">
                        <input
                          type="text"
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
