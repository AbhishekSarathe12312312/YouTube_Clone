import React, { useEffect, useState } from "react";
import "./History.css";

const History = ({ onVideoClick }) => {
  const [history, setHistory] = useState([]);

  const load = () => {
    try {
      const raw = localStorage.getItem("watchHistory");
      const parsed = raw ? JSON.parse(raw) : [];
      setHistory(parsed);
    } catch (err) {
      console.error("Failed to load history", err);
      setHistory([]);
    }
  };

  useEffect(() => {
    load();
    const onStorage = (e) => {
      if (e.key === "watchHistory") load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("watchHistory");
    setHistory([]);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Watch History</h2>
        <button className="clear-btn" onClick={handleClear}>
          Clear history
        </button>
      </div>
      {history.length === 0 ? (
        <p className="no-history">No history yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div
              key={item.id + item.watchedAt}
              className="history-item"
              onClick={() =>
                onVideoClick &&
                onVideoClick({
                  id: item.id,
                  title: item.title,
                  channel: item.channel,
                  thumbnail: item.thumbnail,
                })
              }
            >
              <img src={item.thumbnail} alt={item.title} />
              <div className="history-meta">
                <h4>{item.title}</h4>
                <p>{item.channel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
