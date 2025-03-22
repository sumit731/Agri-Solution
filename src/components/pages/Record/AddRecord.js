import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../../Firebase";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function AddRecord() {
  // States to store input data
  const [crop, setCrop] = useState("");
  const [plantationDate, setPlantationDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [area, setArea] = useState("");
  const [weatherconditions, setWeatherConditions] = useState("");
  const [cropType, setCropType] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  // Handle form submission
  const handleForm = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    // Start loading
    setLoad(true);

    // Upload image to Firebase Storage
    try {
      const storageRef = ref(storage, `RecordImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          throw new Error("Upload failed: " + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
        }
      );
    } catch (error) {
      toast.error("Upload failed: " + error.message);
      setLoad(false);
    }
  };

  const saveData = useCallback(async () => {
    if (!url) return;

    try {
      const data = {
        crop,
        plantationDate,
        harvestDate,
        area,
        weatherconditions,
        cropType,
        userId: sessionStorage.getItem("userId"),
        userName: sessionStorage.getItem("name"),
        userEmail: sessionStorage.getItem("email"),
        image: url,
        status: true,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, "records"), data);
      toast.success("Record added successfully");

      // Navigate to ManageRecord after delay
      setTimeout(() => {
        nav("/AddRecord");
      }, 2000);

      // Reset form fields
      setCrop("");
      setPlantationDate("");
      setHarvestDate("");
      setArea("");
      setWeatherConditions("");
      setCropType("");
      setFileName("");
      setFile(null);
      setUrl("");
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    } finally {
      setLoad(false);
    }
  }, [url, crop, plantationDate, harvestDate, area, weatherconditions, cropType, nav]);

  // Trigger data save when URL is available
  useEffect(() => {
    if (url) {
      saveData();
    }
  }, [url, saveData]);

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4">Add Record</h1>
        </div>
      </div>

      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load} />

      {!load && (
        <div className="container-fluid py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="bg-light rounded p-4 p-sm-5">
                  <form onSubmit={handleForm} method="post">
                    <div className="row g-3">
                      <h1 className="fs-15 fw-bold text-primary text-center">Add Record</h1>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            required
                          />
                          <label>Crop</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            type="date"
                            className="form-control border-0"
                            value={plantationDate}
                            onChange={(e) => setPlantationDate(e.target.value)}
                            required
                          />
                          <label>Plantation Date</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            type="date"
                            className="form-control border-0"
                            value={harvestDate}
                            onChange={(e) => setHarvestDate(e.target.value)}
                            required
                          />
                          <label>Harvest Date</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            value={cropType}
                            onChange={(e) => setCropType(e.target.value)}
                            required
                          />
                          <label>Crop Type</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                          />
                          <label>Area</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-floating">
                          <input
                            className="form-control border-0"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setFileName(e.target.files[0]?.name || "");
                              setFile(e.target.files[0] || null);
                            }}
                            required
                          />
                          <label>Image</label>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control border-0"
                            value={weatherconditions}
                            onChange={(e) => setWeatherConditions(e.target.value)}
                            required
                          />
                          <label>Weather Conditions</label>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <button className="btn btn-primary py-3 px-4" type="submit">
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
