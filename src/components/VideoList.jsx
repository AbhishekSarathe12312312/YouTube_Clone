import React from 'react';
import './VideoList.css';
import 'remixicon/fonts/remixicon.css';

const VideoList = ({ videos, onVideoClick, isMobile }) => {
  return (
    <div className="video-list">
      {videos.map(video => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => onVideoClick(video)}
        >
          <div className="thumbnail-container">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-thumbnail"
            />
            {isMobile && (
              <div 
                className="fullscreen-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onVideoClick(video, true);
                }}
              >
                <i className="ri-fullscreen-line"></i>
              </div>
            )}
          </div>
          <div className="video-info">
            <h4 className="video-title">{video.title}</h4>
            <p className="video-channel">{video.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;