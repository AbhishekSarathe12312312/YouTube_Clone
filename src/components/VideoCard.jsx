import React from "react";
import "./VideoCard.css";

const VideoCard = ({ video, onVideoClick }) => {
  return (
    <div className="video-card" onClick={() => onVideoClick(video)}>
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
      <p>{video.channel}</p>
    </div>
  );
};

export default VideoCard;