import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function SendRevert() {
  //states to store input data
  const [problem, setproblem] = useState("");
  const [solution, setsolution] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [revert, setrevert] = useState("");
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
        let docRef = doc(db, "reviewRequest", id);
        let data = await getDoc(docRef);
        if (data.exists()) {
          let finalData = data.data();
          setLoad(false);  
          // Check if a meeting link already exists
          if (finalData.revert) {
            setrevert(finalData.revert);
            setLoad(true)
            alert("Revert already sent. You cannot send another one.");
            setTimeout(() => {  
                nav('/RequestHistory')
            }, 2000);
          }
        } else {
          toast.error("No data found");
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, [id]);
  

  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true);
    saveData();
};

const saveData = async () => {
    try {
        let data = {
            revert:revert
        };

        const docRef = doc(db, "reviewRequest", id);
        await updateDoc(docRef, data);
        toast.success("Revert send successfully");
        nav("/RequestHistory");
        setrevert("");
    } catch (err) {
        toast.error("Something went wrong: " + err.message);
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
           Send Revert
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
             
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
                      Send Revert
                    </h1>
                    <div className="col-sm-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0"
                          id="gmail"
                          value={revert}
                          onChange={(e) => setrevert(e.target.value)}
                          required
                        />
                        <label htmlFor="gmail">
                         Send Revert
                        </label>
                      </div>
                    </div>
                        <div className="col-12 text-center">
                        <button
                            className="btn btn-primary py-3 px-4"
                            type="submit"
                           // Disable the button if a meeting link already exists
                        >
                            Send 
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
