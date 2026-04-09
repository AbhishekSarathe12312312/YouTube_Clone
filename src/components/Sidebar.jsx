import React from "react";
import "./Sidebar.css";
import "remixicon/fonts/remixicon.css";

const Sidebar = ({ isSidebarOpen, onNavigate }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
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
        <div
          className="sidebar-item"
          onClick={() => onNavigate && onNavigate("history")}
        >
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
        <div className="sidebar-item">
          <i className="ri-time-line"></i>
          <span>Watch later</span>
        </div>
        <div className="sidebar-item">
          <i className="ri-thumb-up-line"></i>
          <span>Liked videos</span>
        </div>
      </div>

      <hr />

      <div className="sidebar-section">
        <h3>Explore</h3>
        <div className="sidebar-item">
          <i className="ri-fire-line"></i>
          <span>Trending</span>
        </div>
        <div className="sidebar-item">
          <i className="ri-music-line"></i>
          <span>Music</span>
        </div>
        <div className="sidebar-item">
          <i className="ri-gamepad-line"></i>
          <span>Gaming</span>
        </div>
        <div className="sidebar-item">
          <i className="ri-newspaper-line"></i>
          <span>News</span>
        </div>
        <div className="sidebar-item">
          <i className="ri-trophy-line"></i>
          <span>Sports</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
