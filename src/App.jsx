import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoList from "./components/VideoList";
import VideoPage from "./components/VideoPage";
import LoadingSpinner from "./components/LoadingSpinner";
import FilterBar from "./components/FilterBar";
import axios from "axios";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [startInFullscreen, setStartInFullscreen] = useState(false);

  const API_KEY = "AIzaSyD0dlQFppzxvKjmL5sbLnNWlWXA_borpQQ"; // ⚠️ apni key daal

  // Theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🔥 FIXED SEARCH FUNCTION
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setVideos([]);
    setSelectedVideo(null);

    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: query,
            part: "snippet",
            maxResults: 50, // ✅ FIXED
            key: API_KEY,
            type: "video",
          },
        },
      );

      const videoData = res.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        channelId: item.snippet.channelId,
      }));

      setVideos(videoData);
    } catch (err) {
      console.error("FULL ERROR:", err);
      console.error("RESPONSE:", err.response);
      setError("❌ Failed to fetch videos (check API key / quota)");
    } finally {
      setLoading(false);
    }
  };

  // Default load
  useEffect(() => {
    handleSearch("cricket news"); // ✅ ek hi call
  }, []);

  const handleVideoClick = (video, startFullscreen = false) => {
    setSelectedVideo(video);
    setStartInFullscreen(startFullscreen);
  };

  return (
    <div className={`app-container ${theme}`}>
      <Navbar
        onSearch={handleSearch}
        toggleTheme={toggleTheme}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      <div className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        {!isMobile && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onVideoClick={handleVideoClick}
          />
        )}

        <div className="video-section">
          {!selectedVideo && <FilterBar onFilterClick={handleSearch} />}

          {selectedVideo ? (
            <VideoPage
              video={selectedVideo}
              onVideoClick={handleVideoClick}
              videos={videos}
              initialFullscreen={startInFullscreen}
              setInitialFullscreen={setStartInFullscreen}
            />
          ) : (
            <>
              {loading && <LoadingSpinner />}
              {error && <p className="error-message">{error}</p>}

              {!loading && !error && (
                <VideoList
                  videos={videos}
                  onVideoClick={handleVideoClick}
                  isMobile={isMobile}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
