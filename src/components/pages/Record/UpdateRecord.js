import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UpdateRecord() {
  //states to store input data
  const [crop, setcrop] = useState("");
  const [plantationDate, setplantationDate] = useState("");
  const [harvestDate, setharvestDate] = useState("");
  const [area, setarea] = useState("");
  const [weatherconditions, setweatherconditions] = useState("");
  const [cropType, setcropType] = useState("");
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
            let docRef = doc(db, "records", id);
            let data = await getDoc(docRef);
            if (data.exists()) {
                let finalData = data.data();
               setcrop(finalData?.crop)
               setcropType(finalData?.cropType)
               setplantationDate(finalData?.plantationDate)
               setharvestDate(finalData?.harvestDate)
               setarea(finalData?.area)
               setPreviousImage(finalData?.image);
               setweatherconditions(finalData?.weatherconditions)
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
            crop,
            plantationDate,
            harvestDate,
            area,
            weatherconditions,
            cropType,
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('name'),
            userEmail: sessionStorage.getItem("email"),
            image: url || previousImage,
            createdAt: Timestamp.now()
        };

        const docRef = doc(db, "records", id);
        await updateDoc(docRef, data);
        toast.success("Record updated successfully");
        
        // Delay navigation to allow the toast to be visible
        setTimeout(() => {
            nav("/ManageRecord");
        }, 2000); // 2 seconds delay
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
        const storageRef = ref(storage, 'RecordImages/' + file.name);
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
            Update Record
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
                Update Record
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
                       Update Record
                    </h1>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={crop}
                          onChange={(e) => setcrop(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Crop
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control border-0"
                          id="gmail"
                          value={plantationDate}
                          onChange={(e) => setplantationDate(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                        PlantationDate
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="date"
                          className="form-control border-0"
                          id="gmail"
                          value={harvestDate}
                          onChange={(e) => setharvestDate(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                        Harvest Date
                        </label>
                      </div>
                    </div>
                 
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={cropType}
                          onChange={(e) => setcropType(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Crop type
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={area}
                          onChange={(e) => setarea(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Area
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
                          value={weatherconditions}
                          onChange={(e) => setweatherconditions(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Weather conditions
                        </label>
                      </div>
                    </div>
             
                  
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary py-3 px-4"
                        type="submit"
                      >
                        Update 
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
