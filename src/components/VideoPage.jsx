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
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const videoPlayerRef = useRef(null);

  const API_KEY = "YOUR_API_KEY";

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (video?.id) {
        try {
          const relatedRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                part: "snippet",
                maxResults: 10,
                relatedToVideoId: video.id,
                type: "video",
                key: API_KEY,
              },
            },
          );

          const relatedData = relatedRes.data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url,
          }));

          setRelatedVideos(relatedData);

          const channelRes = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels`,
            {
              params: {
                part: "snippet,statistics",
                id: video.channelId,
                key: API_KEY,
              },
            },
          );

          const channelData = channelRes.data.items[0];

          setChannelDetails({
            logo: channelData.snippet.thumbnails.default.url,
            subscribers: channelData.statistics.subscriberCount,
          });
        } catch (err) {
          console.error("Error fetching video details:", err);
        }
      }
    };

    fetchVideoDetails();
  }, [video]);

  // Watch history save
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
        thumbnail: video.thumbnail || "",
        watchedAt: Date.now(),
      };

      const filtered = existing.filter((e) => e.id !== entry.id);
      filtered.unshift(entry);

      localStorage.setItem(key, JSON.stringify(filtered.slice(0, 200)));
    } catch (err) {
      console.error("Failed to save watch history", err);
    }
  }, [video]);

  useEffect(() => {
    if (initialFullscreen && videoPlayerRef.current) {
      if (videoPlayerRef.current.requestFullscreen) {
        videoPlayerRef.current.requestFullscreen();
      }
      setInitialFullscreen(false);
    }
  }, [initialFullscreen, setInitialFullscreen]);

  if (!video) {
    return <p>Please select a video.</p>;
  }

  const currentIndex = videos.findIndex((v) => v.id === video.id);

  const handleNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      onVideoClick(videos[currentIndex + 1]);
    }
  };

  const handlePreviousVideo = () => {
    if (currentIndex > 0) {
      onVideoClick(videos[currentIndex - 1]);
    }
  };

  return (
    <div className="video-page-container">
      <div className="main-video-section">
        <div className="video-player" ref={videoPlayerRef}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>

        <h2>{video.title}</h2>

        <button onClick={handlePreviousVideo}>Previous</button>
        <button onClick={handleNextVideo}>Next</button>

        {channelDetails && (
          <div>
            <img src={channelDetails.logo} alt="logo" />
            <p>{channelDetails.subscribers} subscribers</p>
          </div>
        )}

        <Comments />
      </div>

      <div>
        <h3>Related Videos</h3>
        {relatedVideos.map((rv) => (
          <div key={rv.id} onClick={() => onVideoClick(rv)}>
            <img src={rv.thumbnail} alt="" />
            <p>{rv.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
