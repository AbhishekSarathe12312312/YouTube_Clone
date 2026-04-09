import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import "remixicon/fonts/remixicon.css";

const Sidebar = ({ isSidebarOpen, onNavigate, onVideoClick }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("watchHistory")) || [];
      setHistory(data);
    } catch {
      setHistory([]);
    }
  }, [showHistory]);

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
      {/* 🔙 BACK BUTTON */}
      {showHistory && (
        <div className="sidebar-item" onClick={() => setShowHistory(false)}>
          <i className="ri-arrow-left-line"></i>
          <span>Back</span>
        </div>
      )}

      {/* 🏠 NORMAL SIDEBAR */}
      {!showHistory && (
        <>
          <div className="sidebar-section">
            <div className="sidebar-item active">
              <i className="ri-home-5-line"></i>
              <span onClick={() => onNavigate && onNavigate("home")}>Home</span>
            </div>

            <div className="sidebar-item">
              <i className="ri-play-circle-line"></i>
              <span>Shorts</span>
            </div>

            <div className="sidebar-item">
              <i className="ri-youtube-line"></i>
              <span>Subscriptions</span>
            </div>
          </div>

          <hr />

          <div className="sidebar-section">
            <h3>You</h3>

            {/* 🎯 HISTORY CLICK */}
            <div className="sidebar-item" onClick={() => setShowHistory(true)}>
              <i className="ri-history-line"></i>
              <span>History</span>
            </div>

            <div className="sidebar-item">
              <i className="ri-play-list-2-line"></i>
              <span>Playlists</span>
            </div>

            <div className="sidebar-item">
              <i className="ri-play-circle-line"></i>
              <span>Your videos</span>
            </div>
          </div>

          <hr />

          <div className="sidebar-section">
            <h3>Explore</h3>
            <div className="sidebar-item">
              <i className="ri-fire-line"></i>
              <span>Trending</span>
            </div>
          </div>
        </>
      )}

      {/* 📜 HISTORY VIEW */}
      {showHistory && (
        <div className="sidebar-section">
          <h3>Watch History</h3>

          {history.length === 0 ? (
            <p style={{ padding: "10px" }}>No history</p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="sidebar-item small"
                onClick={() => {
                  onVideoClick && onVideoClick(item); // 🎥 PLAY VIDEO
                  setShowHistory(false); // 🔙 go back
                }}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{
                    width: "40px",
                    height: "30px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span>{item.title}</span>
              </div>
            ))
          )}

          {/* 🧹 CLEAR HISTORY */}
          {history.length > 0 && (
            <div
              className="sidebar-item"
              onClick={() => {
                localStorage.removeItem("watchHistory");
                setHistory([]);
              }}
            >
              <i className="ri-delete-bin-line"></i>
              <span>Clear History</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
