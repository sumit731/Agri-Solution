import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UpdateAnnoucement() {
  //states to store input data
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [Image, setImage] = useState("");
  const[load,setLoad] = useState(true);
  const [file, setFile] = useState(null); // Use null instead of {}
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            let docRef = doc(db, "annoucements", id);
            let data = await getDoc(docRef);
            if (data.exists()) {
                let finalData = data.data();
                setTitle(finalData.title);
                setdescription(finalData.description);
                setPreviousImage(finalData.image);
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

const changeFile = (e) => {
    if (e.target.files.length > 0) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name); // Track file name for display purposes
    }
};

const saveData = async () => {
    try {
        let data = {
            title: title,
            description: description,
            image: url || previousImage,
            createdAt: Timestamp.now()
        };

        const docRef = doc(db, "annoucements", id);
        await updateDoc(docRef, data);
        toast.success("annoucement updated successfully");
        nav("/AdminMaster/ManageAnnoucement");
    } catch (err) {
        toast.error("Something went wrong: " + err.message);
    } finally {
        setLoad(false);
    }
};

const handleForm = (e) => {
    e.preventDefault();
    setLoad(true);

    if (file) {
        const storageRef = ref(storage, 'annoucemetImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                toast.error("Error uploading file: " + error.message);
                setLoad(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                }).catch((error) => {
                    toast.error("Failed to get download URL: " + error.message);
                    setLoad(false);
                });
            }
        );
    } else {
        saveData();
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
            Update Announcement
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
                Update Announcement
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
                       Update Annoucement
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
                        UPDATE 
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
