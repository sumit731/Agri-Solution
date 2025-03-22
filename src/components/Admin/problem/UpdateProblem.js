import { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import moment from "moment";

import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { toast } from "react-toastify";

export default function UpdateProblem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Answers"),
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const formatDate = (timestamp) => {
    return moment(timestamp.toDate()).format("MMMM Do, YYYY");
  };

  const deleteData = async (id) => {
    if (window.confirm("You want to delete data?")) {
      try {
        // console.log(id);
        await deleteDoc(doc(db, "Answers", id));
        toast.success("Data deleted successfully");
      } catch (err) {
        console.log(err);
        toast.error("Internal server error");
      }
    }
  };
  const updateStatus = async (id, status) => {
    // console.log(id, status);
    try {
      const docRef = doc(db, "category", id);
      let data = {
        status: status,
      };
      await updateDoc(docRef, data);
      toast.success("Status updated");
    } catch (err) {
      console.log(err);
      toast.error("Internal server error");
    }
  };

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Submitted Answers
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
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container">
        {/* <h1 className="display-4 text-center mb-4">Submitted Answers</h1> */}
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email</th>
              <th>Answers</th>
              <th>Submitted At</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => (
              <tr key={el.id}>
                <td>{index + 1}</td>
                <td>{el.email}</td>
                <td>
                  <ul>
                    {Object.keys(el.answers).map((question, idx) => (
                      <li key={idx}>
                        <strong>{question}:</strong> {el.answers[question]}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{formatDate(el.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteData(el.id);
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
                <td>
                  {el?.data?.status == true ? (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        updateStatus(el.id, false);
                      }}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        updateStatus(el.id, true);
                      }}
                    >
                      Enable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
