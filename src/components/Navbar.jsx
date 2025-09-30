import React, { useState } from 'react';
import './Navbar.css';
import 'remixicon/fonts/remixicon.css';

const Navbar = ({ onSearch, toggleTheme, toggleSidebar, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term = searchTerm) => {
    onSearch(term);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // --- 🎤 वॉयस सर्च फंक्शनality (Voice Search Functionality) ---
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("माफ़ कीजिये, आपका ब्राउज़र वॉयस रिकग्निशन को सपोर्ट नहीं करता है।");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; 

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
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
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
          <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'}></i> 
        </div>
        <img src="https://i.pravatar.cc/32?u=profile" alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
};

export default Navbar;