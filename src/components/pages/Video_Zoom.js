import React from "react";
import { Link } from "react-router-dom";
const Video_Zoom = () => {
  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-4 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-4">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Video & Zoom
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

      <div className="card text-center my-5 mx-5">
        <div
          className="card-body"
          style={{ border: "5px solid #0F4229", borderRadius: "4px" }}
        >
          <h4 className="card-title">Video to Solve your Problem Quickly.</h4>
          <p className="card-text">
            Need a quick fix? Watch our step-by-step videos to solve common
            issues fast and efficiently.
          </p>
          <Link to="/video">
            <button className="btn btn-primary py-sm-3 px-sm-4">
              Explore More
            </button>
          </Link>
        </div>
      </div>

      <div className="card text-center my-5 mx-5">
        <div
          className="card-body"
          style={{ border: "5px solid #0F4229", borderRadius: "4px" }}
        >
          <h4 className="card-title">
            Zoom meeting to Solve your Problem From Experts.
          </h4>
          <p className="card-text">
            Join our Zoom meeting to get expert advice and solutions tailored to
            your needs. Our specialists are here to help you tackle your
            challenges effectively.
          </p>
          <Link to="/questions">
            <button className="btn btn-primary py-sm-3 px-sm-4">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Video_Zoom;
