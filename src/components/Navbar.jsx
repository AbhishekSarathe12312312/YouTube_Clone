import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import "remixicon/fonts/remixicon.css";

const Navbar = ({ onSearch, toggleTheme, toggleSidebar, theme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // 🔍 MAIN SEARCH FUNCTION
  const handleSearch = (term = searchTerm) => {
    if (!term || term.trim() === "") return;

    try {
      const key = "searchHistory";
      const raw = localStorage.getItem(key);
      const existing = raw ? JSON.parse(raw) : [];

      const normalized = term.trim();
      const filtered = existing.filter(
        (t) => t.toLowerCase() !== normalized.toLowerCase(),
      );

      filtered.unshift(normalized);
      localStorage.setItem(key, JSON.stringify(filtered.slice(0, 50)));
    } catch (err) {
      console.error("History save error", err);
    }

    onSearch(term); // 🔥 IMPORTANT
  };

  // 🔍 FETCH SUGGESTIONS
  const fetchSuggestions = async (term) => {
    if (!term.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(
        `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
          term,
        )}`,
      );
      const data = await res.json();

      const list = Array.isArray(data[1]) ? data[1] : [];
      setSuggestions(list.slice(0, 8));
      setShowSuggestions(true);
    } catch (err) {
      console.error("Suggestion error", err);
    }
  };

  // ⏳ DEBOUNCE
  const scheduleSuggestions = (term) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(term), 300);
  };

  // 🧹 CLEANUP
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // ❌ CLICK OUTSIDE CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // 🎤 VOICE SEARCH
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setSearchTerm(text);
      handleSearch(text);
    };

    recognition.start();
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <i className="ri-menu-line" onClick={toggleSidebar}></i>

        <div className="youtube-logo-container">
          <i className="ri-youtube-fill youtube-icon"></i>
          <span className="youtube-text">YouTube</span>
        </div>
      </div>

      {/* MIDDLE */}
      <div className="nav-middle">
        <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              scheduleSuggestions(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchTerm(s);
                    setShowSuggestions(false);
                    handleSearch(s); // ✅ FIXED
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <div className="search-icon" onClick={() => handleSearch()}>
          <i className="ri-search-line"></i>
        </div>

        {/* VOICE */}
        <i className="ri-mic-fill" onClick={handleVoiceSearch}></i>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="ri-add-line">
          <span>Create</span>
        </div>

        <i className="ri-notification-3-line"></i>

        <div className="theme-toggle" onClick={toggleTheme}>
          <i className={theme === "light" ? "ri-moon-line" : "ri-sun-line"}></i>
        </div>

        <img
          src="https://i.pravatar.cc/32"
          alt="profile"
          className="profile-icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
