<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Comments from "./Comments";
import "./VideoPage.css";
import "remixicon/fonts/remixicon.css";

const VideoPage = ({
  video,
  onVideoClick,
  videos,
  initialFullscreen,
  setInitialFullscreen,
}) => {
=======
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Comments from './Comments';
import './VideoPage.css';
import 'remixicon/fonts/remixicon.css';

const VideoPage = ({ video, onVideoClick, videos, initialFullscreen, setInitialFullscreen }) => {
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const videoPlayerRef = useRef(null);

  const API_KEY = "AIzaSyD0dlQFppzxvKjmL5sbLnNWlWXA_borpQQ";

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (video?.id) {
        try {
          // Fetch related videos
          const relatedRes = await axios.get(
<<<<<<< HEAD
            `https://www.googleapis.com/youtube/v3/search`,
            {
=======
            `https://www.googleapis.com/youtube/v3/search`, {
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
              params: {
                part: "snippet",
                maxResults: 10,
                relatedToVideoId: video.id,
                type: "video",
<<<<<<< HEAD
                key: API_KEY,
              },
            },
          );
          const relatedData = relatedRes.data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url,
=======
                key: API_KEY
              }
            }
          );
          const relatedData = relatedRes.data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
          }));
          setRelatedVideos(relatedData);

          // Fetch channel details
          const channelRes = await axios.get(
<<<<<<< HEAD
            `https://www.googleapis.com/youtube/v3/channels`,
            {
              params: {
                part: "snippet,statistics",
                id: video.channelId,
                key: API_KEY,
              },
            },
=======
            `https://www.googleapis.com/youtube/v3/channels`, {
              params: {
                part: "snippet,statistics",
                id: video.channelId,
                key: API_KEY
              }
            }
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
          );
          const channelData = channelRes.data.items[0];
          setChannelDetails({
            logo: channelData.snippet.thumbnails.default.url,
<<<<<<< HEAD
            subscribers: channelData.statistics.subscriberCount,
=======
            subscribers: channelData.statistics.subscriberCount
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
          });
        } catch (err) {
          console.error("Error fetching video details:", err);
        }
      }
    };

    fetchVideoDetails();
  }, [video, API_KEY]);

<<<<<<< HEAD
  // Save watch history to localStorage whenever a new video is shown
  useEffect(() => {
    if (!video || !video.id) return;
    try {
      const key = "watchHistory";
      const raw = localStorage.getItem(key);
      const existing = raw ? JSON.parse(raw) : [];
      const entry = {
        id: video.id,
        title: video.title,
        channel: video.channel,
        thumbnail:
          video.thumbnail ||
          (video.thumbnails &&
            video.thumbnails.high &&
            video.thumbnails.high.url) ||
          "",
        watchedAt: Date.now(),
      };
      const filtered = existing.filter((e) => e.id !== entry.id);
      filtered.unshift(entry);
      const trimmed = filtered.slice(0, 200);
      localStorage.setItem(key, JSON.stringify(trimmed));
    } catch (err) {
      console.error("Failed to save watch history", err);
    }
  }, [video]);

=======
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
  useEffect(() => {
    if (initialFullscreen && videoPlayerRef.current) {
      if (videoPlayerRef.current.requestFullscreen) {
        videoPlayerRef.current.requestFullscreen();
<<<<<<< HEAD
      } else if (videoPlayerRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoPlayerRef.current.mozRequestFullScreen();
      } else if (videoPlayerRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        videoPlayerRef.current.webkitRequestFullscreen();
      } else if (videoPlayerRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoPlayerRef.current.msRequestFullscreen();
      }
      if (screen.orientation.lock) {
        screen.orientation.lock("landscape");
=======
      } else if (videoPlayerRef.current.mozRequestFullScreen) { /* Firefox */
        videoPlayerRef.current.mozRequestFullScreen();
      } else if (videoPlayerRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        videoPlayerRef.current.webkitRequestFullscreen();
      } else if (videoPlayerRef.current.msRequestFullscreen) { /* IE/Edge */
        videoPlayerRef.current.msRequestFullscreen();
      }
      if (screen.orientation.lock) {
        screen.orientation.lock('landscape');
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
      }
      setInitialFullscreen(false);
    }
  }, [initialFullscreen, setInitialFullscreen]);

  if (!video) {
    return <p>Please select a video.</p>;
  }

  const handleNextVideo = () => {
<<<<<<< HEAD
    const currentIndex = videos.findIndex((v) => v.id === video.id);
=======
    const currentIndex = videos.findIndex(v => v.id === video.id);
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
    if (currentIndex > -1 && currentIndex < videos.length - 1) {
      onVideoClick(videos[currentIndex + 1]);
    }
  };

  const handlePreviousVideo = () => {
<<<<<<< HEAD
    const currentIndex = videos.findIndex((v) => v.id === video.id);
=======
    const currentIndex = videos.findIndex(v => v.id === video.id);
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
    if (currentIndex > 0) {
      onVideoClick(videos[currentIndex - 1]);
    }
  };

<<<<<<< HEAD
  const currentIndex = videos.findIndex((v) => v.id === video.id);
=======
  const currentIndex = videos.findIndex(v => v.id === video.id);
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
  const isPreviousDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= videos.length - 1;

  return (
    <div className="video-page-container">
      <div className="main-video-section">
        <div className="video-player" ref={videoPlayerRef}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        <div className="video-info-box">
          <h2>{video.title}</h2>
          <div className="video-controls-container">
            <button
<<<<<<< HEAD
              className={`nav-button ${isPreviousDisabled ? "disabled" : ""}`}
=======
              className={`nav-button ${isPreviousDisabled ? 'disabled' : ''}`}
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
              onClick={handlePreviousVideo}
              disabled={isPreviousDisabled}
            >
              Previous
            </button>
            <button
<<<<<<< HEAD
              className={`nav-button ${isNextDisabled ? "disabled" : ""}`}
=======
              className={`nav-button ${isNextDisabled ? 'disabled' : ''}`}
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
              onClick={handleNextVideo}
              disabled={isNextDisabled}
            >
              Next
            </button>
          </div>
          <div className="channel-details-section">
            <div className="channel-info-container">
<<<<<<< HEAD
              {channelDetails && (
                <img
                  src={channelDetails.logo}
                  alt="Channel Logo"
                  className="channel-pic"
                />
              )}
              <div>
                <span className="channel-name">{video.channel}</span>
                {channelDetails && (
                  <p className="channel-subscribers">
                    {channelDetails.subscribers} subscribers
                  </p>
                )}
=======
              {channelDetails && <img src={channelDetails.logo} alt="Channel Logo" className="channel-pic" />}
              <div>
                <span className="channel-name">{video.channel}</span>
                {channelDetails && <p className="channel-subscribers">{channelDetails.subscribers} subscribers</p>}
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
              </div>
              <button className="subscribe-btn">Subscribe</button>
            </div>
            <div className="action-buttons-container">
              <div className="likes-dislikes-container">
                <button className="icon-btn-like">
                  <i className="ri-thumb-up-line"></i>
                  <span>6.2K</span>
                </button>
                <button className="icon-btn-dislike">
                  <i className="ri-thumb-down-line"></i>
                </button>
              </div>
              <button className="share-btn">
                <i className="ri-share-forward-line"></i>
                <span>Share</span>
              </button>
              <button className="more-btn">
                <i className="ri-more-2-line"></i>
              </button>
            </div>
          </div>
        </div>
        <Comments />
      </div>
      <div className="related-videos-section">
        <h3>Related Videos</h3>
        {relatedVideos.length > 0 ? (
          relatedVideos.map((relatedVideo) => (
            <div
              key={relatedVideo.id}
              className="related-video-card"
              onClick={() => onVideoClick(relatedVideo)}
            >
              <img src={relatedVideo.thumbnail} alt={relatedVideo.title} />
              <div className="related-video-info">
                <h4>{relatedVideo.title}</h4>
                <p>{relatedVideo.channel}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading related videos...</p>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default VideoPage;
=======
export default VideoPage;
>>>>>>> 813a288f9424fdbf7bcc2f46c6aa1de8caeeda53
