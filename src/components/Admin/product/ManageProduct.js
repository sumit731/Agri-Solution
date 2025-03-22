import moment from "moment";
import { collection, doc, onSnapshot, query, updateDoc, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Firebase";
export default function ManageProduct(){
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const qry = query(
            collection(db, "products"),
        );

        const unsubscribe = onSnapshot(
            qry,
            (snapshot) => {
                const productsList = snapshot.docs.map((el) => ({
                    id: el.id,
                    data: el.data(),
                }));
                setData(productsList);
                setLoad(false);
            },
            (error) => {
                console.error("Error fetching users:", error);
                // toast.error("Failed to load data");
                setLoad(false);
            }
        );

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, []);

    const getDate = (date) => {
        if (date && typeof date.toDate === 'function') {
            let newDate = moment(date.toDate()).format("Do MMM, YYYY");
            return newDate;
        }
        return "N/A"; // or any default value you prefer
    };
    

    const blockUser = async (id, status) => {
        if (window.confirm(`You are about to ${status ? "active" : "Inactive"} Product?`)) {
            setLoad(true);
            try {
                await updateDoc(doc(db, "products", id), { status: status });
                toast.success(`Product ${status ? "active" : "Inactive"} successfully`);
            } catch (err) {
                console.error("Error updating user status:", err);
                toast.error("Something went wrong");
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
            Manage Products
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
                Manage Products
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
          <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <td>S.no</td>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Company</td>
                            <td>Description</td>
                            <td>Type</td>
                            <td>Status</td>
                            <td>Created At</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data?.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el?.data?.name}</td>
                                    <td>{el?.data?.quantity}</td>
                                    <td>{el?.data?.company}</td>
                                    <td>{el?.data?.description}</td>
                                    <td>{el?.data?.type}</td>
                                    <td>{el?.data?.status ? "Active" : "In-Active"}</td>
                                    <td>{getDate(el?.data?.createdAt)}</td>
                                    <td>
                                    <Link to={`/AdminMaster/UpdateProduct/${el.id}`} className="btn btn-outline-success mx-3">
                                                                <i className="fa fa-edit"></i>
                                    </Link>
                                        {el?.data?.status ? (
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => blockUser(el.id, false)}
                                            >
                                                Inactive
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() => blockUser(el.id, true)}
                                            >
                                                Active
                                            </button>
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