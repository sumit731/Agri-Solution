// src/AdminMeeting.js
import React, { useState } from "react";
import { db } from "../../Firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function AdminMeeting() {
  const [meetingLink, setMeetingLink] = useState("");

  const sendMeetingLink = async () => {
    if (meetingLink) {
      try {
        await setDoc(doc(collection(db, "meetings"), "currentMeeting"), {
          link: meetingLink,
        });
        alert("Meeting link sent to user page.");
        setMeetingLink("");
      } catch (error) {
        console.error("Error sending meeting link: ", error);
        alert("Failed to send meeting link.");
      }
    } else {
      alert("Please enter a meeting link.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center" }}>Admin Page</h1>
      <input
        type="text"
        placeholder="Enter Zoom meeting link"
        className="form-control"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
        style={{ width: "400px" }}
      />
      <button
        onClick={sendMeetingLink}
        className="MeetingButton form-control"
        style={{
          backgroundColor: "#0F4229",
          color: "white",
          width: "100px",
          marginTop: "3%",
          marginLeft: "40%",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default AdminMeeting;
