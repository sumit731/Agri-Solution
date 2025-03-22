import moment from "moment";
import { collection, doc, onSnapshot, query, updateDoc, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Firebase";
export default function ViewRequests(){
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const {id} = useParams();
    useEffect(() => {
        const qry = query(
            collection(db, "reviewRequest"),
            where("userId","==",id),
            orderBy("createdAt","desc")
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
                toast.error("Failed to load Requests");
                setLoad(false);
            }
        );

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    const getDate = (date) => {
        let newDate = moment(date.toDate()).format("Do MMM, YYYY");
        return newDate;
    };
    // const changeStatus = async (id, status) => {
    //     if (window.confirm(`You are about to ${status ? "activate" : "deactivate"} this Record?`)) {
    //       setLoad(true);
    //       const taskDocRef = doc(db, 'records', id);
    //       try {
    //         await updateDoc(taskDocRef, { status });
    //         toast.success("Updated Successfully!!");
    //         setLoad(true);
    //       } catch (err) {
    //         console.error(err);
    //         toast.error("Something went wrong!");
             
    //       } finally {
    //         setLoad(false);
    //       }
    //     }
    //   };
  
    return(
        <>
          <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            All Requests
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
                All Requests
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
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Problem</td>
                            <td>Image</td>
                            <td>Created At</td>
                            <td>View Full Details</td>
                            <td>Join Meeting</td>
                            <td>Revert</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data?.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                  <td>{el?.data?.userName}</td>
                                  <td>{el?.data?.userEmail}</td>
                                  <td>{el?.data?.problem}</td>
                                    <td><img  src={el?.data?.image} width={"100px"}></img></td>
                                  <td>{getDate(el.data.createdAt)}</td>
                                  <td>
                                  <Link to={`/AdminMaster/ViewFullDetails/${el.id}`} className="btn btn-outline-success me-3">
                                      <i className="fa fa-eye"></i>
                                  </Link>
                                  </td>
                                  <td>
                                  <td>{!!el.data.meetingLink?<><Link to={el?.data?.meetingLink} className="btn btn-success" target="_blank">Join Meeting</Link>
                                  </>:""}</td>
                                  </td>
                                            {/* <td>
                                    {el.data.status ? (
                                        <button className='btn btn-outline-danger' onClick={() => changeStatus(el.id, false)}>In-Active</button>
                                    ) : (
                                        <button className='btn btn-outline-success' onClick={() => changeStatus(el.id, true)}>Active</button>
                                    )}
                                    </td> */}
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