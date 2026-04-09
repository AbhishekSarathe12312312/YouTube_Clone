import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import "remixicon/fonts/remixicon.css";

const Navbar = ({ onSearch, toggleTheme, toggleSidebar, theme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

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
      console.error("Failed to save search history", err);
    }
    onSearch(term);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchSuggestions = async (term) => {
    if (!term || term.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(term)}`;
      const res = await fetch(url);
      const data = await res.json();
      // data[1] is an array of suggestion strings for this endpoint
      const list = Array.isArray(data[1]) ? data[1] : [];
      const remote = list.slice(0, 8);
      const local = getLocalSuggestions(term);
      // merge local first, then remote, avoid duplicates
      const merged = [
        ...local,
        ...remote.filter(
          (r) => !local.some((l) => l.toLowerCase() === r.toLowerCase()),
        ),
      ];
      setSuggestions(merged.slice(0, 8));
      setShowSuggestions(merged.length > 0);
      setActiveIndex(-1);
    } catch (err) {
      console.error("Suggestion fetch failed", err);
      // fallback to local suggestions on error
      const local = getLocalSuggestions(term);
      setSuggestions(local);
      setShowSuggestions(local.length > 0);
    }
  };

  const scheduleSuggestions = (term) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // show local suggestions immediately
    const local = getLocalSuggestions(term);
    if (local.length) {
      setSuggestions(local);
      setShowSuggestions(true);
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(term), 250);
  };

  const getLocalSuggestions = (term) => {
    try {
      const raw = localStorage.getItem("searchHistory");
      const parsed = raw ? JSON.parse(raw) : [];
      if (!term || term.trim() === "") return parsed.slice(0, 6);
      const lower = term.toLowerCase();
      return parsed
        .filter((p) => p.toLowerCase().startsWith(lower))
        .slice(0, 6);
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    // accept-first suggestion on Tab or ArrowRight when input is prefix
    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestions.length > 0) {
      const first = suggestions[0];
      if (
        first &&
        first.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
        searchTerm.length < first.length
      ) {
        e.preventDefault();
        setSearchTerm(first);
        setShowSuggestions(false);
        return;
      }
    }
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        const s = suggestions[activeIndex];
        setSearchTerm(s);
        setShowSuggestions(false);
        onSearch(s);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // --- 🎤 वॉयस सर्च फंक्शनality (Voice Search Functionality) ---
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "माफ़ कीजिये, आपका ब्राउज़र वॉयस रिकग्निशन को सपोर्ट नहीं करता है।",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Listening for voice input...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice Input:", transcript);

      setSearchTerm(transcript);
      handleSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Could not start recognition:", error);
    }
  };

  // -------------------------------------------------------------------

  return (
    <nav className="navbar">
      <div className="nav-left">
        <i className="ri-menu-line" onClick={toggleSidebar}></i>

        {/* ✅ YouTube Logo (Icon + Text) */}
        <div className="youtube-logo-container">
          <i className="ri-youtube-fill youtube-icon"></i>
          <span className="youtube-text">YouTube</span>
        </div>
        {/* ------------------------------------------- */}
      </div>
      <div className="nav-middle">
        <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              scheduleSuggestions(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length) setShowSuggestions(true);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((s, idx) => (
                <div
                  key={s + idx}
                  className={`suggestion-item ${idx === activeIndex ? "active" : ""}`}
                  onMouseDown={(ev) => {
                    ev.preventDefault(); /* prevent blur */
                  }}
                  onClick={() => {
                    setSearchTerm(s);
                    setShowSuggestions(false);
                    onSearch(s);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Search button with click handler */}
        <div className="search-icon" onClick={handleSearch}>
          <i className="ri-search-line"></i>
        </div>
        {/* Voice search button */}
        <i className="ri-mic-fill" onClick={handleVoiceSearch}></i>
      </div>
      <div className="nav-right">
        {/* ✅ Create button */}
        <div className="ri-add-line">
          <span>create</span>
        </div>
        <i className="ri-notification-3-line notification-icon"></i>
        {/* Theme Toggle (Light/Dark) */}
        <div className="theme-toggle" onClick={toggleTheme}>
          <i className={theme === "light" ? "ri-moon-line" : "ri-sun-line"}></i>
        </div>
        <img
          src="https://i.pravatar.cc/32?u=profile"
          alt="Profile"
          className="profile-icon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
