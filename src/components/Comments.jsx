import React from 'react';
import './Comments.css';

const commentsData = [
  { id: 1, author: "User1", text: "Great video! Loved the content.", time: "2 days ago" },
  { id: 2, author: "User2", text: "Very helpful, thank you for sharing!", time: "1 day ago" },
  { id: 3, author: "User3", text: "Can you make a video on React hooks next?", time: "5 hours ago" },
];

const Comments = () => {
  return (
    <div className="comments-section">
      <h3>Comments ({commentsData.length})</h3>
      <div className="comment-input-area">
        <img src="https://i.pravatar.cc/40?u=your-profile" alt="Your Profile" className="profile-pic" />
        <input type="text" placeholder="Add a comment..." />
      </div>
      {commentsData.map(comment => (
        <div key={comment.id} className="comment">
          <img src={`https://i.pravatar.cc/40?u=${comment.author}`} alt={comment.author} className="profile-pic" />
          <div className="comment-content">
            <div className="comment-meta">
              <span>@{comment.author}</span>
              <span className="comment-time">{comment.time}</span>
            </div>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;