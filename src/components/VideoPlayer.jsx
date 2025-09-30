import React from 'react';

const VideoPlayer = ({ videoId }) => {
  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <iframe
        width="100"
        height="40"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;