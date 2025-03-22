import moment from "moment";
import { collection, doc, onSnapshot, query, updateDoc, where, orderBy, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Firebase";
export default function ManageAnnoucements(){
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
  
    useEffect(() => {
      // Define query with a single field to order by
      const qry = query(collection(db, "annoucements"), orderBy("createdAt"));
      const unsubscribe = onSnapshot(qry, (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }));
        setData(fetchedData);
        setLoad(false);
      }, (error) => {
        console.error("Error fetching data: ", error);
        toast.error("Error fetching data.");
        setLoad(false);
      });
  
      return () => unsubscribe(); // Cleanup listener on unmount
    }, []);
    const getDate = (date) => {
      return moment(date.toDate()).format("Do MMM, YYYY");
    };
  
    const deleteData = async (id) => {
      if (window.confirm("You want to delete data?")) {
        try {
          await deleteDoc(doc(db, "blog", id));
          toast.success("Data deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Internal server error");
        }
      }
    };
  
    const changeStatus = async (id, status) => {
      if (window.confirm(`You are about to ${status ? "activate" : "deactivate"} this Annoucement?`)) {
        setLoad(true);
        const taskDocRef = doc(db, 'annoucements', id);
        try {
          await updateDoc(taskDocRef, { status });
          toast.success("Updated Successfully!!");
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong!");
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
            Manage Announcements
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
                Manage Annoucememts
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
          <table className="table custom-table table-striped table-bordered border-primary">
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((el, index) => (
                          <tr key={el.id}>
                            <td>{index + 1}</td>
                            <td>{el?.data?.title}</td>
                            <td>
                              {el.data.description}
                            </td>
                            <td>
                              <img
                                src={el.data.image}
                                alt="Thumbnail"
                                className="img-thumbnail thumbnail-img"
                                width={"200px"}
                                height={"200px"}
                              />
                            </td>
                            <td>
                              {el.data.status ? "Enable" : "Disable"}
                            </td>
                            <td>{getDate(el.data.createdAt)}</td>
                            <td>
                              <Link to={`/AdminMaster/UpdateAnnoucement/${el.id}`} className="btn btn-outline-success">
                                <i className="fa fa-edit"></i>
                              </Link>
                            </td>
                            <td >
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
                          <td colSpan={10} className="text-center">No Data found</td>
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