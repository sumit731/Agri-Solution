import moment from "moment";
import { collection, doc, onSnapshot, query, updateDoc, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Firebase";
export default function ManageRecord(){
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const qry = query(
            collection(db, "records"),
            where("userId", "==", sessionStorage.getItem("userId")), 
        );

        const unsubscribe = onSnapshot(
            qry,
            (snapshot) => {
                const usersList = snapshot.docs.map((el) => ({
                    id: el.id,
                    data: el.data(),
                }));
                setData(usersList);
                setLoad(false);
            },
            (error) => {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users");
                setLoad(false);
            }
        );

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    const getDate = (date) => {
        let newDate = moment(date.toDate()).format("Do MMM, YYYY");
        return newDate;
    };
    const changeStatus = async (id, status) => {
        if (window.confirm(`You are about to ${status ? "activate" : "deactivate"} this Record?`)) {
          setLoad(true);
          const taskDocRef = doc(db, 'records', id);
          try {
            await updateDoc(taskDocRef, { status });
            toast.success("Updated Successfully!!");
            setLoad(true);

          } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
            setLoad(true);
          } finally {
            setLoad(false);
          }
        }
      };
  
    return(
        <>
          <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Manage Records
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
                Manage Records
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* Quote Start */}
      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={load}/>
      {!load && (
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 500 }}>
          </div>
          <div className="row justify-content-center">
          <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <td>Sno</td>
                            <td>Crop</td>
                            <td>CropType</td>
                            <td>Harvest Date</td>
                            <td>Plantation Date</td>
                            <td>Area</td>
                            <td>Weather conditions</td>
                            <td>Image</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data?.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el?.data?.crop}</td>
                                    <td>{el?.data?.cropType}</td>
                                    <td>{el?.data?.harvestDate}</td>
                                    <td>{el?.data?.plantationDate}</td>
                                    <td>{el?.data?.area}</td>
                                    <td>{el?.data?.weatherconditions}</td>
                                    <td><img  src={el?.data?.image} width={"100px"}></img></td>
                                    <td>{el?.data?.status ? "Active" : "In-Active"}</td>
                                            <td>
                                    <Link to={`/UpdateRecord/${el.id}`} className="btn btn-outline-success me-3">
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    {el.data.status ? (
                                        <button className='btn btn-outline-danger' onClick={() => changeStatus(el.id, false)}>In-Active</button>
                                    ) : (
                                        <button className='btn btn-outline-success' onClick={() => changeStatus(el.id, true)}>Active</button>
                                    )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9}>No Data found!!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
          </div>
        </div>
      </div>
        )}
        </>
    )
}