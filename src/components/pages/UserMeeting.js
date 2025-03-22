// src/UserMeeting.js
import React, { useState, useEffect } from "react";
import { db } from "./../../Firebase";
import { doc, onSnapshot } from "firebase/firestore";

function UserMeeting() {
  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "meetings", "currentMeeting"),
      (doc) => {
        if (doc.exists()) {
          setMeetingLink(doc.data().link);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Page Header Start */}
      <div
        className="row container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          className="col-md-4"
          style={{
            border: "5px solid white",
            color: "white",
            borderRadius: "10px",
            justifyContent: "center",
          }}
        >
          <div className="container text-center py-5">
            <h1 className="text-light my-4">Join Zoom Meeting</h1>
            {meetingLink ? (
              <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary py-sm-3 px-sm-4">
                  Join Meeting
                </button>
              </a>
            ) : (
              <p>No meeting link available.</p>
            )}
          </div>
        </div>

        <div className="col-md-8 container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Features
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
                Features
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
    </>
  );
}

export default UserMeeting;
