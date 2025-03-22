import { ClipLoader } from "react-spinners";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { when } from "jquery";

export default function Project() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [load, setLoad] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const qry = query(collection(db, "products"), where("status","==",true));
    onSnapshot(qry, (doc) => {
      const fetchedData = doc.docs.map((el) => ({
        id: el.id,
        data: el.data(),
      }));
      setData(fetchedData);
      setFilteredData(fetchedData); // Initially show all data
      setLoad(false);
    });
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.data.type === filter);
      setFilteredData(filtered);
    }
  };

  const getDate = (date) => {
    let date1 = date.toDate().toString();
    let newDate = moment(date1).format("Do MMM, YYYY");
    return newDate;
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
            Products
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Products Start */}
      <ClipLoader
        cssOverride={{ display: "block", margin: "10vh auto" }}
        loading={load}
      />
      {!load && (
        <div className="container-xxl py-5">
          <div className="container">
            <div
              className="text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            >
              <p className="fs-5 fw-bold text-primary">Our Products</p>
              <h1 className="display-5 mb-5">Some Of Our Wonderful Products</h1>
            </div>
            <div className="row wow fadeInUp" data-wow-delay="0.3s">
              <div className="col-12 text-center">
                <ul className="list-inline rounded mb-5" id="portfolio-flters">
                  <li
                    className={`mx-2 ${activeFilter === "All" ? "active" : ""}`}
                    onClick={() => handleFilterClick("All")}
                  >
                    All
                  </li>
                  <li
                    className={`mx-2 ${
                      activeFilter === "pesticide" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("pesticide")}
                  >
                    Pesticide
                  </li>
                  <li
                    className={`mx-2 ${
                      activeFilter === "fertilizer" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("fertilizer")}
                  >
                    Fertilizer
                  </li>
                  <li
                    className={`mx-2 ${
                      activeFilter === "manure" ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick("manure")}
                  >
                    Manure
                  </li>
                </ul>
              </div>
            </div>
            <div className="row g-4 portfolio-container">
              {filteredData.length > 0 ? (
                filteredData.map((el, index) => (
                  <div className="col-md-4 " key={el.id}>
                    <div className="card shadow" style={{ width: "22rem" }}>
                      <div className="card-body">
                        <h5 className="card-title ">{el?.data?.name}</h5>
                        <p className="card-text">{el?.data?.description}</p>
                        <p className="card-text"><b>Quantity : </b>{el.data.quantity}</p>
                        <p className="card-text"><b>Description : </b>{el.data.description}</p>
                        <p><b>Type :</b> {el.data.type}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center">No data found</h1>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Projects End */}
    </>
  );
}
