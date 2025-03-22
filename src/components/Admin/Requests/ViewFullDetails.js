import { addDoc, collection, doc, getDoc, onSnapshot, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function ViewFullDetails() {
  //states to store input data
  const [problem, setproblem] = useState("");
  const [solution, setsolution] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [description, setdescription] = useState("");
  const [Image, setImage] = useState("");
  const [load, setLoad] = useState(true);
  const [file, setFile] = useState(null); // Use null instead of {}
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let docRef = doc(db, "reviewRequest", id);
        let data = await getDoc(docRef);
        if (data.exists()) {
          let finalData = data.data();
          setproblem(finalData.problem);
          setsolution(finalData.solution);
          setLoad(false);
          setPreviousImage(finalData.image);

          // Check if a meeting link already exists
          if (finalData.meetingLink) {
            setMeetingLink(finalData.meetingLink);
            setInputDisabled(true); // Disable inputs if a meeting link exists
            toast.info("Meeting link already sent. You cannot send another one.");
          }
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
        meetingLink: meetingLink,
        solution: solution,
      };

      const docRef = doc(db, "reviewRequest", id);
      await updateDoc(docRef, data);
      toast.success("Solution sent successfully");
      nav("/AdminMaster/ViewAllRequests");
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
      const storageRef = ref(storage, 'announcementImages/' + file.name);
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
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            View Details and Send Solution
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
                Details
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load} />
      {!load && (
        <div className="container-fluid py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img src={previousImage} className="img-fluid" alt="..." style={{ width: "100%", height: "300px" }} />
                <h4>Problem Description: <span>{problem}</span></h4>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="bg-light rounded p-4 p-sm-5 wow fadeInUp" data-wow-delay="0.1s">
                  <form onSubmit={handleForm} method="post">
                    <div className="row g-3">
                      <h1 className="fs-15 fw-bold text-primary text-center">Send Solution</h1>
                      <div className="col-sm-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            id="solution"
                            value={solution}
                            disabled={inputDisabled}
                            onChange={(e) => setsolution(e.target.value)}
                            required
                          />
                          <label htmlFor="solution">Solution</label>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            id="meetingLink"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            disabled={inputDisabled}
                            placeholder="Enter meeting link"
                          />
                          <label htmlFor="meetingLink">Meeting Link</label>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <button
                          className="btn btn-primary py-3 px-4"
                          type="submit"
                          disabled={inputDisabled}
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
