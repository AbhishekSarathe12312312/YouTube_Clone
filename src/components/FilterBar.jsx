import React, { useState } from 'react';
import './FilterBar.css';

const categories = [
  "All", "Music", "Mixes", "Reverberation", "Podcasts",
  "News", "Comedy nights with Kapil", "Vocal language",
  "Data Structures", "Sets", "Gaming", "Live"
];

const FilterBar = ({ onFilterClick }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    onFilterClick(category);
  };

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? "active" : ""}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;