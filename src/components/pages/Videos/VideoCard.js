import React from "react";
import "./VideoCard.css"; // Assuming you have a separate CSS file for styling

const VideoCard = ({ videoUrl, title, description, uploadTime, views }) => {
  return (
    <div className="video-card">
      <div className="video-container">
        <iframe
          width="100%"
          height="200"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="video-meta">
          <span>Uploaded: {uploadTime}</span>
          <span>Views: {views}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
